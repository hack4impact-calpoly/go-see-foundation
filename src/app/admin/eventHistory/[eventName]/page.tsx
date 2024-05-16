"use client";

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
    <div className={styles.eventHistory}>
      <div className={styles.eventTitle}>{eventName}</div>

      {members &&
        members.map((mem, index) => (
          <div key={index} className={styles.body}>
            <h2 className={styles.memberCard}>{mem.firstName + mem.lastName}</h2>
          </div>
        ))}
    </div>
  );
}
