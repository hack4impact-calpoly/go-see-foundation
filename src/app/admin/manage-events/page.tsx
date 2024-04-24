"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./manage-events.module.css";
import { useRouter } from "next/navigation";
import { IEvent } from "@database/eventSchema";

const ManageEventsPage = () => {
  const newEventButtonRef = useRef<HTMLButtonElement>(null);
  const updateEventButtonRef = useRef<HTMLButtonElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const startTimeInputRef = useRef<HTMLInputElement>(null);
  const endTimeInputRef = useRef<HTMLInputElement>(null);
  const eventDescriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const altTextInputRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const { push } = useRouter();

  const [activeForm, setActiveForm] = useState(0);
  const [events, setEvents] = useState<Array<IEvent>>([]);
  const [formData, setFormData] = useState({
    picture: "",
    alt: "",
    description: "",
    date: null,
    name: "",
    eventID: "",
    startTime: null,
    endTime: null,
  });

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

    // Create New Event, POST
    if (activeForm === 0) {
      try {
        const newDescription = `Start Time: ${formData["startTime"]}\nEnd Time: ${formData["endTime"]}\n\n${formData["description"]}`;
        formData["eventID"] = formData.name; // temporary, eventID same as name
        formData["picture"] = "/Group_Photo.jpeg"; // temporary, need to add picture input
        const response = await fetch("/api/events/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            picture: formData["picture"],
            alt: formData["alt"],
            description: newDescription,
            date: formData["date"],
            name: formData["name"],
            eventID: formData["eventID"],
          }),
        });

        const responseData = await response.json();
        if (response.ok && responseData.message == "Success: Event uploaded") {
          alert("New Event Created!");
          // push("/admin");
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
            >
              <option value="">Select Event...</option>
              {events.map((_: any, index: number) => (
                <option value={String(events[index].eventID)}>
                  {events[index].name}
                </option>
              ))}
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
            name="description"
            placeholder="Event Description"
            value={formData["description"]}
            required
            ref={eventDescriptionInputRef}
            onKeyDown={handleInputKeyPress}
          ></textarea>
          {activeForm === 0 ? (
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
          )}
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
