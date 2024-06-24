"use client";
import React from "react";
import Image from "next/image";
import styles from "./success.module.css";
import backgroundLogo from "../images/backgroundLogo.png";
import Success from "@components/Success";

export default function SuccessPage() {
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
      <Success message="Password Reset" />
    </div>
  );
}
