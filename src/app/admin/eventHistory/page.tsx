"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./eventHistory.module.css";
import BackButton from "../../components/BackButton";

export default function EventHistory() {
  let [events, setEvents] = useState<any[]>([]);
  const moment = require("moment");

  const fetchAllEvents = async () => {
    try {
      const res = await fetch("/api/events/", {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch Events");
      }

      const res_j = await res.json();

      console.log("res_j:", res_j);
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
    <div>
      <BackButton />
      <div className={styles.eventHistory}>
        <div className={styles.formBody}>
          <h1 className={styles.eventTitle}>Events</h1>

          <div className={styles.eventsBody}>
            {events &&
              events.map((event, index) => (
                <div key={index} className={styles.eventItem}>
                  <h1>{event.name}</h1>
                  <h2>
                    {event.location}
                    {"     "}
                    {moment(event.date).format("MMM Do YYYY")} {event.startTime}{" "}
                    - {event.endTime}
                  </h2>
                  <div className={styles.eventDescription}>
                    {event.description}
                  </div>

                  <div className={styles.options}>
                    <Link
                      className={styles.eventSignup}
                      href={{
                        pathname: `/admin/eventHistory/[eventName]`,
                        query: {
                          id: event.name,
                        },
                      }}
                      as={`/admin/eventHistory/${event.name}`}
                    >
                      View Attendance
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
