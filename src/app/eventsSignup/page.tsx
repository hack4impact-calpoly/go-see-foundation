"use client";
import React, { useState } from "react";
import Image from "next/image";
import EventDescript from "@components/EventDescript";
import kayak from "../images/kayak.png";
import logo from "../images/backgroundLogo.png"
import Register from "@components/Register";
import "./eventSignup.css";


export default function eventsSignup() {   
  return (
    <div>

      <div className="outer-container">
        <div>
          <Image
            src={kayak} 
            alt="Kayaking Group Photo"
            width="1640"
            height="550"
          />
        </div>
        <div className="component">
          <EventDescript/> 
          <Register></Register>
        </div>
      </div>
    </div>
  );
}

/*<div className="logo">
        <Image
          src={logo}
          alt="Logo"
          height="0"
          width="0"
          className="logo"
          priority={true}
        />
      </div>*/