"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./editEvent.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { IEvent } from "@database/eventSchema";
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

  const moment = require("moment");
  const { push } = useRouter();
  const searchParams = useSearchParams();
  let eventName = searchParams.get("eventName");

  const [activeForm, setActiveForm] = useState(0);
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
      console.log("trying to submit new event");
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
          <div className={styles.topButtons}></div>
          <form
            className={styles.eventForm}
            onChange={handleEventChange}
            onSubmit={handleSubmit}
          >
            <div className={styles.eventTitle}>{eventName}</div>
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

export default ManageEventsPage;
