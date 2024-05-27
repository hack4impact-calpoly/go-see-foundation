"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./resetPassword.module.css";
import backgroundLogo from "../images/backgroundLogo.png";
import revealedIcon from "../images/revealedIcon.png";
import hiddenIcon from "../images/hiddenIcon.png";

export default function ResetPasswordPage() {
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const revealNewPasswordRef = useRef<HTMLInputElement>(null);
  const repeatPasswordRef = useRef<HTMLInputElement>(null);
  const revealRepeatPasswordRef = useRef<HTMLInputElement>(null);
  const resetButtonRef = useRef<HTMLButtonElement>(null);
  const backButtonRef = useRef<HTMLAnchorElement>(null);
  const { push } = useRouter();

  const [showError, setShowError] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [resetData, setResetData] = useState({
    newPassword: "",
    repeatPassword: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("reset pressed");

    if (resetData.newPassword === resetData.repeatPassword) {
      try {
        // TODO: Backend, PUT request to update new password
        console.log("passwords match");
        const response = null;
      } catch (error) {
        console.error("Reset Password Error", error);
      }
    } else {
      console.log("passwords do NOT match");
      setShowError(true);
    }
  };

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setResetData((prevResetData) => ({
      ...prevResetData,
      [name]: value,
    }));
    setShowError(false);
  };

  const handleReveal = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (e.currentTarget.id === "newRevealButton") {
      setShowNewPassword(!showNewPassword);
    } else {
      setShowRepeatPassword(!showRepeatPassword);
    }
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      switch (e.currentTarget.id) {
        case "newPassword":
          revealNewPasswordRef?.current?.focus();
          break;
        case "revealNewPassword":
          repeatPasswordRef?.current?.focus();
          break;
        case "repeatPassword":
          revealRepeatPasswordRef?.current?.focus();
          break;
        case "revealRepeatPassword":
          resetButtonRef?.current?.focus();
          break;
        case "resetButton":
          backButtonRef?.current?.focus();
          break;
        case "backButton":
          newPasswordRef?.current?.focus(); // loops back to top
          break;
        default:
          return;
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <Image
          src={backgroundLogo}
          alt="background logo for the Go See Foundation"
          height="0"
          width="0"
          className={styles.backgroundLogo}
          priority={true}
        />
      </div>
      <h1 className={styles.pageTitle}>Welcome back to your account!</h1>
      <form className={styles.resetForm} onSubmit={handleSubmit}>
        <h2 className={styles.formTitle}>Reset Password</h2>
        <h3 className={styles.formSubtitle}>
          Choose a new password for your account.
        </h3>

        <div className={styles.inputWrapper}>
          <label
            htmlFor="newPassword"
            className={styles.newPasswordLabel}
          ></label>
          <input
            type={showNewPassword ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            placeholder="Type your new password"
            value={resetData.newPassword}
            onChange={handleFormChange}
            onKeyDown={(e) => handleInputKeyPress(e)}
            ref={newPasswordRef}
            required
          />
          <button
            id="newRevealButton"
            className={styles.revealButton}
            onClick={handleReveal}
          >
            <Image
              className={styles.revealIcon}
              src={showNewPassword ? revealedIcon : hiddenIcon}
              alt="Reveal new password"
              width="512"
              height="512"
            />
          </button>
        </div>
        <div className={styles.inputWrapper}>
          <label
            htmlFor="repeatPassword"
            className={styles.repeatPasswordLabel}
          ></label>
          <input
            type={showRepeatPassword ? "text" : "password"}
            id="repeatPassword"
            name="repeatPassword"
            placeholder="Confirm your password"
            value={resetData.repeatPassword}
            onChange={handleFormChange}
            onKeyDown={(e) => handleInputKeyPress(e)}
            ref={repeatPasswordRef}
            required
          />
          <button
            id="repeatRevealButton"
            className={styles.revealButton}
            onClick={handleReveal}
          >
            <Image
              className={styles.revealIcon}
              src={showRepeatPassword ? revealedIcon : hiddenIcon}
              alt="Reveal new password"
              width="512"
              height="512"
            />
          </button>
        </div>
        {showError ? (
          <p className={styles.errorMessage}>Passwords do not match</p>
        ) : null}
        <button
          id="reset"
          className={`${styles.resetButton} ${
            showError ? styles.inactive : ""
          }`}
          type="submit"
          ref={resetButtonRef}
          onKeyDown={(e: any) => handleInputKeyPress(e)}
        >
          RESET
        </button>
        <div className={styles.break}></div>
        <Link
          href="/login"
          id="backButton"
          className={styles.backButton}
          ref={backButtonRef}
          onKeyDown={(e: any) => handleInputKeyPress(e)}
        >
          Back to Login
        </Link>
      </form>
    </div>
  );
}
