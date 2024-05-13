"use client";
import React, { useState, useRef } from "react";
import styles from "./admin.module.css";
import emailjs from "emailjs-com";
import Link from "next/link";
import Image from "next/image";
import logo from "../images/GO-See-HLogo.fw_.png";
import groupPhoto from "../images/admin/group.png";

export default function AdminPage() {
  return (
    <div className={styles.adminComponent}>
      <div className={styles.adminOptions}>
        <Image
          src={logo}
          className={styles.logo}
          alt="Go See Foundation's Logo"
        />
        <div className={styles.buttons}>
          <Link className={styles.buttonLink} href="/admin/edit">
            <button className={`${styles.button} ${styles.edit}`}>
              Edit Website
            </button>
          </Link>
          <Link className={styles.buttonLink} href="/admin/members">
            <button className={`${styles.button} ${styles.members}`}>
              Manage Members
            </button>
          </Link>
          <Link className={styles.buttonLink} href="/admin/manage-events">
            <button className={`${styles.button} ${styles.events}`}>
              Create/Edit Events
            </button>
          </Link>
          <Link className={styles.buttonLink} href="/admin/donations">
            <button className={`${styles.button} ${styles.events}`}>
              View Donations
            </button>
          </Link>
          <Link className={styles.buttonLink} href="/admin/email">
            <button className={`${styles.button} ${styles.email}`}>
              Email
            </button>
          </Link>
          <Link className={styles.buttonLink} href="/admin/images">
            <button className={`${styles.button} ${styles.images}`}>
              Images
            </button>
          </Link>
        </div>
      </div>
      <div className={styles.image}>
        <Image
          src={groupPhoto}
          className={styles.adminImage}
          alt="Group Picture"
        />
        <div className={styles.overlay}></div>
      </div>
    </div>
  );
}
