"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./success.module.css";
import checkMark from "../images/checkMark.png";

export default function Success({ message }: { message: string }) {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const { push } = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("success! going to home page now");
    push("/");
  };

  return (
    <form className={styles.successForm} onSubmit={handleSubmit}>
      <h2 className={styles.successTitle}>Success!</h2>
      <Image
        className={styles.checkMark}
        src={checkMark}
        alt="success check mark"
        width="410"
        height="410"
      />
      <h3 className={styles.successSubtitle}>{`${message} Successful`}</h3>
      <button
        id="submitButton"
        className={styles.submitButton}
        type="submit"
        ref={submitButtonRef}
      >
        HOME
      </button>
    </form>
  );
}
