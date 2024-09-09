import React, { useEffect, useState } from "react";
import "./Blog.css";
import IndividualBlog from "./IndividualBlog";
import { IBlog } from "@database/blogSchema";
import { useRouter } from "next/navigation";

export default function Blog() {
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
      }
    };

    fetchBlogData();
  }, []);

  const handleSearchInputChange = (
    blog: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = blog.target.value;
    setSearchQuery(query);

    // Filter events based on the search query
    const filtered = blogs.filter((blog) =>
      blog.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBlogs(filtered);
  };

  const handleArchivesClick = () => {
    push("/blog/archive");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container">
      <span className="header">
        <h2 className="title">GSF Blog</h2>
        <div className="rightaligned">
          <button className="olderarticles" onClick={handleArchivesClick}>
            VIEW ARCHIVE
          </button>
          <form className="search-form" onSubmit={(e) => e.preventDefault()}>
            <input
              className="search-input"
              type="search"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Search All Blogs..."
            />
          </form>
        </div>
      </span>
    
      <hr className="line" />
      <div className="blogs">
        {filteredBlogs.slice(0, 3).map((b: IBlog, index: number) => (
          <IndividualBlog key={index} blog={b} />
        ))}
      </div>
      <div className="pageselection">
        <button className="olderarticles"  onClick={handleArchivesClick}>
          Archived Blogs {'>'}
        </button>
      </div>
    </div>
  );
}
