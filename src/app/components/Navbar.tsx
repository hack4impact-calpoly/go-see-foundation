"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "../images/GO-See-HLogo.fw_.png";
import styles from "./navbar.module.css";

export default function Navbar() {
  const [userType, setUserType] = useState("member");
  const pathname = usePathname();

  useEffect(() => {
    const fetchUserType = async () => {
      const response = await fetch("/api/signedInUser/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const userData = await response.json();
      console.log("USER TYPE:", userData.userType);
      setUserType(userData.userType);
    };
    fetchUserType();
  }, [pathname]);

  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        window.location.href = "/";
        return;
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

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
            {userType === null ? (
              <Link href="/login">
                <button className={`${styles.button} ${styles.login}`}>
                  LOG IN
                </button>
              </Link>
            ) : (
              <Link href="/">
                <button
                  onClick={handleSignOut}
                  className={`${styles.button} ${styles.login}`}
                >
                  SIGN OUT
                </button>{" "}
              </Link>
            )}
          </div>
          <div className={styles.mainBottom}>
            <Link href="/createAccount">
              <button className={`${styles.button} ${styles.join}`}>
                JOIN US
              </button>
            </Link>
            <Link href="/">
              <button className={`${styles.button} ${styles.menu}`}>
                HOME
              </button>
            </Link>
          </div>
          <div className={styles.mainBottom}>
            <Link href="/resources">
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
        {userType?.toLocaleLowerCase() === "admin" ? (
          <div className={styles.mainButton}>
            <Link className={styles.link} href="/admin" id="about-us">
              ADMIN
            </Link>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
