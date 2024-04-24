"use client";
import React, { useState, useRef } from "react";
import styles from "./manage-events.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ManageEventsPage = () => {
  const newEventButtonRef = useRef<HTMLButtonElement>(null);
  const updateEventButtonRef = useRef<HTMLButtonElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const startTimeInputRef = useRef<HTMLInputElement>(null);
  const endTimeInputRef = useRef<HTMLInputElement>(null);
  const eventDescriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const { push } = useRouter();

  const [activeForm, setActiveForm] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    eventID: "",
    date: null,
    startTime: null,
    endTime: null,
    description: "",
    // missing from schema: picture, alt, eventID
    // not included in schema: startTime, endTime
  });

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

    // posting event
    try {
      const response = await fetch("/api/events/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
      console.error("Create New Event Error", error);
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
    console.log("input key pressed");
    if (e.key === "Tab") {
      e.preventDefault();
      switch (e.currentTarget.id) {
        case "newEventButton":
          updateEventButtonRef?.current?.focus();
          break;
        case "updateEventButton":
          firstInputRef?.current?.focus();
          break;
        case "title":
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

  const handleNewEventForm = () => {
    setActiveForm(0);
  };

  const handleUpdateEventForm = () => {
    setActiveForm(1);
  };

  return (
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
            onClick={handleNewEventForm}
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
            onClick={handleUpdateEventForm}
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
              required
              ref={firstInputRef}
              onKeyDown={handleInputKeyPress}
            />
          ) : (
            <select
              className={styles.selectEvent}
              id="firstInput"
              name="name"
              required // TODO: figure out ref here
              onKeyDown={handleInputKeyPress}
            >
              <option value="">Select Event...</option>
              <option value="event1">Event1</option>
              {/* TODO: map all events pulled */}
            </select>
          )}
          <input
            className={styles.input}
            type="date"
            id="date"
            name="date"
            placeholder="Date"
            required
            ref={dateInputRef}
            onKeyDown={handleInputKeyPress}
          />
          <div className={styles.inputTimes}>
            <input
              className={styles.input}
              type="time"
              id="startTime"
              name="startTime"
              placeholder="Start Time"
              required
              ref={startTimeInputRef}
              onKeyDown={handleInputKeyPress}
            />
            <input
              className={styles.input}
              type="time"
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
            name="eventDescription"
            placeholder="Event Description"
            required
            ref={eventDescriptionInputRef}
            onKeyDown={handleInputKeyPress}
          ></textarea>
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
  );
};

export default ManageEventsPage;
