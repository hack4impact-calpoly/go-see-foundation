"use client";
import React, { MouseEventHandler, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./emailSent.module.css";
import backgroundLogo from "../../images/backgroundLogo.png";

export default function EmailSent() {
  const emailInputRef = useRef<HTMLInputElement>(null);

  const [loginData, setLoginData] = useState({
    email: "",
  });

  const handleLoginChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      switch (e.currentTarget.id) {
        case "signUp":
          emailInputRef?.current?.focus();
          break;
        default:
          return;
      }
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.backgroundLogoContainer}>
        <Image
          src={backgroundLogo}
          alt="background logo for the Go See Foundation"
          height="0"
          width="0"
          className="backgroundLogo"
          priority={true}
        />
      </div>
      <h1 className={styles.Title}>Welcome back to your account!</h1>
      <form className={styles.FormBody}>
        <h2 className={styles.fTitle}>Check your email</h2>
        <h3 className={styles.fontSubtitle}>
          We have sent an email with a password reset to your email!
        </h3>
        <h3 className={styles.fontSubtitle}>
          Didn't get an email? Check spam or promotion folder.
        </h3>

        <div className={styles.emailBody}>
          <button
            id="login"
            className={styles.loginButtonFP}
            type="submit"
            onKeyDown={(e: any) => handleInputKeyPress(e)}
          >
            RESEND EMAIL
          </button>

          <button
            id="login"
            className={styles.BacktoLoginButton}
            type="submit"
            onKeyDown={(e: any) => handleInputKeyPress(e)}
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
}
