/* home page */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import groupImage from ".//images/Group_Photo.jpeg";
import Link from "next/link";
import "./page.css";
import FounderStory from "@components/FounderStory";
import Carousel from "@components/Carousel";
import HomeEvents from "@components/HomeEvents";
import SeussQuote from "@components/seussQuote";
import ImageUploadButton from "@components/UploadImage";


export default function home() {
  const images = [
    "/Group_Photo.jpeg",
    "/backgroundLogo.png",
    "/GO-See-HLogo.fw_.png",
  ];
  const imageAlts = ["a group photo", "a menu", "the go see logo"];
  const quotes = [
    "Practicing Yoga has always been a challenge for me, but doing it with my GO SEE friends have been so much fun!!",
    "We need a dr. seuss quote here",
    "third quote testing the buttons",
  ];
  const quoteSrc = [
    "Mark Jonas (member)",
    "Quote Author 2 (member)",
    "Quote Author 3 (admin)",
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
        <Link href = "/createAccount">
          <button className="joinButton" type="button">
            JOIN US
          </button>
        </Link>
      </div>
      <FounderStory />
      <Carousel
        images={images}
        imageAlts={imageAlts}
        quotes={quotes}
        quoteSrc={quoteSrc}
      />
      <HomeEvents />
      <SeussQuote />
      
    </div>
  );
}
