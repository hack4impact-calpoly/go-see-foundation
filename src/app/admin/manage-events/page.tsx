"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./manage-events.module.css";
import { useRouter } from "next/navigation";
import { IEvent } from "@database/eventSchema";
import BackButton from "@components/BackButton";
import { PatternFormat } from "react-number-format";


const ManageEventsPage = () => {
  const newEventButtonRef = useRef<HTMLButtonElement>(null);
  const updateEventButtonRef = useRef<HTMLButtonElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const pictureInputRef = useRef<HTMLInputElement>(null);
  const locationInputRef = useRef<HTMLTextAreaElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const startTimeInputRef = useRef<HTMLInputElement>(null);
  const endTimeInputRef = useRef<HTMLInputElement>(null);
  const eventDescriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const altTextInputRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const { push } = useRouter();

  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [activeForm, setActiveForm] = useState(0);
  const [events, setEvents] = useState<Array<IEvent>>([]);
  const [selectedEventIndex, setSelectedEventIndex] = useState(-1);
  const [formData, setFormData] = useState({
    picture: "",
    alt: "",
    description: "",
    date: null,
    name: "",
    eventID: "",
    startTime: null,
    endTime: null,
    location: "",
  });

  const handeFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const storeImage = async (e: any) => {

    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // hit the aws route in api folder
      const response = await fetch("/api/aws", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("look here ", data.s3ObjectURL);
      return data.s3ObjectURL;
    } catch (error: any) {
      console.log("error occured while saving image to bucket: ", error);
      setUploading(false);
    }
  };

  const fetchAllEvents = async () => {
    try {
      const res = await fetch("/api/events", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch events");
      }

      const res_j = await res.json();
      return res_j;
    } catch (err: unknown) {
      console.error(`Error: ${err}`);
      return null;
    }
  };

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        let data = await fetchAllEvents();
        data = data.sort(
          (a: IEvent, b: IEvent) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setEvents(data);
      } catch (error: unknown) {
        console.error(`Error: ${error}`);
      }
    };

    fetchEventData();
  }, [activeForm]);

  const handleEventChange = (
    event: React.ChangeEvent<HTMLFormElement>
  ): void => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const objectUrl = await storeImage(event);

    if (objectUrl == "") {
      console.log("error with objecturl");
      console.error("objecturl undefined");
    }

    try {
      console.log("before the event post call: ", objectUrl);
      formData["eventID"] = formData.name;
      const response = await fetch("/api/events/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          picture: objectUrl,
          alt: formData["alt"],
          description: formData["description"],
          date: formData["date"],
          name: formData["name"],
          eventID: formData["eventID"],
          location: formData["location"],
          startTime: formData["startTime"],
          endTime: formData["endTime"],
        }),
      });

      const responseData = await response.json();
      if (response.ok && responseData.message == "Success: Event uploaded") {
        alert("New Event Created!");
        push("/admin");
      } else {
        const errorMessage = responseData.message;
        alert("Error: " + errorMessage);
      }
    } catch (error) {
      console.error(`Create New Event Error: ${error}`);
    }
  };

  const handleInputKeyPress = (
    e: React.KeyboardEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLButtonElement
      | HTMLSelectElement
    >
  ) => {
    if (e.key === "Tab") {
      e.preventDefault();
      switch (e.currentTarget.id) {
        case "newEventButton":
          updateEventButtonRef?.current?.focus();
          break;
        case "updateEventButton":
          firstInputRef?.current?.focus();
          break;
        case "firstInput":
          locationInputRef?.current?.focus();
          break;
        case "location":
          dateInputRef?.current?.focus();
          break;
        case "date":
          startTimeInputRef?.current?.focus();
          break;
        case "startTime":
          endTimeInputRef?.current?.focus();
          break;
        case "endTime":
          eventDescriptionInputRef?.current?.focus();
          break;
        case "eventDescription":
          altTextInputRef?.current?.focus();
          break;
        case "altTextInput":
          submitButtonRef?.current?.focus();
          break;
        case "createEventButton":
          newEventButtonRef?.current?.focus(); // Loop back to the first input field
          break;
        default:
          break;
      }
    }
  };

  const handleEventSelection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedEventIndex(Number(event.target.value));
  };

  return (
    <div>
      <BackButton />
      <div className={styles.container}>
        <div className={styles.eventManager}>
          <div className={styles.topButtons}>
            <div
              className={styles.newEventButton}
              id="newEventButton"
              // type="button"
              // ref={newEventButtonRef}
            >
              New Event
            </div>
          </div>
          <form
            className={styles.eventForm}
            onChange={handleEventChange}
            onSubmit={handleSubmit}
          >
            {activeForm === 0 ? (
              <input
                className={styles.input}
                type="text"
                id="firstInput"
                name="name"
                placeholder="Title"
                value={formData["name"]}
                required
                ref={firstInputRef}
                onKeyDown={handleInputKeyPress}
              />
            ) : (
              <select
                className={styles.selectEvent}
                id="firstInput"
                name="name"
                required
                onKeyDown={handleInputKeyPress}
                onChange={handleEventSelection}
              >
                <option value="-1">Select Event...</option>
                {events.map((event: IEvent, index: number) => (
                  <option key={index} value={index}>
                    {event.name}
                  </option>
                ))}
              </select>
            )}
            <textarea
              className={styles.descriptionInput}
              id="location"
              name="location"
              placeholder="Location"
              required
              ref={locationInputRef}
              onKeyDown={handleInputKeyPress}
            />
            <PatternFormat
              className={styles.input}
              type="text"
              format="##/##/####"
              id="date"
              name="date"
              mask="_"
              required
              getInputRef={dateInputRef}
              onKeyDown={handleInputKeyPress}
              placeholder="Date (MM/DD/YYYY)"
            />
            <div className={styles.inputTimes}>
              <input
                className={styles.input}
                type="text"
                id="startTime"
                name="startTime"
                placeholder="Start Time"
                required
                ref={startTimeInputRef}
                onKeyDown={handleInputKeyPress}
              />
              <input
                className={styles.input}
                type="text"
                id="endTime"
                name="endTime"
                placeholder="End Time"
                required
                ref={endTimeInputRef}
                onKeyDown={handleInputKeyPress}
              />
            </div>
            <textarea
              className={styles.descriptionInput}
              id="eventDescription"
              name="description"
              placeholder="Event Description"
              value={
                selectedEventIndex === -1
                  ? formData["description"]
                  : String(events[selectedEventIndex].description)
              }
              required
              ref={eventDescriptionInputRef}
              onKeyDown={handleInputKeyPress}
              disabled={selectedEventIndex === -1 ? false : true}
            />
            <input
              className={styles.input}
              type="file"
              accept=".png, .jpg, .jpeg, image/*"
              value={formData.picture}
              // id="pictureInput"
              name="picture"
              placeholder="Upload Image"
              required
              ref={pictureInputRef}
              onKeyDown={handleInputKeyPress}
              onChange={handeFileChange}
            />
            <input
              className={styles.input}
              type="text"
              id="alt"
              name="alt"
              placeholder="Alt Text"
              required
              ref={altTextInputRef}
              onKeyDown={handleInputKeyPress}
            />
            <button
              className={styles.createEventButton}
              id="submitButton"
              type="submit"
              ref={submitButtonRef}
              disabled={!file || uploading}
            >
              Create New Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageEventsPage;
