"use client";
import React, { useState, useRef, useEffect, Suspense } from "react";
import styles from "./editEvent.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { PatternFormat } from "react-number-format";

const ManageEventsPageContent = () => {
  const newEventButtonRef = useRef<HTMLButtonElement>(null);
  const updateEventButtonRef = useRef<HTMLButtonElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const locationInputRef = useRef<HTMLTextAreaElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const startTimeInputRef = useRef<HTMLInputElement>(null);
  const endTimeInputRef = useRef<HTMLInputElement>(null);
  const eventDescriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const altTextInputRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const submitImageButtonRef = useRef<HTMLButtonElement>(null);

  const pictureInputRef = useRef<HTMLInputElement>(null);

  const moment = require("moment");
  const { push } = useRouter();
  const searchParams = useSearchParams();
  let eventName = searchParams.get("eventName");

  const [fileChanged, setFileChanged] = useState(false);

  const [file, setFile] = useState(null);
  const [activeForm, setActiveForm] = useState(0);
  const [formData, setFormData] = useState({
    picture: "",
    alt: "",
    description: "",
    date: null,
    name: "",
    eventID: "",
    startTime: "",
    endTime: "",
    location: "",
  });

  const handeFileChange = (e: any) => {
    setFile(e.target.files[0]);
    setFileChanged(true);
  };

  const fetchEventInformation = async () => {
    try {
      const res = await fetch("/api/events/" + eventName, {
        method: "GET",
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
        let data = await fetchEventInformation();
        console.log(data);

        setFormData({
          picture: data.picture,
          alt: data.alt,
          description: data.description,
          date: moment(data.date).format("MM/DD/YYYY"),
          name: data.name,
          eventID: data.eventID,
          startTime: data.startTime,
          endTime: data.endTime,
          location: data.location,
        });
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

  const deleteEvent = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to delete the event?"
    );
    console.log("updating");

    if (confirmed) {
      try {
        console.log("trying to DELETE event");
        const response = await fetch("/api/events/" + eventName, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const responseData = await response.json();
        console.log(" response: ", responseData);
        if (responseData == "Event deleted.") {
          alert("Successfully Deleted Event");
          push("/admin/eventHistory");
        } else {
          const errorMessage = responseData.message;
          alert("Error: " + errorMessage);
        }
      } catch (error) {
        console.error(`Delete New Event Error: ${error}`);
      }
    }
  };

  const storeImage = async (e: any) => {
    if (!file) return;

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
      setFormData((prevFormData) => ({
        ...prevFormData,
        picture: data.s3ObjectURL,
      }));
      setFileChanged(true);
      return data.s3ObjectURL;
    } catch (error: any) {
      console.log("error occured while saving image to bucket: ", error);
      return null;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("updating");

    // delete item
    try {
      console.log("trying to DELETE event");
      const response = await fetch("/api/events/" + eventName, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      console.log(" response: ", responseData);
      if (responseData == "Event deleted.") {
      } else {
        const errorMessage = responseData.message;
        alert("Error: " + errorMessage);
      }
    } catch (error) {
      console.error(`Delete New Event Error: ${error}`);
    }

    // post event
    try {
      if (fileChanged) {
        let rep = await storeImage("any");
        console.log("rep: ", rep);
        if (rep != null) {
          formData["picture"] = rep;
        }
      }

      console.log("here: examine", formData["picture"]);
      console.log("trying to submit new event");
      const response = await fetch("/api/events/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          picture: formData["picture"],
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
        alert("Event Successfully Updated!");
        push("/admin/eventHistory");
      } else {
        const errorMessage = responseData.message;
        alert("Error: " + errorMessage);
      }
    } catch (error) {
      console.error(`Create New Event Error: ${error}`);
    }

    console.log(formData);
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

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.eventManager}>
          <form
            className={styles.eventForm}
            onChange={handleEventChange}
            onSubmit={handleSubmit}
          >
            <div className={styles.eventTitle}>{eventName}</div>
            <div className={styles.divider}></div>
            <textarea
              className={styles.descriptionInput}
              id="location"
              name="location"
              placeholder="Location"
              value={formData.location}
              required
              ref={locationInputRef}
              onKeyDown={handleInputKeyPress}
              // disabled={selectedEventIndex === -1 ? false : true}
            />
            <PatternFormat
              className={styles.input}
              type="text"
              format="##/##/####"
              id="date"
              name="date"
              mask="_"
              required
              value={formData.date}
              getInputRef={dateInputRef}
              onKeyDown={handleInputKeyPress}
              placeholder="Date (MM/DD/YYYY)"
              // disabled={selectedEventIndex === -1 ? false : true}
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
                value={formData.startTime}
                onKeyDown={handleInputKeyPress}
              />
              <input
                className={styles.input}
                type="text"
                id="endTime"
                name="endTime"
                placeholder="End Time"
                required
                value={formData.endTime}
                ref={endTimeInputRef}
                onKeyDown={handleInputKeyPress}
                // disabled={selectedEventIndex === -1 ? false : true}
              />
            </div>
            <textarea
              className={styles.descriptionInput}
              id="eventDescription"
              name="description"
              placeholder="Event Description"
              required
              value={formData.description}
              ref={eventDescriptionInputRef}
              onKeyDown={handleInputKeyPress}
            ></textarea>
            <input
              className={styles.imageContainer}
              type="file"
              accept=".png, .jpg, .jpeg, image/*"
              id="pictureInput"
              name="picture"
              placeholder="Upload Image"
              ref={pictureInputRef}
              onKeyDown={handleInputKeyPress}
              onChange={handeFileChange}
            />
            <input
              className={styles.input}
              id="alt"
              name="alt"
              placeholder="Alt Text"
              required
              value={formData.alt}
              ref={altTextInputRef}
              onKeyDown={handleInputKeyPress}
            />
            <button className={styles.deleteButton} onClick={deleteEvent}>
              Delete Event
            </button>
            <button
              className={styles.createEventButton}
              id="submitButton"
              type="submit"
              ref={submitButtonRef}
            >
              Update Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const ManageEventsPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ManageEventsPageContent />
  </Suspense>
);

export default ManageEventsPage;
