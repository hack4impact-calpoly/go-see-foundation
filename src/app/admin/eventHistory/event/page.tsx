"use client";
import emailIcon from "../../../images/emailIcon.png";
import expandDown from "../../../images/Expand_down-2.png";
import backButton from "../../../images/backButton.png";

import Link from "next/link";
import Image from "next/image";
import styles from "./eventName.module.css";
import { MouseEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";


export default function eventName(context: any) {
  let [members, setMembers] = useState<any[]>([]);
  const searchParams = useSearchParams();

  let eventName = searchParams.get("eventName");

  // const eventName = decodeURIComponent(context.params.eventName);

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

          {/* <button className={styles.emailAllButton}>Email All</button> */}
        </div>

        {members && members.length > 0 ? (
          members.map((mem, index) => (
            <div key={index} className={styles.body}>
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
                    alt="background logo for the Go See Foundation"
                    height="30"
                    width="30"
                    priority={true}
                  />
                </Link>

                <Image
                  src={expandDown}
                  alt="background logo for the Go See Foundation"
                  height="30"
                  width="30"
                  priority={true}
                />
              </div>
            </div>
          ))
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
