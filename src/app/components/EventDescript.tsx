"use client";
import React, { useState } from "react";
import Image from "next/image";
import calender from "../images/calendar-icon.png";
import clock from "../images/clock-icon.png";
import dollar from "../images/dollar-icon.png";
import pin from "../images/pin-icon.png";
import "./EventDescript.css";

export default function EventDescript() 
{   return (
    <div className="event">
        <div className="eventTitle">
            <h1> Kayaking at Morro Bay with Central Coast Kayaks </h1>
        </div>
        <div className = "details" >
            <div className="calendar">
                <Image 
                    src={calender} 
                    alt= "Calendar"
                    width = "35"
                    height = "35"
                ></Image>
                <h3>March 5, 2024</h3>
            </div>
            <div className="clock">
                <Image 
                    src={clock} 
                    alt= "Clock"
                    width = "35"
                    height = "35"
                ></Image>
                <h3>10.30am - 3pm</h3>
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
                <h3>1185 Embarcadero, Morro Bay</h3>
            </div>
        </div>
            <div className="descript">
                <h2> Description: </h2>
            </div>
            <div className="about">
                <h2> Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod/  tempor incididunt ut labore et dolore magna 
                    aliqua. Ut enim ad minim  veniam, quis nostrud exercitation 
                    ullamco laboris abdul toros teres vitas marion alr betorisan 
                    kumle bo raka.
                </h2>
            </div>
            <div className="accomodations">
                <h2> Accomodations: </h2>
            </div>
            <div className="types">
                <h2> experienced guides </h2>
                <h2> service dogs </h2>
                <h2> rides provided </h2>  
                <h2> meal provided </h2>  
            </div>
     </div>
    );
}