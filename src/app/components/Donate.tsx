"use client"
import { useState } from "react";
import "./Donate.css";
import donateImage from "../images/donateImage.png"
import Image from "next/image";

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

    // make sure it's the only button selected
    document.querySelectorAll(".amountButton").forEach((b) => {
      b.classList.remove("selected");
    });

    e.target.classList.add("selected");

    // make sure it's the only button selected
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

  /* for submitting the form */
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // handle the form submission here
    // FUNCTIONALITY TO DO FOR BACKEND
    console.log(time, amount);
  };

  return (
    <div>
      <h1>Your Donation will help us GO See More!</h1>
      <div className="donateComponent">
        <Image
          className="donateImage"
          src={donateImage}
          alt="A photo of GO Foundation members and a dog"
        ></Image>{" "}
        <div className="description">{desc}</div>
        <form className="donateForm" onSubmit={handleSubmit}>
          <div className="donateAmount">
            <p>Donation Amount:</p>
            <div className="amntButtonDiv">
              <button className="amountButton selected" onClick={amountOnClick}>
                $25
              </button>
              <button className="amountButton" onClick={amountOnClick}>
                $50
              </button>
              <button className="amountButton" onClick={amountOnClick}>
                $100
              </button>
            </div>
            <div className="amntButtonDiv">
              <button className="amountButton" onClick={amountOnClick}>
                $250
              </button>
              <button className="amountButton" onClick={amountOnClick}>
                $500
              </button>
              <input
                type="number"
                className="amountButton"
                min={0}
                onChange={amountInput}
                placeholder="$"
              ></input>
            </div>
          </div>
          <div className="donateFrequency">
            <p>Donation Frequency:</p>
            <select onChange={(e) => setTime(e.target.value)}>
              <option value="Once">One-Time</option>
              <option value="Monthly">Monthly</option>
              <option value="Monthly">Annualy</option>
            </select>
          </div>
          <div className="personalInformation">
            <p>Personal Information:</p>
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="email" placeholder="Email Address" />
          </div>
          <button type="submit">DONATE</button>
        </form>
      </div>
    </div>
  );
}
