/* Login page */

"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./login.css";
import backgroundLogo from "../../../images/eyeBackground.png";
import emailIcon from "../../../images/emailIcon.png";
import passwordIcon from "../../../images/passwordIcon.png";

export default function LoginPage() {
  const { push } = useRouter();
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
      String(loginData.remember);
    alert(message);

    // TODO: try to fetch the user from database using email
    // if email exists, verify password --> if password match, next page
    //                                  --> if no match, send error message to user
    // if email does not exist --> send error message to user
  }

  function handleSignUp(): void {
    console.log("sign up pressed");
    const message =
      "Sign up pressed. You will now be redirected to the Create Account page.";
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

  return (
    <div className="loginPage">
      {/* TODO: add background logo */}
      {/* <div className="backgroundLogoContainer">
        <Image
          src={backgroundLogo}
          alt="background logo for the Go See Foundation"
          height="1500"
          width="1500"
          className="backgroundLogo"
        />
      </div> */}
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
            required
          />
        </div>
        <div className="rememberMeCheckbox">
          <label htmlFor="rememberMe">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
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
          <h3 className="forgotPasswordText">Forgot Password</h3>
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
