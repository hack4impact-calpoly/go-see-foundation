import React from "react";
import styles from "./seussQuote.module.css";

const SeussQuote = () => {
  const quote =
    "“You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose. You're on your own. And you know what you know. And YOU are the one who'll decide where to go…”";
  return (
    <div className={styles.container}>
      <div className={styles.quote}>{quote}</div>
      <div className={styles.author}>
        ~ Dr. Seuss, <em>Oh, The Places You’ll Go!</em>
      </div>
    </div>
  );
};

export default SeussQuote;
