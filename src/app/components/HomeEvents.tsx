"use client";
import React, { useEffect, useState } from "react";
import styles from "./homeEvents.module.css";
import PastEventCard from "./PastEventCard";
import UpcomingEventCard from "./UpcomingEventCard";
import { IEvent } from "@database/eventSchema";
import { IBlog as BlogEvent } from "@database/blogSchema";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HomeEvents() {
  const [events, setEvents] = useState<Array<IEvent>>([]);
  const [blogs, setBlogs] = useState<Array<BlogEvent>>([]);
  const { push } = useRouter();

  const fetchAllBlogs = async () => {
    try {
      const res = await fetch("/api/blog", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch Blogs");
      }

      const res_j = await res.json();
      return res_j;
    } catch (err: unknown) {
      console.error(`Error: ${err}`);
      return null;
    }
  };

  const fetchAllEvents = async () => {
    try {
      const res = await fetch("/api/events", {
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
        data = data.sort(
          (a: IEvent, b: IEvent) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setEvents(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchBlogData = async () => {
      try {
        const data = await fetchAllBlogs();
        setBlogs(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBlogData();
    fetchEventData();
  }, []);

  const handleViewAll = () => {
    console.log("View All pressed");
    const message =
      "View All pressed. You will now be redirected to a page with all past events, news, and articles.";
    alert(message);
    push("/blog");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  

  const handleAllEvents = () => {
    console.log("All Events pressed");
    const message =
      "All Events pressed. You will now be redirected to a page with all upcoming.";
    alert(message);
    push("/events");
  };

  return (
    <div className={styles.container}>
      <div className={styles.offset}>
        <div className={styles.pastEvents} tabIndex={0}></div>
        <div className={styles.break}></div>
        <div className={styles.upcomingEvents}>
          <h2 className={styles.title}>Upcoming Events</h2>
          <div className={styles.upcomingEventsCards}>
            {events?.slice(0, 1).map((e: IEvent, index: number) => (
              <UpcomingEventCard key={e.eventID.toString()} event={e} />
            ))}
            <div className={styles.break2}></div>
            {events?.slice(1, 2).map((e: IEvent, index: number) => (
              <UpcomingEventCard key={e.eventID.toString()} event={e} />
            ))}
          </div>
         
        </div>
        <div className={styles.divider} />
        <div className={styles.blogSection}>
          <h3 className={styles.title}>
            Check out our Blog for the latest events and news!{" "}
          </h3>

          <div className={styles.pastEventsCards}>
            {blogs?.slice(0, 3).map((e: BlogEvent, index: number) => (
              <PastEventCard key={e.blogID.toString()} blog={e} />
            ))}
          </div>

          <Link href="/blog" className={styles.viewAllArticles}>
            VIEW ALL BLOGS
          </Link>
          
        </div>
      </div>
    </div>
  );
}
