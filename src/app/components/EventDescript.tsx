"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import calender from "../images/calendar-icon.png";
import clock from "../images/clock-icon.png";
import dollar from "../images/dollar-icon.png";
import pin from "../images/pin-icon.png";
import "./EventDescript.css";
import { IEvent } from "@database/eventSchema";
import { useRouter } from "next/navigation";

export default function EventDescript({ event }: { event: IEvent | null }) {  
    if (!event) return <div>Loading...</div>;

    const { name, date, startTime, endTime, description, location, picture, alt } = event;

    return (
        <div className="event">
            <div className="eventTitle">
                <h1>{name}</h1>
            </div>
            <div className = "details" >
                <div className="calendar">
                    <Image 
                        src={calender} 
                        alt= "Calendar"
                        width = "35"
                        height = "35"
                    ></Image>
                    <h3>{new Date(date).toDateString()}</h3>
                </div>
                <div className="clock">
                    <Image 
                        src={clock} 
                        alt= "Clock"
                        width = "35"
                        height = "35"
                    ></Image>
                    <h3>{startTime} - {endTime}</h3>
                </div>
                <div className="dollar">
                    <Image 
                        src={dollar} 
                        alt= "Dollar"
                        width = "35"
                        height = "35"
                    ></Image>
                    <h3>$40 Per Person</h3>
                </div>
                <div className="pin">
                    <Image 
                        src={pin} 
                        alt= "Pin"
                        width = "35"
                        height = "35"
                    ></Image>
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
            <div className="accomodations">
                <div className="accomod">
                    <h2> Accomodations: </h2>
                </div>
                <div className="types">
                    <h2> experienced guides </h2>
                    <h2> service dogs </h2>
                    <h2> rides provided </h2>  
                    <h2> meal provided </h2>  
                </div>
            </div>
        </div>
    );
}