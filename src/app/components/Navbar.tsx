import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../images/GO-See-HLogo.fw_.png";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      {/* <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/pages/authentication/login">Login</Link>
        </li>
        <li>
          <Link href="/pages/authentication/createAccount">Create Account</Link>
        </li>
      </ul> */}
      <div className={styles.mainbar}>
        <Image
          src={logo}
          className={styles.logo}
          alt="Go See Foundation's Logo"
          width="360"
          height="95"
        />
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
        </div>
      </div>
      <div className={styles.subbar}>
        <Link className={styles.link} href="/">
          HOME
        </Link>
        <Link className={styles.link} href="/">
          GET INVOLVED
        </Link>
        <Link className={styles.link} href="/">
          RESOURCES
        </Link>
        <Link className={styles.link} href="/">
          ABOUT US
        </Link>
      </div>
    </div>
  );
}
