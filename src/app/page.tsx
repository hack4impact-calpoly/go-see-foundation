"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import FounderStory from "@components/FounderStory";
import Carousel from "@components/Carousel";
import HomeEvents from "@components/HomeEvents";
import SeussQuote from "@components/seussQuote";
import "./page.css"; 

export default function Home() {
  const navbarRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    if (navbarRef.current) {
      navbarRef.current.focus();
    }
  }, []);

  function handleNavbarKeyPress(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter") {
      console.log("Navbar item clicked!");
    }
  }

  return (
    <div className="home">
      <Image
        className="groupImage"
        src="/Group_Photo.jpeg"
        alt="Go See Foundation's Group Photo"
        width={500}
        height={500}
      />

      <div className="homedescript">
        <h1>GO See Foundation</h1>
        <h3>
          Our mission is to encourage, inspire, and empower those going through
          vision loss to remain active and engaged with their world.
        </h3>
        <button className="joinButton" type="button">
          JOIN US
        </button>
      </div>

      <div
        className="navbar"
        ref={navbarRef}
        tabIndex={-1} 
        onKeyDown={handleNavbarKeyPress} 
        style={{ display: "none" }} 
      >
        <h2>This is the Navbar</h2>
        <ul>
          <li>Link 1</li>
          <li>Link 2</li>
          <li>Link 3</li>
        </ul>
      </div>

      <FounderStory />
      <Carousel
        images={[
          "/Group_Photo.jpeg",
          "/backgroundLogo.png",
          "/GO-See-HLogo.fw_.png",
        ]}
        imageAlts={["a group photo", "a menu", "the go see logo"]}
        quotes={[
          "Practicing Yoga has always been a challenge for me, but doing it with my GO SEE friends has been so much fun!!",
          "We need a Dr. Seuss quote here",
          "Third quote testing the buttons",
        ]}
        quoteSrc={[
          "Mark Jonas (member)",
          "Quote Author 2 (member)",
          "Quote Author 3 (admin)",
        ]}
      />
      <HomeEvents />
      <SeussQuote />
    </div>
  );
}

