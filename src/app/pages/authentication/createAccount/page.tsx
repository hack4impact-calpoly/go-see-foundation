"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../../images/GO-See-HLogo.fw_.png";
import styles from "./createAccount.module.css";

const CreateAccount = () => {
  const { push } = useRouter();
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
    if (e.key === " Enter") {
      e.preventDefault();
      switch (e.currentTarget.id) {
        case "signup":
          handleCreateAccount();
        case "login":
          handleLogin();
      }
    }
  };

  function handleCreateAccount(): void {
    console.log("create account pressed");
    const message =
      "Create Account pressed. This will eventually create an account with your inputted information.";

    /*TODO: need to check if all info is inputted, and give relevant alerts
      if not inputted, also check if info is reight format
      ex. date of birth (email gives relevant alerts like @ not being included)
      */

    alert(message);
    // If successful, redirect to a different page -- home/log in?
  }

  function handleLogin(): void {
    console.log("log up pressed");
    const message =
      "Login pressed. You will now be redirected to the Login page.";
    alert(message);
    push("/pages/authentication/login");
  }

  return (
    <div className={styles.createAccount}>
      <br role="presentation"></br>
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
              onKeyDown={(e: any) => handleInputKeyPress(e)}
            />
            <input
              className={styles.input}
              type="text"
              id="last"
              placeholder="Last Name"
              required
              ref={lastInputRef}
              onKeyDown={(e: any) => handleInputKeyPress(e)}
            />
            <input
              className={styles.input}
              type="text"
              id="birth"
              placeholder="Date of Birth"
              required
              ref={birthInputRef}
              onKeyDown={(e: any) => handleInputKeyPress(e)}
            />
            <select
              className={styles.input}
              id="user"
              ref={userSelectRef}
              onKeyDown={(e: any) => handleInputKeyPress(e)}
            >
              <option value="select" disabled selected>
                Select One
              </option>
              <option value="Member">Member</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Partner/Donor">Partner/Donor</option>
            </select>
          </div>
          <br aria-label=""></br>
          <h2 className={styles.heading}>Step 2: Account Info:</h2>
          <div className={styles.inputs}>
            <input
              className={styles.input}
              type="email"
              id="email"
              placeholder="Email"
              required
              ref={emailInputRef}
              onKeyDown={(e: any) => handleInputKeyPress(e)}
            />
            <input
              className={styles.input}
              type="tel"
              id="phone"
              pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$"
              placeholder="Phone Number"
              required
              ref={phoneInputRef}
              onKeyDown={(e: any) => handleInputKeyPress(e)}
            />
            <input
              className={styles.input}
              type="password"
              id="password"
              placeholder="Password"
              required
              ref={passwordInputRef}
              onKeyDown={(e: any) => handleInputKeyPress(e)}
            />
            <input
              className={styles.input}
              type="password"
              id="repeatPassword"
              placeholder="Repeat Password"
              required
              ref={repeatPasswordInputRef}
              onKeyDown={(e: any) => handleInputKeyPress(e)}
            />
          </div>
          <div className={styles.chkboxcontainer}>
            <input
              type="checkbox"
              id="myCheckbox"
              name="myCheckbox"
              ref={checkboxRef}
              onKeyDown={(e: any) => handleInputKeyPress(e)}
            />
            <label className={styles.checkboxtext} htmlFor="myCheckbox">
              Sign me up for email notifications.
            </label>
          </div>
          <br aria-label=""></br>
          <div className={styles.buttons}>
            <button
              className={styles.signup}
              id="signup"
              type="submit"
              ref={signupButtonRef}
              onKeyDown={(e: any) => handleInputKeyPress(e)}
              onClick={handleCreateAccount}
            >
              SIGN UP
            </button>
            <br aria-label=""></br>
            <div className={styles.break}></div>
            <p className={styles.accounttext}>Already have an account?</p>
            <button
              className={styles.login}
              type="button"
              id="login"
              onClick={handleLogin}
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
