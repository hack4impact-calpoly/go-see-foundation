"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import logo from "../../../images/GO-See-HLogo.fw_.png";
import styles from "./createAccount.module.css";
import Link from "next/link";

const CreateAccount = () => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const lastInputRef = useRef<HTMLInputElement>(null);
  const birthInputRef = useRef<HTMLInputElement>(null);
  const userSelectRef = useRef<HTMLSelectElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const repeatPasswordInputRef = useRef<HTMLInputElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);
  const signupButtonRef = useRef<HTMLButtonElement>(null);
  const loginButtonRef = useRef<HTMLButtonElement>(null);

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

  const handleSelectKeyPress = (e: React.KeyboardEvent<HTMLSelectElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      switch (e.currentTarget.id) {
        case "user":
          emailInputRef?.current?.focus();
          break;
        // Add cases for other select options if needed
        default:
          break;
      }
    }
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      switch (e.currentTarget.id) {
        case "first":
          lastInputRef?.current?.focus();
          break;
        case "last":
          birthInputRef?.current?.focus();
          break;
        case "birth":
          userSelectRef?.current?.focus();
          break;
        case "user":
          emailInputRef?.current?.focus();
          break;
        case "email":
          phoneInputRef?.current?.focus();
          break;
        case "phone":
          passwordInputRef?.current?.focus();
          break;
        case "password":
          repeatPasswordInputRef?.current?.focus();
          break;
        case "repeatPassword":
          checkboxRef?.current?.focus();
          break;
        case "myCheckbox":
          signupButtonRef?.current?.focus();
          break;
        case "signup":
          loginButtonRef?.current?.focus();
          break;
        case "login":
          firstInputRef?.current?.focus(); // Loop back to the first input field
          break;
        default:
          break;
      }
    }
  };

  const handleButtonKeyPress = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      switch (e.currentTarget.id) {
        case "signup":
          loginButtonRef?.current?.focus();
          break;
        case "login":
          firstInputRef?.current?.focus(); // Loop back to the first input field
          break;
        default:
          break;
      }
    }
  };

  const handleCreateAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // If successful, redirect to a different page
  };

  return (
    <div className={styles.createAccount}>
      
      <br></br>
      <h1 className={styles.title}>Sign in and join the Go See community!</h1>
      <div className={styles.container}>
        <form
          className={styles.createForm}
          onChange={handleAccountChange}
          onSubmit={handleCreateAccount}
        >
          <h2 className={styles.heading}>Step 1: Personal Info:</h2>
          <div className={styles.inputs}>
            <input
              className={styles.input}
              type="text"
              id="first"
              placeholder="First Name"
              required
              ref={firstInputRef}
              onKeyDown={handleInputKeyPress}
            />
            <input
              className={styles.input}
              type="text"
              id="last"
              placeholder="Last Name"
              required
              ref={lastInputRef}
              onKeyDown={handleInputKeyPress}
            />
            <input
              className={styles.input}
              type="text"
              id="birth"
              placeholder="Date of Birth"
              required
              ref={birthInputRef}
              onKeyDown={handleInputKeyPress}
            />
            <select
              className={styles.input}
              id="user"
              ref={userSelectRef}
              onKeyDown={handleSelectKeyPress}
            >
              <option value="select" disabled selected>
                Select One
              </option>
              <option value="Member">Member</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Partner/Donor">Partner/Donor</option>
            </select>
          </div>
          <br></br>
          <h2 className={styles.heading}>Step 2: Account Info:</h2>
          <div className={styles.inputs}>
            <input
              className={styles.input}
              type="email"
              id="email"
              placeholder="Email"
              required
              ref={emailInputRef}
              onKeyDown={handleInputKeyPress}
            />
            <input
              className={styles.input}
              type="tel"
              id="phone"
              pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$"
              placeholder="Phone Number"
              required
              ref={phoneInputRef}
              onKeyDown={handleInputKeyPress}
            />
            <input
              className={styles.input}
              type="password"
              id="password"
              placeholder="Password"
              required
              ref={passwordInputRef}
              onKeyDown={handleInputKeyPress}
            />
            <input
              className={styles.input}
              type="password"
              id="repeatPassword"
              placeholder="Repeat Password"
              required
              ref={repeatPasswordInputRef}
              onKeyDown={handleInputKeyPress}
            />
          </div>
          <div className={styles.chkboxcontainer}>
            <input
              type="checkbox"
              id="myCheckbox"
              name="myCheckbox"
              ref={checkboxRef}
              onKeyDown={handleInputKeyPress}
            />
            <label className={styles.checkboxtext} htmlFor="myCheckbox">
              Sign me up for email notifications.
            </label>
          </div>
          <br></br>
          <div className={styles.buttons}>
            <button
              className={styles.signup}
              id="signup"
              type="submit"
              ref={signupButtonRef}
              onKeyDown={handleButtonKeyPress}
            >
              SIGN UP
            </button>
            <br></br>
            <div className={styles.break}></div>
            <p className={styles.accounttext}>Already have an account?</p>
            
            
            <button
              className={styles.login}
              id="login"
              ref={loginButtonRef}
              onKeyDown={handleButtonKeyPress}
            >
              LOG IN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
