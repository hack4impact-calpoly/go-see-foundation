"use client";
import React, { MouseEventHandler, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import emailjs from "@emailjs/browser";

import { redirect, useRouter, permanentRedirect } from "next/navigation";
import backgroundLogo from "../images/backgroundLogo.png";
import emailIcon from "../images/emailIcon.png";
import passwordIcon from "../images/passwordIcon.png";
import styles from "./forgotPassword.module.css";

export default function ForgotPassword() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const loginButtonRef = useRef<HTMLButtonElement>(null);

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

  //use this to make any api calls that are need in password verification
  const onClickEmail = async(e: any) => {
    try{
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: loginData.email }),
      });
      if (response.ok) {
        const responseBody = await response.json();
        const resetLink = `http://localhost:3000/reset-password?token=${responseBody.token}`;
        const emailText = `Link to reset password: ${resetLink}`;
        const params = {
            to_email: loginData.email,
            message: emailText,
          };

        emailjs
            .send("service_cppo4i7", "template_izma6p8", params, {publicKey: "GKeCNmE1q3H0bTjJE"})
            .then((response) => {
                console.log("Email sent successfully!", response);
            })
            .catch((error) => {
                console.error("Error sending email:", error);
            });
      }
      else{
        console.error('Error:', response.statusText);
      }
    }
    catch(error){
      console.error('Error:', error);
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
        <h2 className={styles.fTitle}>Forgot Password</h2>
        <h3 className={styles.fontSubtitle}>
          Please enter your email to reset your password
        </h3>

        <div className={styles.emailBody}>
          <p className={styles.emailText}>Your Email</p>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="name@email.com"
              value={loginData.email}
              onChange={handleLoginChange}
              onKeyDown={(e) => handleInputKeyPress(e)}
              ref={emailInputRef}
              required
            />
          </div>

          <Link
            href={{
              pathname: `/forgotPassword/[email]`,
              query: {
                id: loginData.email, // pass the id
              },
            }}
            as={`/forgotPassword/${loginData.email}`}
          >
            <button
              id="login"
              onClick={onClickEmail}
              className={styles.loginButtonFP}
              type="submit"
              ref={loginButtonRef}
              onKeyDown={(e: any) => handleInputKeyPress(e)}
            >
              SEND
            </button>
          </Link>

          <Link href={"/login"}>
            <button
              id="login"
              className={styles.BacktoLoginButton}
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
