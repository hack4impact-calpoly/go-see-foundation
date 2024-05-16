"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./eventHistory.module.css";

export default function EventHistory() {
  let [events, setEvents] = useState<any[]>([]);

  const fetchAllEvents = async () => {
    try {
      const res = await fetch("/api/events/", {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch Events");
      }

      const res_j = await res.json();
      return res_j;
    } catch (err: unknown) {
      console.error(`Error: ${err}`);
      return null;
    }
  };

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        let data = await fetchAllEvents();

        setEvents(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEventData();
  }, []);

  return (
    <div className={styles.eventHistory}>
      <div className={styles.formBody}>
        <h1 className={styles.eventTitle}>Events</h1>

        <div className={styles.eventsBody}>
          {events &&
            events.map((event, index) => (
              <Link
                href={{
                  pathname: `/admin/eventHistory/[eventName]`,
                  query: {
                    id: event.name, // pass the id
                  },
                }}
                as={`/forgotPassword/${event.name}`}
              >
                <div key={index} className={styles.eventItem}>
                  <h2>{event.name}</h2> <p>edit event</p> <p>view Signees</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
