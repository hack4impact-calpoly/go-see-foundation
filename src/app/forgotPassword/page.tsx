"use client";
import React, { MouseEventHandler, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import backgroundLogo from "../images/backgroundLogo.png";
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
  const onClickEmail = () => {
    console.log(loginData);
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
