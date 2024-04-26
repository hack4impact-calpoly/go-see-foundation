"use client";
import React, { useState, useRef } from "react";
import styles from "./emailPage.module.css";
import emailjs from "emailjs-com";

export default function AdminPageEmail() {
  const [group, setGroup] = useState("Test1");
  const [individualMessage, setIndividualMessage] = useState(false);
  const [to_value, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [scrollDropValue, setScrollDrop] = useState("Inbox");

  const toRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const emailParams = {
        to_name: toRef.current?.value,
        subject: subjectRef.current?.value,
        message: messageRef.current?.value,
      };

      await emailjs.send(
        "service_9qu0p52",
        "template_99zsbe8",
        emailParams,
        "Zw5OFi0OEo2qOzWRb"
      );
      alert("Email sent successfully.");

      setTo("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.emailArea}>
      <form className={styles.emailForm} onSubmit={handleSend}>
        <label htmlFor="group">Select Group:</label>
        <select
          className={styles.groupDropdown}
          onChange={(e) => setGroup(e.target.value)}
        >
          <option>Test1</option>
          <option>test2</option>
        </select>
        <div className={styles.individualMessage}>
          <input
            type="checkbox"
            onChange={(e) => setIndividualMessage(e.target.checked)}
          />
          <label htmlFor="individualMessage">send an individual message</label>
        </div>
        <label htmlFor="to">To:</label>
        <input
          type="text"
          className={styles.to_input}
          value={to_value}
          ref={toRef}
          onChange={(e) => setTo(e.target.value)}
          required
        ></input>
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          className={styles.subject_input}
          value={subject}
          ref={subjectRef}
          onChange={(e) => setSubject(e.target.value)}
          required
        ></input>
        <textarea
          className={styles.messageArea}
          placeholder="Text"
          value={message}
          ref={messageRef}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <button className={styles.formButtons} type="submit">
          Send
        </button>
        <button className={styles.formButtons}>Cancel</button>
      </form>
    </div>
  );
}

function EmailPreview() {
  return (
    <div className={styles.emailPreview}>
      <input type="checkbox"></input>
      <div className={styles.infoSide}>
        <p>MM/DD/YYYY</p>
        <p>From, To</p>
        <p>Subject</p>
        <p>Text</p>
      </div>
    </div>
  );
}
