/* home page */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import groupImage from "../../images/Group_Photo.jpeg";
import "./page.css";
import FounderStory from "@components/FounderStory";
import Carousel from "@components/Carousel";
import HomeEvents from "@components/HomeEvents";
import HomeQuote from "@components/HomeQuote";

export default function home() {
  const images = [
    // groupImage,
    "../images/Menu.png",
    "/../../images/GO-See-HLogo.fw_.png",
  ];
  const imageAlts = ["a group photo", "a menu", "the go see logo"];
  const quotes = [
    "hello world! this is a quote!",
    "We need a dr. seuss quote here",
    "third quote testing the buttons",
  ];

  return (
    <div className="home">
      <Image
        className="groupImage"
        src={groupImage}
        alt="Go See Foundation's Group Photo"
        // width="500"
        // height="500"
      ></Image>
      <div className="homedescript">
        <h1>GO See Foundation</h1>
        <h3>
          {" "}
          Our mission is to encourage, inspire and empower those going through
          vision loss to remain active and engaged with their world.
        </h3>
        <button className="joinButton" type="button">
          JOIN US
        </button>
        <FounderStory />
        <Carousel images={images} imageAlts={imageAlts} quotes={quotes} />
        <HomeEvents />
        <HomeQuote />
      </div>
    </div>
  );
}
