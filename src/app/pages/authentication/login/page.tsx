"use client";
import React, { MouseEventHandler, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./login.css";
import backgroundLogo from "../../../images/backgroundLogo.png";
import emailIcon from "../../../images/emailIcon.png";
import passwordIcon from "../../../images/passwordIcon.png";

export default function LoginPage() {
  const { push } = useRouter();
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const rememberMeInputRef = useRef<HTMLInputElement | null>(null);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  function handleLogin(event: React.FormEvent<HTMLFormElement>): void {
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

    // TODO: try to fetch the user from database using email
    // if email exists, verify password --> if password match, next page
    //                                  --> if no match, send error message to user
    // if email does not exist --> send error message to user
  }

  function handleSignUp(): void {
    console.log("sign up pressed");
    const message = "Sign up pressed. You will now be redirected to the Create Account page.";
    alert(message);
    push("/pages/authentication/createAccount");
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

  const handleInputKeyPressEmailInput = (event : any) => {
    if (event.key === 'tab' && emailInputRef.current !== null) {
      emailInputRef.current.focus();
    }
  }

  const handleInputKeyPressPassworrd = (event : any ) => {
     if (event.key === 'tab' && passwordInputRef.current !== null) {
       passwordInputRef.current.focus(); 
     }  
  }

  const handleInputKeyPressRemeberMe = (event : any) => {
     if (event.key === 'tab' && rememberMeInputRef.current !== null) {
        rememberMeInputRef.current.focus();
     }
  }

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
            onKeyPress={handleInputKeyPressEmailInput}
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
            onKeyPress={handleInputKeyPressPassworrd}
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
              onKeyPress={handleInputKeyPressRemeberMe}
              className="inline"
            />
            Remember me?
          </label>
        </div>
        <button className="loginButton" type="submit">
          LOG IN
        </button>

        {/*TODO: change href to proper forget page*/}
        <Link href="/" className="forgotPasswordLink">
          Forgot Password
        </Link>

        <div className="break"></div>

        <div className="signUp">
          <h2 className="signUpTitle">Not a Member yet?</h2>
          <button className="signUpButton" type="button" onClick={handleSignUp}>
            SIGN UP
          </button>
          {/* change href when signup page made*/}
        </div>
      </form>
    </div>
  );
}
