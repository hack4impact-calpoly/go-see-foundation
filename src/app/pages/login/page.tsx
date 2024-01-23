"use client";
import React, { useState } from "react";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import style from "./login.module.css";
import logoImage from "../../images/Go-See-HLogo.fw_.png";

export default function LoginMobilePage() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("login pressed");

    // TODO: try to fetch the user from database using email
    // if email exists, verify password --> if password match, next page
    //                                  --> if no match, send error message to user
    // if email does not exist --> send error message to user
  }

  function handleSignUp() {
    console.log("sign up pressed");
  }

  const handleLoginChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
  };

  return (
    <div className={style.loginPage}>
      <Navbar />
      <main>
        <div className={style.logo}>
          <Image
            className={style.logoImg}
            src={logoImage}
            alt="A picture of the Go See Foundation's Logo"
            width="720" // about 1/5 of the original image width
            height="190" // about 1/5 of the original image height
          ></Image>
        </div>
        <form className={style.loginForm} onSubmit={handleLogin}>
          <h1 className={style.loginTitle}>LOGIN</h1>

          {/* <label htmlFor="email" className={style.loginInputLabel}>
            Enter Email
          </label> */}
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleLoginChange}
            required
          />

          {/* <label htmlFor="password" className={style.loginInputLabel}>
            Enter Password
          </label> */}
          <input
            type="text"
            id="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginChange}
            required
          />

          <button className="submitButton" type="submit">
            LOGIN
          </button>

          <div className="signUp">
            <h2 className="signUpTitle">No Account?</h2>
            <button
              className="signUpButton"
              type="button"
              onClick={handleSignUp}
            >
              SIGN UP
            </button>
            {/* change href when signup page made*/}
          </div>
        </form>
      </main>
    </div>
  );
}
