import React, { useEffect, useState } from "react";
import "./Blog.css";
import IndividualBlog from "./IndividualBlog";
import { IBlog } from "@database/blogSchema";
import { useRouter } from "next/navigation";

export default function Archive() {
  const [blogs, setBlogs] = useState<Array<IBlog>>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState<Array<IBlog>>([]);
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
        setBlogs(data);
        setFilteredBlogs(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBlogData();
  }, []);

  const handleSearchInputChange = (blog: React.ChangeEvent<HTMLInputElement>) => {
    const query = blog.target.value.trim(); // Trim whitespace
    setSearchQuery(query);
  
    const filtered = blogs.filter((blog) => {
      const regex = new RegExp(query, 'i'); // Create case-insensitive regex
      return regex.test(blog.name); // Test if blog name matches regex
    });
    setFilteredBlogs(filtered);
  };

  const handleArchivesClick = () => {
    push("/blog/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container">
      <span className="header">
        <h2 className="title">GO See Blog</h2>
        <div className="rightaligned">
        <button className="olderarticles" onClick={handleArchivesClick}>
            Most Recent
        </button>
          
        </div>
      </span>
    
      <hr className="line" />
      <div className="blogs">
      {filteredBlogs.slice(3).map((b: IBlog, index: number) => (
          <IndividualBlog key={index} blog={b} />
        ))}
      </div>
      <button className="olderarticles"  onClick={handleArchivesClick}>
        {'<'} Most Recent
        </button>
     
    </div>
  );
}
