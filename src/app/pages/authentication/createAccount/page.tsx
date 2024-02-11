/* createAccount Page */

"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../../../images/GO-See-HLogo.fw_.png";
// import "./createAccount.css";
import styles from "./createAccount.module.css";

const CreateAccount = () => {
  const [account, setAccount] = useState({
    first: "",
    last: "",
    phone: "",
    email: "",
    user: "",
    password: "",
  });

  const handleAccountChange = (e: React.FormEvent<HTMLFormElement>) => {
    const event = e.target as HTMLInputElement;
    setAccount({ ...account, [event.id]: event.value });
  };

  const handleCreateAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //if successful, redirect to different page
  };

  return (
    // <div className="createAccount">
    <div className={styles.createAccount}>
      {/* need to change to Helvetica Neue 
            <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Inter"
      ></link>*/}
      {/* <Image
        src={logo}
        alt="Go See Foundation's Logo"
        width="360"
        height="95"
      /> */}
      <br></br>
      <h1 className={styles.title}>Sign in and join the Go See community!</h1>
      <div className={styles.container}>
        <form
          className={styles.createForm}
          onChange={handleAccountChange}
          onSubmit={handleCreateAccount}
        >
          {/* <button className={styles.button}>Sign up now!</button> */}
          <br></br>
          <h2 className={styles.heading}>Step 1: Personal Info:</h2>
          <input
            className={styles.input}
            type="text"
            id="first"
            placeholder="First Name"
            required
          />
          <input
            className={styles.input}
            type="text"
            id="last"
            placeholder="Last Name"
            required
          />
          <input
            className={styles.input}
            type="text"
            id="birth"
            placeholder="Date of Birth"
            required
          />
          <select className={styles.input} id="user">
            <option value="select" disabled selected>
              Select One
            </option>
            <option value="Member">Member</option>
            <option value="Volunteer">Volunteer</option>
            <option value="Partner/Donor">Partner/Donor</option>
          </select>
          <br></br>
          <h2 className={styles.heading}>Step 2: Account Info:</h2>
          <input
            className={styles.input}
            type="email"
            id="email"
            placeholder="Email"
            required
          />
          <input
            className={styles.input}
            type="tel"
            id="phone"
            pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$"
            placeholder="Phone Number"
            required
          />
          <input
            className={styles.input}
            type="password"
            id="password"
            placeholder="Password"
            required
          />
          <input
            className={styles.input}
            type="password"
            id="password"
            placeholder="Repeat Password"
            required
          />
          <div className={styles.chkboxcontainer}>
            <input type="checkbox" id="myCheckbox" name="myCheckbox" />
            <label htmlFor="myCheckbox">
              Sign me up for email notifications.
            </label>
          </div>
          <br></br>
          <button className={styles.signup} id="signup" type="submit">
            SIGN UP
          </button>
          <br></br>
          {/* horizontal line here */}
          <p>Already have an account?</p>
          <button className={styles.login} id="login">
            LOG IN
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
