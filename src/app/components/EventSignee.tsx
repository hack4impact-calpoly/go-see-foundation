import Link from "next/link";
import styles from "./eventSignee.module.css";
import Image from "next/image";
import emailIcon from "../images/emailIcon.png";
import expandDown from "../images/Expand_down-2.png";
import { useState } from "react";
import { IEventSignUp } from "@database/eventSignUpSchema";

const eventSignee = ({ mem }: { mem: IEventSignUp }) => {
  let [clickedExpand, setClickedExpand] = useState(false);
  console.log("mem:     xd", mem);

  const setExpandFunc = () => {
    setClickedExpand(!clickedExpand);
  };

  return (
    <div className={styles.form}>
      <div className={styles.body}>
        <p className={styles.textCard}>
          {mem.firstName + " " + mem.lastName + " (" + mem.userType + ")"}
        </p>
        <p className={styles.textCard}>{mem.phoneNum}</p>

        <div className={styles.dropdownImg}>
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
              height="30"
              width="30"
              priority={true}
            />
          </Link>

          <Image
            src={expandDown}
            alt="expand member sign up info"
            height="30"
            width="30"
            priority={true}
            onClick={setExpandFunc}
          />
        </div>
      </div>
      {clickedExpand ? (
        <div className={styles.additionalInfo}>
          <p> Do you need a sighted guide?</p>
          <p>Answer: {mem.needSightedGuide ? <p> Yes</p> : <p>No </p>}</p>
          <p>Answer: {mem.needSightedGuide ? <p> Yes</p> : <p>No </p>}</p>{" "}
          <p>Coments:</p>
          <p>Answer: {mem.comments}</p>
        </div>
      ) : null}
    </div>
  );
};

export default eventSignee;
