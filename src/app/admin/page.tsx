"use client";
import React, { useState, useRef } from "react";
import styles from "./admin.module.css";
import emailjs from 'emailjs-com';
import Link from "next/link";
import Image from "next/image";
import logo from "../images/GO-See-HLogo.fw_.png";
import groupPhoto from "../images/admin/group.png";

export default function AdminPage() {
    const toRef = useRef<HTMLInputElement>(null);
    const fromRef = useRef<HTMLInputElement>(null);
    const messageRef = useRef<HTMLTextAreaElement>(null);

    const handleSend = async (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();

        try {
            const emailParams = {
                to_name: toRef.current?.value, 
                from_name: fromRef.current?.value,
                message: messageRef.current?.value,
            };
        
            await emailjs.send('service_9qu0p52', 'template_99zsbe8', emailParams, "Zw5OFi0OEo2qOzWRb");
            alert("Email sent successfully.");
        } catch (error) {
            console.error(error);
        }
    }

    return(
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
                    <Link className={styles.buttonLink} href="/admin/events">
                        <button className={`${styles.button} ${styles.events}`}>
                            Create/Edit Events
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
            {/* <form className={styles.createForm} onSubmit={handleSend}>
                <h2 className="formTitle">Send an Email</h2>
                <div className="inputs">
                    <input
                        className="toInput"
                        type="text"
                        id="to"
                        placeholder="To:"
                        ref={toRef}
                        required
                    />
                    <input
                        className="fromInput"
                        type="text"
                        id="from"
                        placeholder="From:"
                        ref={fromRef}
                        required
                    />
                    <textarea
                        className="messageInput"
                        id="message"
                        placeholder="Type a message"
                        ref={messageRef}
                        required
                    />
                </div>
                <button className="sendButton" type="submit">
                    Send
                </button>
            </form> */}
        </div>
    )
}