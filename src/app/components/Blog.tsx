import { useEffect, useState } from "react";
import "./Blog.css";
import IndividualBlog from "./IndividualBlog";
import { IEvent } from "@database/blogSchema";

export default function Blog() {
  // holds the user selections
  // const [{ id, title, category, author, date, picture, altpicture, content }] = bloglist;

  // in the below code, blogs is a list of all blogs fetched from the database
  // IndividualBlog is another component meant to display a single blog
  const [events, setEvents] = useState<Array<IEvent>>([]);

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

    fetchBlogData();
  }, []);

  return (
    <div className="container">
      <span className="header">
        <h2 className="title">GO See Blog</h2>
        <div className="rightaligned">
          <select>
            <option disabled value="archives" placeholder="Archives">
              Archives
            </option>
          </select>
          <form action="/search" method="GET">
            <input type="search"></input>
            <button className="submit" type="submit">
              Search
            </button>
          </form>
        </div>
      </span>
      <hr className="line" />
      {/* <div className="blogs"><IndividualBlog></IndividualBlog></div> */}
      <div className="blogs">
        {events?.slice(0, 3).map((e: IEvent, index: number) => (
          <IndividualBlog event={e} />
        ))}
      </div>
      <div className="pageselection">
        <h4 className="pagenumbers">1 2 3</h4>
        <button className="olderarticles">OLDER ARTICLES &gt;</button>
      </div>
    </div>
  );
}

/*
        {bloglist.map((iblog) => (
          <IndividualBlog key={iblog.id} blog={iblog}></IndividualBlog>
        ))}
        */
