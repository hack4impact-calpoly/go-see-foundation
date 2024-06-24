import Link from "next/link";
import styles from "./eventSignee.module.css";
import Image from "next/image";
import emailIcon from "../images/emailIcon.png";
import expandDown from "../images/Expand_down-2.png";
import expandDown2 from "../images/Expand_down.png";

import { useState } from "react";
import { IEventSignUp } from "@database/eventSignUpSchema";

const eventSignee = ({ mem }: { mem: IEventSignUp }) => {
  let [clickedExpand, setClickedExpand] = useState(false);
  const [imageSrc, setImageSrc] = useState(expandDown);

  const setExpandFunc = () => {
    setClickedExpand(!clickedExpand);

    if (clickedExpand) {
      setImageSrc(expandDown);
    } else {
      setImageSrc(expandDown2);
    }
  };

  const deleteEntry = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to remove the following user ?"
    );

    if (confirmed) {
      try {
        const response = await fetch(
          `/api/eventSignUp/${mem.eventName}/${mem.email}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = await response.json();
        if (responseData.status === 200) {
          alert("Successfully Deleted Entry!");
          window.location.reload();
        } else if (responseData.status === 400) {
          console.log(responseData.status);
          alert("Error deleting Entry");
        }
      } catch {
        alert("Error deleting Entry");
      }
    }
  };

  return (
    <div className={styles.form}>
      <div className={styles.body}>
        <p className={styles.textCard}>{mem.firstName + " " + mem.lastName}</p>
        <p className={styles.role}>{mem.userType}</p>
        <p className={styles.textCard}>{mem.phoneNum}</p>

        <div className={styles.dropdownImg}>
          <button className={styles.removeButton} onClick={deleteEntry}>
            Remove
          </button>

          <button className={styles.buttonSettings}>
            <Link
              href={{
                pathname: "/admin/email",
                query: {
                  email: mem.email, // pass the email as a query parameter
                },
              }}
              as={`/admin/email?email=${mem.email}`}
            >
              <Image
                src={emailIcon}
                alt="email event signee"
                height="40"
                width="40"
                priority={true}
              />
            </Link>
          </button>

          <button className={styles.buttonSettings}>
            <Image
              src={imageSrc}
              alt="expand member sign up info"
              height="40"
              width="40"
              priority={true}
              onClick={setExpandFunc}
            />
          </button>
        </div>
      </div>
      {clickedExpand ? (
        <div className={styles.optionTop}>
          <div className={styles.option}>
            <p className={styles.topLayer}> Do you need a sighted guide?</p>
            <p>Answer: {mem.needSightedGuide ? "Yes" : "No"}</p>
          </div>
          <div className={styles.option}>
            <p>Have you been to a GO See event before</p>
            <p>Answer: {mem.attendedEventBefore ? "Yes" : "No"}</p>
          </div>
          <div className={styles.option}>
            <p>Coments:</p>
            <p>Answer: {mem.comments ? mem.comments : "N/Aa"} </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default eventSignee;
