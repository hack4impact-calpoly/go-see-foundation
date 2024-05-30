"use client";
import React, { useState, useRef, useEffect } from "react";

import styles from "./manage-events.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { IEvent } from "@database/eventSchema";
import BackButton from "../../components/BackButton";
import { PatternFormat } from "react-number-format";

const ManageEventsPage = () => {
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
  const { push } = useRouter();
  const searchParams = useSearchParams();
  let eventName = searchParams.get("eventName");

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

  const AutoClickButton = () => {
    if (eventName) {
      if (updateEventButtonRef) {
        const button = document.getElementById("updateEventButton");
        if (button) {
          setActiveForm(1);
          button.click();
          console.log("Event Name:", eventName);
        }
        const eventIndex = events.findIndex(
          (event) => event.name === eventName
        );

        if (eventIndex !== -1) {
          // Set the selected value of the dropdown
          const selectElement = document.getElementById(
            "firstInput"
          ) as HTMLSelectElement;
          if (selectElement) {
            selectElement.value = eventName;

            // Manually trigger the onChange event
            const event = new Event("change", { bubbles: true });
            selectElement.dispatchEvent(event);
          }

          // Trigger the click event on the button
        }
      }
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
        AutoClickButton();
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

    // Create New Event, POSTf
    if (activeForm === 0) {
      try {
        console.log("trying to submit new event");
        formData["eventID"] = formData.name; // temporary, eventID same as name
        formData["picture"] = "/Group_Photo.jpeg"; // temporary, need to add picture input
        const response = await fetch("/api/events/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            picture: formData["picture"],
            alt: "filler data",
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
    } else {
      // Updating Event, PUT/DELETE?
      console.log("updating...");
      // TODO: figure out what request to do here
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

  const handleFormSwitch = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.id === "newEventButton") {
      setActiveForm(0);
      setSelectedEventIndex(-1);
    } else {
      setActiveForm(1);
    }
    setFormData({
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
  };

  const handleEventSelection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedEventIndex(Number(event.target.value));
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  return (
    <div>
      {" "}
      <BackButton />
      <div className={styles.container}>
        <div className={styles.eventManager}>
          <div className={styles.topButtons}>
            <button
              className={`${styles.newEventButton} ${
                activeForm === 0 ? styles.activeForm : ""
              }`}
              id="newEventButton"
              type="button"
              ref={newEventButtonRef}
              onClick={handleFormSwitch}
            >
              New Event
            </button>
            <button
              className={`${styles.updateEventButton} ${
                activeForm === 1 ? styles.activeForm : ""
              }`}
              id="updateEventButton"
              type="button"
              ref={updateEventButtonRef}
              onClick={handleFormSwitch}
            >
              Update Event
            </button>
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
              value={
                selectedEventIndex === -1
                  ? formData["location"]
                  : String(events[selectedEventIndex].location)
              }
              required
              ref={locationInputRef}
              onKeyDown={handleInputKeyPress}
              disabled={selectedEventIndex === -1 ? false : true}
            />
            {/* <input
              className={styles.input}
              type="date"
              id="date"
              name="date"
              value={
                selectedEventIndex === -1
                  ? formData["date"]
                    ? formatDate(formData["date"])
                    : ""
                  : formatDate(events[selectedEventIndex].date)
              }
              placeholder="Date"
              required
              ref={dateInputRef}
              onKeyDown={handleInputKeyPress}
              disabled={selectedEventIndex === -1 ? false : true}
            /> */}
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
              disabled={selectedEventIndex === -1 ? false : true}
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
                disabled={selectedEventIndex === -1 ? false : true}
              />
              {/* <PatternFormat
                className={styles.input}
                type="text"
                format="##:## ##"
                id="startTime"
                name="startTime"
                mask="_"
                required
                getInputRef={startTimeInputRef}
                onKeyDown={handleInputKeyPress}
                placeholder="12:30 pm"
                disabled={selectedEventIndex === -1 ? false : true}
              />
              <PatternFormat
                className={styles.input}
                type="text"
                format="12:30 pm"
                id="endTime"
                name="endTime"
                mask="_"
                required
                getInputRef={endTimeInputRef}
                onKeyDown={handleInputKeyPress}
                placeholder="2:30 pm"
                disabled={selectedEventIndex === -1 ? false : true}
              /> */}
              <input
                className={styles.input}
                type="text"
                id="endTime"
                name="endTime"
                placeholder="End Time"
                required
                ref={endTimeInputRef}
                onKeyDown={handleInputKeyPress}
                disabled={selectedEventIndex === -1 ? false : true}
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
            ></textarea>
            {/* {activeForm === 0 ? (
              <input
                className={styles.input}
                type="text"
                id="altTextInput"
                name="alt"
                placeholder="Alternative Text for Image"
                value={formData["alt"]}
                required
                ref={altTextInputRef}
                onKeyDown={handleInputKeyPress}
              />
            ) : (
              ""
            )} */}
            <button
              className={styles.createEventButton}
              id="submitButton"
              type="submit"
              ref={submitButtonRef}
            >
              {activeForm === 0 ? "Create New Event" : "Update Event"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageEventsPage;
