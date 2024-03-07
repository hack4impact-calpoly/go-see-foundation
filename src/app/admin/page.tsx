"use client";
import React, { useState, useRef } from "react";
import styles from "./admin.module.css";
import emailjs from 'emailjs-com';


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
        <div>
            <form className={styles.createForm} onSubmit={handleSend}>
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
            </form>
        </div>
    )
}