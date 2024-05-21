import React, { useEffect, useState } from "react";
import "./Blog.css";
import IndividualBlog from "./IndividualBlog";
import { IEvent } from "@database/blogSchema";

export default function Blog() {
  const [events, setEvents] = useState<Array<IEvent>>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<Array<IEvent>>([]);

  const fetchAllBlogs = async () => {
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
    const fetchBlogData = async () => {
      try {
        let data = await fetchAllBlogs();
        data = data.sort(
          (a: IEvent, b: IEvent) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setEvents(data);
        setFilteredEvents(data); // Initialize filteredEvents with all events
      } catch (err) {
        console.error(err);
      }
    };

    fetchBlogData();
  }, []);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter events based on the search query
    const filtered = events.filter((event) =>
      event.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  return (
    <div className="container">
      <span className="header">
        <h2 className="title">GO See Blog</h2>
        <div className="rightaligned">
          <select defaultValue="archives">
            <option value="archives">Archives</option>
          </select>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="search"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Search..."
            />
            <button className="submit" type="submit">
              Search
            </button>
          </form>
        </div>
      </span>
      <hr className="line" />
      <div className="blogs">
        {filteredEvents.slice(0, 3).map((e: IEvent, index: number) => (
          <IndividualBlog key={index} event={e} />
        ))}
      </div>
      <div className="pageselection">
        <h4 className="pagenumbers">1 2 3</h4>
        <button className="olderarticles">OLDER ARTICLES &gt;</button>
      </div>
    </div>
  );
}
