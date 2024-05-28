"use client";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import FounderStory from "@components/FounderStory";
import Carousel from "@components/Carousel";
import HomeEvents from "@components/HomeEvents";
import SeussQuote from "@components/seussQuote";
import Link from "next/link";
import "./page.css";
import threeBridges from "./Three_Bridges_Hike.png";

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

      <div className="homedescript" tabIndex={0}>
        <h1>GO See Foundation</h1>
        <h3>
          Our mission is to encourage, inspire, and empower those going through
          vision loss to remain active and engaged with their world.
        </h3>
        <Link href="/createAccount">
          <button className="joinButton" type="button">
            JOIN US
          </button>
        </Link>
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
          "/Park.jpg",
          "/Three_Bridges_Hike.png",
          "Pismo_Beach_Hike.jpg",
          "Kayaking.jpg",
          "/Ziplining.jpg",
        ]}
        imageAlts={["a group photo", "three bridges hike", "the go see logo"]}
        quotes={[
          "Practicing Yoga has always been a challenge for me, but doing it with my GO SEE friends has been so much fun!!",
          "I am still on a HIGH from camp, I thought I better let you know how GRATEFUL I am",
          "Beautiful Hike at Three Bridges Oak Preserve with Delta Gamma and Delta Upsilon",
          "Beautiful Beach Walk at Pismo Beach",
          "Amazing Kayaking Tour in Morro Bay",
          "Fun Day of Ziplining at Santa Margarita Adventures",
        ]}
        quoteSrc={[
          "Mark Jonas (member)",
          "Robin Schneider",
          "Quote Author",
          "Quote Author",
          "Quote Author",
          "Quote Author",
        ]}
      />
      <HomeEvents />
      <SeussQuote />
    </div>
  );
}
