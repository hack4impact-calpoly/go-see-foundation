import { useState } from "react";
import "./Blog.css";
import IndividualBlog from "./IndividualBlog";

export default function Blog() {
  // holds the user selections
  // const [{ id, title, category, author, date, picture, altpicture, content }] = bloglist;

  // in the below code, blogs is a list of all blogs fetched from the database
  // IndividualBlog is another component meant to display a single blog

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
      <div className="blogs"><IndividualBlog></IndividualBlog></div>
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
