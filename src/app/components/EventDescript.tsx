"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import calender from "../images/calendar-icon.png";
import clock from "../images/clock-icon.png";
import pin from "../images/pin-icon.png";
import "./EventDescript.css";
import { IEvent } from "@database/eventSchema";

export default function EventDescript({ event }: { event: IEvent | null }) {
  if (!event) return <div>Loading...</div>;

  const {
    name,
    date,
    startTime,
    endTime,
    description,
    location,
  } = event;

  return (
    <div className="event">
      <div className="eventTitle">
        <h1>{name}</h1>
      </div>
      <div className="details">
        <div className="calendar">
          <Image src={calender} alt="Calendar" width="35" height="35"></Image>
          <h3>{new Date(date).toDateString()}</h3>
        </div>
        <div className="clock">
          <Image src={clock} alt="Clock" width="35" height="35"></Image>
          <h3>
            {startTime} - {endTime}
          </h3>
        </div>
        <div className="dollar"></div>
        <div className="pin">
          <Image src={pin} alt="Pin" width="35" height="35"></Image>
          <h3>{location}</h3>
        </div>
      </div>
      <div className="description">
        <div className="descript">
          <h2> Description: </h2>
        </div>
        <div className="about">
          <h2>{description}</h2>
        </div>
      </div>
      <div className="accomodations"></div>
    </div>
  );
}
