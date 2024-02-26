"use client";
import React, { useEffect, useState } from "react";
import styles from "./homeEvents.module.css";
import PastEventCard from "./PastEventCard";
import UpcomingEventCard from "./UpcomingEventCard";
import { IEvent } from "@database/eventSchema";

export default function HomeEvents() {
  const [events, setEvents] = useState<Array<IEvent>>([]);

  const fetchAllEvents = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/events", {
        cache: "no-store",
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
        console.log(typeof data[0].date);
        console.log(data[0].date);
        console.log(new Date(data[0].date) > new Date(data[1].date));
        data = data.sort(
          (a: IEvent, b: IEvent) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        console.log(data);
        setEvents(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEventData();
  }, []);

  console.log(events);
  console.log(events[1]);

  return (
    <div className={styles.container}>
      <div className={styles.offset}>
        <div className={styles.pastEvents}>
          <h2 className={styles.title}>News and Past Events</h2>
          <div className={styles.pastEventsCards}>
            {events?.slice(0, 3).map((e: IEvent, index: number) => (
              <PastEventCard event={e} />
            ))}
          </div>
          <button className={styles.viewAllArticles}>VIEW ALL ARTICLES</button>
        </div>
        <div className={styles.break}></div>
        <div className={styles.upcomingEvents}>
          <h2 className={styles.title}>Upcoming Events</h2>
          <div className={styles.upcomingEventsCards}>
            {events?.slice(0, 2).map((e: IEvent, index: number) => (
              <UpcomingEventCard event={e} />
            ))}
            {/* <UpcomingEventCard event={events[0]} />
          <div className={styles.break2}></div>
          <UpcomingEventCard event={events[1]} /> */}
          </div>
          <button className={styles.allEventsButton}>ALL EVENTS</button>
        </div>
      </div>
    </div>
  );
}
