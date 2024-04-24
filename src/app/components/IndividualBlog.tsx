import React, { useState } from "react";
import { IEvent } from "@database/blogSchema";
import Image from "next/image";
import "./individualBlog.css";

const IndividualBlog = ({ event }: { event: IEvent }) => {
  //const [localBlog, setLocalBlog] = useState(blog);
  const { picture, alt, description, date, name, blogID, author } = event;

  return (
    <div className="blog">
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

/*const IndividualBlog = ({ blog }) => {
  const [localBlog, setLocalBlog] = useState(blog);
*/

/*    <div className='blog'>
<h3 className='blogcategory'>{localBlog.category}</h3>
<h2 className="blogtitle">{localBlog.title}</h2>
<h4 className="blogauthor">
  by {localBlog.author} | {localBlog.date}
</h4>
<img src={localBlog.image} alt={localBlog.altpicture} className='blogimage'></img>
<p className='blogcontent'>{localBlog.content}</p>
<br></br>
<hr className="yellowblogdiv"></hr>
</div>
); */
