"use client";
import React, { useState, useRef } from "react";
import styles from "./manage-events.module.css";
import Link from "next/link";

const ManageEventsPage = () => {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const startTimeInputRef = useRef<HTMLInputElement>(null);
  const endTimeInputRef = useRef<HTMLInputElement>(null);
  const eventDescriptionInputRef = useRef<HTMLInputElement>(null);
  const createEventButtonRef = useRef<HTMLInputElement>(null);

  const handleEventChange = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("form changed");
  };

  const handleNewEvent = () => {
    console.log("form submitted");
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("input key pressed");
  };

  const handleCreateEventSubmit = () => {
    console.log("submit button pressed");
  };

  return (
    <div className={styles.container}>
      <div className={styles.eventManager}>
        <div className={styles.topButtons}>
          <button
            className={styles.newEventButton}
            id="newEventButton"
            type="button"
          >
            New Event
          </button>
          <button
            className={styles.updateEventButton}
            id="updateEventButton"
            type="button"
          >
            Update Event
          </button>
        </div>
        <form
          className={styles.eventForm}
          onChange={handleEventChange}
          onSubmit={handleNewEvent}
        >
          <input
            className={styles.input}
            type="text"
            id="title"
            placeholder="Title"
            required
            ref={titleInputRef}
            onKeyDown={handleInputKeyPress}
          />
          <input
            className={styles.input}
            type="date"
            id="date"
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
              placeholder="Start Time"
              required
              ref={startTimeInputRef}
              onKeyDown={handleInputKeyPress}
            />
            <input
              className={styles.input}
              type="time"
              id="endTime"
              placeholder="End Time"
              required
              ref={endTimeInputRef}
              onKeyDown={handleInputKeyPress}
            />
          </div>
          <input
            className={styles.input}
            type="text"
            id="eventDescription"
            placeholder="Event Description"
            required
            ref={eventDescriptionInputRef}
            onKeyDown={handleInputKeyPress}
          />
          <button
            className={styles.createEventButton}
            id="createEventButton"
            type="submit"
            ref={createEventButtonRef}
            onClick={handleCreateEventSubmit}
          >
            Create New Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageEventsPage;
