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
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Inter"
      ></link>
      <Image
        src={logo}
        alt="Go See Foundation's Logo"
        width="360"
        height="95"
      />
      <br></br>
      <br></br>
      <div>
        <form
          className={styles.createForm}
          onChange={handleAccountChange}
          onSubmit={handleCreateAccount}
        >
          <button className={styles.button}>Sign up now!</button>
          <br></br>
          <div className={styles.row}>
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
          </div>
          <div className={styles.row}>
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
              type="email"
              id="email"
              placeholder="Email"
              required
            />
          </div>
          <div className={styles.row}>
            <select className={styles.input} id="user">
              <option value="select" disabled selected>
                Select One
              </option>
              <option value="Member">Member</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Partner/Doner">Partner/Donor</option>
            </select>
            <input
              className={styles.input}
              type="password"
              id="password"
              placeholder="Password"
              required
            />
          </div>
          <br></br>
          <button className={styles.button} type="submit">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
