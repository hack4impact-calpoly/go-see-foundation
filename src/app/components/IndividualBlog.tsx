import React, { useState } from "react";
import { IBlog } from "@database/blogSchema";
import "./individualBlog.css";

const IndividualBlog = ({ blog }: { blog: IBlog }) => {
  const { picture, alt, description, date, name, blogID, author } = blog;

  const formatDateTime = (dateTimeString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleDateString("en-US", options);
  };

  return (
    <div className="blog" tabIndex={0}>
      
      <h2 className="blogtitle">{name}</h2>
      <h4 className="blogauthor">
        By {author} | {formatDateTime(date.toString())}
      </h4>
      <img src={picture} alt={alt} className="blogimage"></img>
      <p className="blogcontent">{description}</p>
      <br></br>
      <hr className="yellowblogdiv"></hr>
    </div>
  );
};

export default IndividualBlog;

