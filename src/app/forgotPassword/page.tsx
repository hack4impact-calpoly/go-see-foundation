"use client";
import React, { MouseEventHandler, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./forgotPassword.css";
import backgroundLogo from "../images/backgroundLogo.png";
import emailIcon from "../images/emailIcon.png";
import passwordIcon from "../images/passwordIcon.png";

export default function ForgotPassword() {
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
    <div className="loginPage">
      <div className="backgroundLogoContainer">
        <Image
          src={backgroundLogo}
          alt="background logo for the Go See Foundation"
          height="0"
          width="0"
          className="backgroundLogo"
          priority={true}
        />
      </div>
      <h1 className="Title">Welcome back to your account!</h1>
      <form className="FormBody">
        <h2 className="fTitle">Forgot Password</h2>
        <h3 className="fontSubtitle">
          Please enter your email to reset your password
        </h3>

        <div className="emailBody">
          <text>Your Email</text>
          <div className="inputWrapper">
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleLoginChange}
              onKeyDown={(e) => handleInputKeyPress(e)}
              ref={emailInputRef}
              required
            />
          </div>

          

          <button
            id="login"
            className="loginButtonFP"
            type="submit"
            onKeyDown={(e: any) => handleInputKeyPress(e)}
          >
            SEND
          </button>
        </div>
      </form>
    </div>
  );
}
