import React, { useEffect, useState } from "react";
import "./Blog.css";
import IndividualBlog from "./IndividualBlog";
import { IBlog } from "@database/blogSchema";
import { useRouter } from "next/navigation";

export default function Archive() {
  const [events, setEvents] = useState<Array<IBlog>>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<Array<IBlog>>([]);
  const { push } = useRouter();

  const fetchAllBlogs = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/blog", {
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

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        let data = await fetchAllBlogs();
        data = data.sort(
          (a: IBlog, b: IBlog) =>
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

    // Filter blogs based on the search query
    const filtered = events.filter((blog) =>
      blog.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  const handleArchivesClick = () => {
    push("/blog/");
  };

  return (
    <div className="container">
      <span className="header">
        <h2 className="title">GO See Blog</h2>
        <div className="rightaligned">
        <button className="olderarticles" onClick={handleArchivesClick}>
            Most Recent
        </button>
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
      {filteredEvents.slice(3).map((b: IBlog, index: number) => (
          <IndividualBlog key={index} blog={b} />
        ))}
      </div>
      <button className="olderarticles"  onClick={handleArchivesClick}>
        {'<'} Most Recent
        </button>
     
    </div>
  );
}
