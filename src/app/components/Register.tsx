"use client";
import React, { useState, useRef, FormEventHandler } from "react";
import styles from "./register.module.css";
import { IEvent } from "@database/eventSchema";

export default function Register({ event }: { event: IEvent }) {
  const emailRef = useRef<HTMLInputElement>(null);
  const sightedGuideRef = useRef<HTMLInputElement>(null);
  const nonSightedGuideRef = useRef<HTMLInputElement>(null);
  const haveGoneRef = useRef<HTMLInputElement>(null);
  const haventGoneRef = useRef<HTMLInputElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const registerButtonRef = useRef<HTMLButtonElement>(null);

  const [registerData, setRegisterData] = useState({
    email: "",
    haveGone: "",
    sightedGuide: "",
    comment: "N/A",
  });

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let emailInputs;

    try {
      const response = await fetch("/api/signedInUser/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      emailInputs = await response.json();
    } catch {
      alert("Please Sign In to Proceed");
    }

    let comments = registerData.comment;
    if (comments == "") {
      comments = "N/A";
    }
    const email = emailInputs.email;
    console.log("email: ", email);
    const eventName = event.name;
    let attendedEventBefore;
    let needSightedGuide;

    if (registerData.haveGone === "no") {
      attendedEventBefore = false;
    } else {
      attendedEventBefore = true;
    }

    if (registerData.sightedGuide === "no") {
      needSightedGuide = false;
    } else {
      needSightedGuide = true;
    }

    try {
      console.log("needSightedGuide: ", needSightedGuide);
      console.log("attendedEventBefore: ", attendedEventBefore);

      const response = await fetch("/api/eventSignUp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          needSightedGuide,
          attendedEventBefore,
          comments,
          email,
          eventName,
        }),
      });

      const responseData = await response.json();

      if (responseData.status === 200) {
        alert("Successful Event Sign Up!");
      } else if (
        responseData.status === 400 &&
        responseData.message === "Error: Already Signed Up For this Event"
      ) {
        console.log(responseData.status);
        alert("You are already signed up for this event");
      } else if (
        responseData.status === 400 &&
        responseData.message === "Please Sign In"
      ) {
        alert("Please sign in and try again");
      }
    } catch (error) {
      console.log("Event Sign Up Error", error);
    }
  }

  const handleLoginChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    console.log("changing");
    const { name, value } = e.target;
    console.log(name);
    setRegisterData((prevRegisterData) => ({
      ...prevRegisterData,
      [name]: value,
    }));
  };

  return (
    <div className={styles.register}>
      <h1 className={styles.title}>Register for Event</h1>
      <form className={styles.registerInputs} onSubmit={handleRegister}>
        <div className={styles.questions}>
          <p className={styles.question}>Do you need a sighted guide?</p>
          <div className={styles.options}>
            <label className={styles.yes}>
              <input
                className={styles.radio}
                type="radio"
                name="sightedGuide"
                value="yes"
                onChange={(e) => handleLoginChange(e)}
                ref={nonSightedGuideRef}
              />
              Yes
            </label>
            <label className={styles.no}>
              <input
                className={styles.radio}
                type="radio"
                name="sightedGuideNo"
                value="no"
                onChange={(e) => handleLoginChange(e)}
                ref={sightedGuideRef}
              />
              No
            </label>
          </div>
          <br></br>
          <p className={styles.question}>
            Have you been to a GO See event before?
          </p>
          <div className={styles.options}>
            <label className={styles.yes}>
              <input
                className={styles.radio}
                type="radio"
                name="haveGone"
                onChange={(e) => handleLoginChange(e)}
                value="yes"
                ref={haveGoneRef}
              />
              Yes
            </label>
            <label className={styles.no}>
              <input
                className={styles.radio}
                type="radio"
                name="haveGoneNo"
                onChange={(e) => handleLoginChange(e)}
                value="no"
                ref={haveGoneRef}
              />
              No
            </label>
          </div>
          <br></br>
          <p className={styles.question}>
            Is there anything else you would like us to know?
          </p>
        </div>
        <textarea
          className={styles.comment}
          id="comment"
          name="comment"
          placeholder="Write comment"
          onChange={(e) => handleLoginChange(e)}
          ref={commentRef}
        />
        <button
          className={styles.registerButton}
          id="register"
          type="submit"
          ref={registerButtonRef}
        >
          REGISTER
        </button>
      </form>
    </div>
  );
}
