"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../images/GO-See-HLogo.fw_.png";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.mainbar}>
        <div className={styles.image}>
          <Image
            src={logo}
            className={styles.logo}
            alt="Go See Foundation's Logo"
            width="360"
            height="95"
          />
        </div>
        <div className={styles.mainButtons}>
          <Link href="">
            <button className={`${styles.button} ${styles.donate}`}>
              DONATE
            </button>
          </Link>
          <Link href="/pages/authentication/login">
            <button className={`${styles.button} ${styles.login}`}>
              LOG IN
            </button>
          </Link>
          <Link href="/pages/authentication/createAccount">
            <button className={`${styles.button} ${styles.join}`}>
              JOIN US
            </button>
          </Link>
          <button className={`${styles.button} ${styles.menu}`}>MENU ≡</button>
        </div>
      </div>
      <div className={styles.subbar}>
        <div className={styles.linkWrapper}>
          <Link className={styles.link} href="/">
            HOME
          </Link>
        </div>
        <div className={styles.linkWrapper}>
          <Link className={styles.link} href="/">
            GET INVOLVED
          </Link>
        </div>
        <div className={styles.linkWrapper}>
          <Link className={styles.link} href="/">
            RESOURCES
          </Link>
        </div>
        <div className={styles.linkWrapper}>
          <Link className={styles.link} href="/">
            ABOUT US
          </Link>
        </div>
      </div>
    </div>
  );
}
