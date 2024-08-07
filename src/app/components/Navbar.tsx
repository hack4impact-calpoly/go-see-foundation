"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../images/GO-See-HLogo.fw_.png";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <a href="#main" className="skip-to-main-content-link">
        Skip to end of navbar
      </a>
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
          <div className={styles.mainTop}>
            <Link href="/donate">
              <button className={`${styles.button} ${styles.donate}`}>
                DONATE
              </button>
            </Link>
            <Link href="/login">
              <button className={`${styles.button} ${styles.login}`}>
                LOG IN
              </button>
            </Link>
          </div>
          <div className={styles.mainBottom}>
            <Link href="/createAccount">
              <button className={`${styles.button} ${styles.join}`}>
                JOIN US
              </button>
            </Link>
            <Link href = "/">
            <button className={`${styles.button} ${styles.menu}`}>
              HOME
            </button>
            </Link>
          </div>
          <div className={styles.mainBottom}>
            <Link href = "/resources">
            <button className={`${styles.button} ${styles.menu}`}>
              Resources
            </button>
            </Link>
          </div>

        </div>
      </div>
      <div className={styles.subbar}>
        <div className={styles.linkWrapper}>
          <Link className={styles.link} href="/">
            HOME
          </Link>
        </div>
        <div className={styles.linkWrapper}>
          <Link className={styles.link} href="/resources">
            RESOURCES
          </Link>
        </div>
        <div className={styles.linkWrapper}>
          <Link className={styles.link} href="/about" id="about-us">
            ABOUT US
          </Link>
        </div>
      </div>
    </div>
  );
}
