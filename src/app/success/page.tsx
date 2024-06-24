"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./success.module.css";
import backgroundLogo from "../images/backgroundLogo.png";
import checkMark from "../images/checkMark.png";

export default function SuccessPage() {
  const loginButtonRef = useRef<HTMLButtonElement>(null);
  const { push } = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("success! going to home page now");
    push("/");
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
      <form className={styles.successForm} onSubmit={handleSubmit}>
        <h2 className={styles.successTitle}>Success!</h2>
        <Image
          className={styles.checkMark}
          src={checkMark}
          alt="success check mark"
          width="410"
          height="410"
        />
        <h3 className={styles.successSubtitle}>Password Reset Successfully.</h3>
        <button
          id="loginButton"
          className={styles.loginButton}
          type="submit"
          ref={loginButtonRef}
        >
          LOGIN
        </button>
      </form>
    </div>
  );
}
