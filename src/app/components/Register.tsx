"use client";
import React, { useState, useRef } from "react";
import styles from "./register.module.css";

export default function Register() {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const attendeeTypeRef = useRef<HTMLSelectElement>(null);
  const sightedGuideRef = useRef<HTMLInputElement>(null);
  const haveGoneRef = useRef<HTMLInputElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const registerButtonRef = useRef<HTMLButtonElement>(null);

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    atendeeType: "",
    yesSightedGuide: false,
    noSightedGuide: false,
    yesHaveGone: false,
    noHaveGone: false,
    comment: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setRegisterData((prevRegisterData) => ({
      ...prevRegisterData,
      [name]: value,
    }));
  };

//   const handleCheckboxes = (): void => {
//     const { name, value } = e.target;
//     setRegisterData((prevRegisterData) => ({
//       ...prevRegisterData,
//       remember: !registerData.remember,
//     }));
//     console.log("Remember me set to: " + String(loginData.remember));
//   };

  return (
    <div className={styles.register}>
        <h1 className={styles.title}>Register for Event</h1>
        <form className={styles.registerInputs}>
            <div className={styles.nameInputs}>
                <input
                    className={styles.firstName}
                    type="text"
                    id="first"
                    placeholder="First Name"
                    required
                    ref={firstNameRef}
                />
                <input
                    className={styles.lastName}
                    type="text"
                    id="last"
                    placeholder="Last Name"
                    required
                    ref={lastNameRef}
                />
            </div>
            <select
              className={styles.user}
              id="user"
              ref={attendeeTypeRef}
            >
              <option value="select" disabled selected>
                Select One
              </option>
              <option value="Member">Member</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Partner/Donor">Partner/Donor</option>
            </select>
            <div className={styles.questions}>
                <p className={styles.question}>Do you need a sighted guide?</p>
                <div className={styles.options}>
                    <label className={styles.yes}>
                        <input
                            className={styles.radio}
                            type="radio"
                            name="sightedGuide"
                            value="yes"
                            ref={sightedGuideRef}
                        />
                        Yes
                    </label>
                    <label className={styles.no}>
                        <input
                            className={styles.radio}
                            type="radio"
                            name="sightedGuide"
                            value="no"
                            ref={sightedGuideRef}
                        />
                        No
                    </label>
                </div>
                <p className={styles.question}>Have you been to a GO See event before?</p>
                <div className={styles.options}>
                    <label className={styles.yes}>
                        <input
                            className={styles.radio}
                            type="radio"
                            name="haveGoneRef"
                            value="yes"
                            ref={haveGoneRef}
                        />
                        Yes
                    </label>
                    <label className={styles.no}>
                        <input
                            className={styles.radio}
                            type="radio"
                            name="haveGoneRef"
                            value="no"
                            ref={haveGoneRef}
                        />
                        No
                    </label>
                </div>
                <p className={styles.question}>Is there anything else you would like us to know?</p>
            </div>
            <textarea
                className={styles.comment}
                id="comment"
                placeholder="Write comment"
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
  )

}