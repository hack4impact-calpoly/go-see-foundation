"use client";
import React, { MouseEventHandler, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./login.css";
import backgroundLogo from "../images/backgroundLogo.png";
import emailIcon from "../images/emailIcon.png";
import passwordIcon from "../images/passwordIcon.png";
import { sign } from "crypto";

export default function LoginPage() {
  const { push } = useRouter();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const rememberMeInputRef = useRef<HTMLInputElement>(null);
  const loginButtonRef = useRef<HTMLButtonElement>(null);
  const forgetPasswordRef = useRef<HTMLAnchorElement>(null);
  const signUpRef = useRef<HTMLButtonElement>(null);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("login pressed");
    const message =
      "Login pressed.\n\nYour username is: " +
      loginData.email +
      "\nYour password is: " +
      loginData.password +
      "\nYou checked 'Remeber Me': " +
      String(loginData.remember) +
      "\n\nThis will eventually navigate you to the landing page, now signed in, but for now you will remain here.";
    alert(message);

    const email = loginData.email;
    const password = loginData.password;
    try {
      const response = await fetch("/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();
      if (response.ok && responseData.message == "Success: Login Complete") {
        alert("Successful Login!");
        push("/");
      } else {
        const errorMessage = responseData.message;
        if (errorMessage == "Failed: Login Incomplete") {
          alert("Incomplete Feilds");
        } else if (errorMessage == "Failed: Login Failed") {
          alert("Incorrect Email or Password");
        } else {
          alert("Login Error");
        }
      }
    } catch (error) {
      console.error("Login Error", error);
    }
  }

  function handleSignUp(): void {
    console.log("sign up pressed");
    const message =
      "Sign up pressed. You will now be redirected to the Create Account page.";
    alert(message);
    push("/createAccount");
  }

  const handleLoginChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
  };

  const handleRememberMe = (): void => {
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      remember: !loginData.remember,
    }));
    console.log("Remember me set to: " + String(loginData.remember));
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      switch (e.currentTarget.id) {
        case "email":
          passwordInputRef?.current?.focus();
          break;
        case "password":
          rememberMeInputRef?.current?.focus();
          break;
        case "rememberMe":
          loginButtonRef?.current?.focus();
          break;
        case "login":
          forgetPasswordRef?.current?.focus();
          break;
        case "forgotPassword":
          signUpRef?.current?.focus();
          break;
        case "signUp":
          emailInputRef?.current?.focus();
          break;
        default:
          return;
      }
    }
  };

  const handleButtonKeyPress = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      switch (e.currentTarget.id) {
        case "rememberMe":
          loginButtonRef?.current?.focus();
          break;
        case "login":
          forgetPasswordRef?.current?.focus();
          break;
        case "forgotPassword":
          signUpRef?.current?.focus();
          break;
        case "signUp":
          console.log("Hither");
          emailInputRef?.current?.focus();
          break;
        default:
          break;
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
      <h1 className="welcomeTitle">Welcome back to your account!</h1>
      <form className="loginForm" onSubmit={handleLogin}>
        <h2 className="formTitle">LOGIN</h2>
        <div className="inputWrapper">
          <Image
            className="emailIcon"
            src={emailIcon}
            alt="An email icon"
            width="30"
            height="30"
          />
          <label htmlFor="email" className="loginInputLabel"></label>
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
        <div className="inputWrapper">
          <Image
            className="passwordIcon"
            src={passwordIcon}
            alt="An email icon"
            width="30"
            height="30"
          />
          <label htmlFor="password" className="loginInputLabel">
            {/* Enter Password */}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginChange}
            onKeyDown={(e) => handleInputKeyPress(e)}
            ref={passwordInputRef}
            required
          />
        </div>
        <div className="rememberMeCheckbox">
          <label htmlFor="rememberMe">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              value={String(loginData.remember)}
              onClick={handleRememberMe}
              ref={rememberMeInputRef}
              onKeyDown={(e) => handleInputKeyPress(e)}
              className="inline"
            />
            Remember me?
          </label>
        </div>
        <button
          id="login"
          className="loginButton"
          type="submit"
          ref={loginButtonRef}
          onKeyDown={(e: any) => handleInputKeyPress(e)}
        >
          LOG IN
        </button>

        {/*TODO: change href to proper forget page*/}
        <Link
          href="/"
          className="forgotPasswordLink"
          id="forgotPassword"
          ref={forgetPasswordRef}
          onKeyDown={(e: any) => handleInputKeyPress(e)}
        >
          Forgot Password
        </Link>

        <div className="break"></div>

        <div className="signUp">
          <h2 className="signUpTitle">Not a Member yet?</h2>
          <button
            className="signUpButton"
            type="button"
            onClick={handleSignUp}
            ref={signUpRef}
            onKeyDown={(e: any) => handleInputKeyPress(e)}
            id="signUp"
          >
            SIGN UP
          </button>
          {/* change href when signup page made*/}
        </div>
      </form>
    </div>
  );
}
