"use client";
import emailIcon from "../../../images/emailIcon.png";
import expandDown from "../../../images/Expand_down-2.png";
import backButton from "../../../images/backButton.png";
import BackButton from '../../../components/BackButton';
import Link from "next/link";
import Image from "next/image";
import styles from "./eventName.module.css";
import { useEffect, useState } from "react";

export default function eventName(context: any) {
  let [members, setMembers] = useState<any[]>([]);

  const eventName = decodeURIComponent(context.params.eventName);

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
    <div> <BackButton/>
      <div className={styles.eventHistory}>
        <div className={styles.bodyCard}>
          <div className={styles.titleBody}>
            <Link href={{ pathname: `/admin/eventHistory/` }}>
              <Image
                className={styles.backButton}
                src={backButton}
                alt="background logo for the Go See Foundation"
                height="29"
                width="14.5"
                priority={true}
              />
            </Link>
            <h1 className={styles.eventTitle}>{eventName}</h1>
          </div>

          {members && members.length > 0 ? (
            members.map((mem, index) => (
              <div key={index} className={styles.body}>
                <p className={styles.textCard}>
                  {mem.firstName + " " + mem.lastName + " (" + mem.userType + ")"}
                </p>
                <p className={styles.textCard}>{mem.phoneNum}</p>

                <div className={styles.dropdownImg}>
                  <Image
                    src={emailIcon}
                    alt="background logo for the Go See Foundation"
                    height="30"
                    width="30"
                    priority={true}
                  />
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
    </div>
  );
}
