"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../images/GO-See-HLogo.fw_.png";
import menu from "../images/menu.png";
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
            <button className={`${styles.button} ${styles.menu}`}>
              MENU
              <Image src={menu} alt="menu icon" width="20" height="15" />
            </button>
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
          <Link className={styles.link} href="/about">
            ABOUT US
          </Link>
        </div> 
      </div>
    </div> 
  );
}
