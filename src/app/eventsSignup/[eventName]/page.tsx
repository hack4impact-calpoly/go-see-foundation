"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import EventDescript from "@components/EventDescript";
import kayak from "../../images/kayak.png";
import logo from "../images/backgroundLogo.png";
import Register from "@components/Register";
import { IEvent } from "@database/eventSchema";
import "./eventsSignup.css";

export default function EventsSignup() {
  const [event, setEvent] = useState<IEvent | null>(null);
  const [eventName, setEventName] = useState<string | null>(null);

  useEffect(() => {
      // Extract event name from URL
      const pathArray = window.location.pathname.split("/");
      const nameIndex = pathArray.indexOf("eventsSignup") + 1;
      const eventName = nameIndex !== 0 ? pathArray[nameIndex] : null;
      console.log(eventName)
      setEventName(eventName);
  }, []);

  useEffect(() => {
      if (eventName) {
          fetchEventData(eventName);
      }
  }, [eventName]);

  const fetchEventData = async (eventName: string) => {
      try {
          const response = await fetch(`/api/events/${eventName}`);
          if (response.ok) {
              const eventData = await response.json();
              console.log("Fetched event data:", eventData);
              setEvent(eventData);
          } else {
              console.error("Failed to fetch event data");
          }
      } catch (error) {
          console.error("Error fetching event data:", error);
      }
  };
  
  return (
    <div>
      <div className="outer-container">
        <div className="eventPicture">
          <Image
            src={kayak}
            alt="Kayaking Group Photo"
            layout="responsive"
          />
        </div>
        <div className="component">
          <EventDescript event={event}/>
          <Register></Register>
        </div>
      </div>
    </div>
  );
}