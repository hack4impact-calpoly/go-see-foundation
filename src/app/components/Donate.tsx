"use client";
import { useState } from "react";
import "./Donate.css";
import donateImage from "../images/donateImage.png";
import Image from "next/image";
import DonateButtonComponent from "./donateButton";
import Script from "next/script";

export default function Donate() {
  // holds the user selections
  const [time, setTime] = useState("Once");
  const [amount, setAmount] = useState("$25");

  const desc =
    "By donating to the GO See Foundation, you are not just offering financial support; you are providing dignity, independence, and community to those who navigate life's challenges without the gift of perfect sight. Together, let's illuminate paths and create a brighter future for the  vision loss community. Donate today and be a beacon of light in someone's darkness.";

  /* handles changes with the time buttons */
  const timeOnClick = (e: any) => {
    e.preventDefault();
    // check if already selected
    if (e.target.classList.contains("selected")) {
      return;
    }
    // make sure it's the only button selected
    document.querySelectorAll(".timeButton").forEach((b) => {
      b.classList.remove("selected");
    });

    // make it selected for styling
    e.target.classList.add("selected");

    setTime(e.target.innerHTML);
  };

  /* handles changes with the amount button */
  const amountOnClick = (e: any) => {
    e.preventDefault();
    // check if already selected
    if (e.target.classList.contains("selected")) {
      return;
    }

    // Ensure it is the only button selected
    document.querySelectorAll(".amountButton").forEach((b) => {
      b.classList.remove("selected");
    });

    e.target.classList.add("selected");

    // Ensure it's the only button selected
    setAmount(e.target.innerHTML);
  };

  /* handle changes with the change of the input */
  const amountInput = (e: any) => {
    /* user has decided to enter stuff in remove the selected from buttons */
    document.querySelectorAll(".amountButton").forEach((b) => {
      b.classList.remove("selected");
    });
    /* make that inputted value the new amount value */
    setAmount(`$${e.target.value}`);
  };

  /* Submitting the form */
  const handleSubmit = (e: any) => {
    e.preventDefault();

  };

  return (
    <div>
      <h1 tabIndex={0}>Your Donation will help us GO See More!</h1>
      <div className="donateComponent" tabIndex={0}>
        <Image
          className="donateImage"
          src={donateImage}
          alt="A photo of GO Foundation members and a dog"
        ></Image>{" "}
        <div className="description" tabIndex={0}>
          {desc}
        </div>
        <form className="donateForm" onSubmit={handleSubmit}>
          <DonateButtonComponent />
          
        </form>
      </div>
    </div>
  );
}
