"use client";
import { IEvent } from "@database/eventSchema";
import styles from "./upcomingEventCard.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function UpcomingEventCard({ event }: { event: IEvent }) {
  const { picture, alt, description, date, name } = event;
  const { push } = useRouter();

  const handleSignUp = () => {
    // TODO: probably want to use {name} to navigate to a new sign up page
    console.log("Sign Up pressed");
    const message =
      "Sign Up for Event pressed. You will now be redirected to an event sign up page.";
    alert(message);
    push("/pages/authentication/createAccount");
  };

  return (
    <div className={styles.container}>
      <Image
        className={styles.picture}
        src={picture}
        alt={alt}
        width="750"
        height="750"
      />
      <div className={styles.text}>
        <p className={styles.date}>{new Date(date).toDateString()}</p>
        <p className={styles.name}>{name}</p>
        <button className={styles.signUp} onClick={handleSignUp}>
          Sign up for Event
        </button>
      </div>
    </div>
  );
}
