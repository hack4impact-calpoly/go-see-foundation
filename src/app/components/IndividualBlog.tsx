import React, { useState } from "react";
import { IEvent } from "@database/blogSchema";
import Image from "next/image";
import "./individualBlog.css";

const IndividualBlog = ({ event }: { event: IEvent }) => {
  //const [localBlog, setLocalBlog] = useState(blog);
  const { picture, alt, description, date, name, blogID, author } = event;

  return (
    <div className="blog" tabIndex={0}>
      <h3 className="blogcategory">Event/Update</h3>
      <h2 className="blogtitle">{name}</h2>
      <h4 className="blogauthor">
        by {author} | {date.toString()}{" "}
      </h4>
      <img src={picture} alt={alt} className="blogimage"></img>
      <p className="blogcontent">{description}</p>
      <br></br>
      <hr className="yellowblogdiv"></hr>
    </div>
  );
};

export default IndividualBlog;

