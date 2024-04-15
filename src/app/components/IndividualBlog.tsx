import React, { useState } from "react";

const IndividualBlog = ({ blog }) => {
  const [localBlog, setLocalBlog] = useState(blog);

  return (
    <div>
      <h3>{localBlog.category}</h3>
      <h2>{localBlog.title}</h2>
      <h4>
        by {localBlog.author} | {localBlog.date}
      </h4>
      <img src={localBlog.image} alt={localBlog.altpicture}></img>
      <p>{localBlog.content}</p>
      <hr className="yellowblogdiv"></hr>
    </div>
  );
};

export default IndividualBlog;
