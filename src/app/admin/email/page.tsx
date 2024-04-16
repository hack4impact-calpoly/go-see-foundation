"use client";
import React, { useState, useRef } from "react";
import styles from "./emailPage.module.css";

export default function AdminPageEmail() {
  const [group, setGroup] = useState("Test1");
  const [individualMessage, setIndividualMessage] = useState(false);
  const [to_value, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [scrollDropValue, setScrollDrop] = useState("Inbox");

  return (
    <div className={styles.emailArea}>
      <div className={styles.scrollSide}>
        <div className={styles.scrollDropdown}>
          <select onChange={(e) => setScrollDrop(e.target.value)}>
            <option>Inbox</option>
            <option>Test</option>
          </select>
        </div>
        <div className={styles.emailList}>
          <EmailPreview />
          <EmailPreview />
          <EmailPreview />
          <EmailPreview />
          <EmailPreview />
          <EmailPreview />
          <EmailPreview />
        </div>
      </div>
      <form className={styles.emailForm}>
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
          onChange={(e) => setTo(e.target.value)}
        ></input>
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          className={styles.subject_input}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        ></input>
        <textarea
          className={styles.messageArea}
          placeholder="Text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button className={styles.formButtons}> Send</button>
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
