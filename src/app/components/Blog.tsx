import { useState } from "react";
import "./Blog.module.css";
import IndividualBlog from "./IndividualBlog";

export default function Blog() {
  // holds the user selections
  // const [{ id, title, category, author, date, picture, altpicture, content }] = bloglist;

  // in the below code, blogs is a list of all blogs fetched from the database
  // IndividualBlog is another component meant to display a single blog

  return (
    <div className="container">
      <div className="header">
        <h2>GO See Blog</h2>
        <select>
          <option disabled selected value="archives">
            Archives
          </option>
        </select>
        <form action="/search" method="GET">
          <input type="search"></input>
          <button type="submit">Search</button>
        </form>
      </div>
      <hr></hr>
      <div className="blogs">
        {bloglist.map((iblog) => (
          <IndividualBlog key={iblog.id} blog={iblog}></IndividualBlog>
        ))}{" "}
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
        ))}{" "}
        */
