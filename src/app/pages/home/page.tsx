/* home page */

"use client";
import React, { useState } from "react";
import Image from "next/image";
import logoImage from "../../../images/GO-See-HLogo.fw_.png";
import groupImage from "../../images/Group-Photo.jpeg";
import "./page.css";

export default function home() {
  return (
    
    <div className="home"> 
      <Image
            className="groupImage"
            src={groupImage}
            alt="Go See Foundation's Group Photo"
            width = "500"
            height= "500"
          ></Image>
      <div className="homedescript">
        <h1> GO See Foundation </h1>
        <h3> Our mission is to encourage, inspire and empower those 
          going through vision loss to remain active and engaged with 
          their world.
        </h3>
        <button className="joinButton" type="button">
            JOIN US
        </button>
        <h3> Here&apos;s what we&apos;ve been up to … </h3>
      </div>
    </div>
    
    
  );
}





