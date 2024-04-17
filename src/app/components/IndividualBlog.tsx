import React, { useState } from "react";
import "./individualBlog.css";

const IndividualBlog = () => {
  //const [localBlog, setLocalBlog] = useState(blog);

  return (
    <div className="blog">
      <h3 className="blogcategory">Event/Update</h3>
      <h2 className="blogtitle">Partnership with Cal Poly Arts.</h2>
      <h4 className="blogauthor">by Allyson Buerger | Feb 15, 2023</h4>
      <img src="/" alt="image" className="blogimage"></img>
      <p className="blogcontent">
        Cal Poly Arts is proud to announce our newest Passport to the Arts
        Community Partner - the GO See Foundation! We at Cal Poly Arts believe
        the arts should not be reserved for the privileged few in our county,
        but rather, available and accessible to everyone, which is why we are so
        excited to partner with Founder Allyson Buerger and the GO See
        Foundation in their mission "to encourage, inspire and empower those
        going through vision loss to remain active and engaged in the world.""By
        being involved with Cal Poly Arts and [the] Passport to the Arts
        program, the blind & visually impaired will have the opportunity to
        connect with the sighted community on a different level. Music allows
        people to engage with one another in a way that isn’t reliant on visuals
        but is instead created through sounds — so listening to live concerts
        and theater with those that are sighted provides an ability to connect,
        and to have a shared language."- Allyson Buerger, GO See Foundation
        FounderWe can't wait to welcome the GO See Foundation to their first
        event with us: Matthew Witaker in the Spanos Theater, tomorrow night
        (Dec. 6). Limited tickets are still available!Interested in becoming a
        Partner? Visit us online at calpolyarts.org/passport or via the link in
        our bio, to learn more about this amazing program.
      </p>
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
