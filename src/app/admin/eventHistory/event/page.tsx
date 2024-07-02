"use client";
import backButton from "../../../images/backButton.png";

import Link from "next/link";
import Image from "next/image";
import styles from "./eventName.module.css";
import { MouseEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import EventSignee from "@components/EventSignee";
import { IEventSignUp } from "@database/eventSignUpSchema";

export default function eventName(context: any) {
  let [clickedExpand, setClickedExpand] = useState(false);
  let [members, setMembers] = useState<IEventSignUp[]>([]);
  const searchParams = useSearchParams();
  let eventName = searchParams.get("eventName");

  const handleRedirect = (email: string) => {
    console.log("email:", email);
    const router = useRouter();
    router.push({
      pathname: "/admin/email",
      query: { email: email },
    });
  };

  async function fetchallMembers() {
    try {
      let data = await fetch("/api/eventSignUp/" + eventName, {
        method: "GET",
      });

      const res_j = await data.json();

      console.log("res_j", res_j);

      return res_j;
    } catch (err) {
      console.log("error occured while fetching member signups: ", err);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await fetchallMembers();
        setMembers(data);
      } catch (err) {
        console.log("err fetching data: ", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.eventHistory}>
      <div className={styles.bodyCard}>
        <div className={styles.titleBody}>
          <Link href={{ pathname: `/admin/eventHistory/` }}>
            <Image
              className={styles.backButton}
              src={backButton}
              alt="return to previous page"
              height="29"
              width="14.5"
              priority={true}
            />
          </Link>
          <h1 className={styles.eventTitle}>{eventName}</h1>
          <Link
            className={styles.emailAllButton}
            href={{
              pathname: "/admin/email",
              query: {
                eventName: eventName, // pass the email as a query parameter
              },
            }}
            as={`/admin/email?eventName=${eventName}`}
          >
            Email All
          </Link>
        </div>

        {members && members.length > 0 ? (
          members.map((mem, index) => <EventSignee mem={mem} key={index} />)
        ) : (
          <div className={styles.noMembers}>
            <h1 className={styles.nomemberText}>
              No Members Have Signed Up for this Event.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
