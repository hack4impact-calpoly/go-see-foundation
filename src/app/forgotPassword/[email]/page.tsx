"use client";
import React, { MouseEventHandler, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./emailSent.module.css";
import backgroundLogo from "../../images/backgroundLogo.png";
import { style } from "motion";
import emailjs from "@emailjs/browser";

export default function EmailSent(context: any) {
  //console.log("here: ", decodeURIComponent(context.params.email));

  const email = decodeURIComponent(context.params.email);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const [loginData, setLoginData] = useState({
    email: "",
  });

  //use this to make any api calls that are need in password verification
  const onClickEmail = (e: any) => {
    fetch('/api/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error: ' + response.statusText);
      }
    })
    .then(responseBody => {
      const resetLink = `http://localhost:3000/reset-password?token=${responseBody.token}`;
      const emailText = `Link to reset password: ${resetLink}`;
      const params = {
        to_email: loginData.email,
        message: emailText,
      };
      return emailjs.send("service_cppo4i7", "template_izma6p8", params, {publicKey: "GKeCNmE1q3H0bTjJE"});
    })
    .then(response => {
      console.log("Email sent successfully!", response);
    })
    .catch(error => {
      console.error("Error:", error);
    });
  };

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
          className={styles.backgroundLogo}
          priority={true}
        />
      </div>
      <h1 className={styles.Title}>Welcome back to your account!</h1>
      <form className={styles.FormBody}>
        <h2 className={styles.fTitle}>Check your email</h2>
        <h3 className={styles.fontSubtitle}>
          We have sent an email with a password reset to your email
        </h3>
        <h3 className={styles.emailText}>{email}</h3>
        <h3 className={styles.fontSubtitle}>
          Didn't get an email? Check spam or promotion folder.
        </h3>

        <div className={styles.emailBody}>
          <button
            id="login"
            className={styles.loginButtonFP}
            type="submit"
            onClick={onClickEmail}
            onKeyDown={(e: any) => handleInputKeyPress(e)}
          >
            RESEND EMAIL
          </button>

          <Link href={"/login"}>
            <button
              id="login"
              className={styles.BacktoLoginButton}
              type="submit"
              onKeyDown={(e: any) => handleInputKeyPress(e)}
            >
              Back to Login
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
