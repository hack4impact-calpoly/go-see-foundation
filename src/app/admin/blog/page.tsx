"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./blog.module.css";
import { useRouter } from "next/navigation";
import { IBlog } from "@database/blogSchema";
import BackButton from "@components/backButton";

const BlogPage = () => {
  const newBlogButtonRef = useRef<HTMLButtonElement>(null);
  const deleteBlogButtonRef = useRef<HTMLButtonElement>(null);
  const blogSelectorRef = useRef<HTMLSelectElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const authorInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const pictureInputRef = useRef<HTMLInputElement>(null);
  const altTextInputRef = useRef<HTMLInputElement>(null);
  const blogDescriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const { push } = useRouter();

  // 0 = New, 1 = Delete, 2 = Edit
  const [activeForm, setActiveForm] = useState(0);

  const [blogs, setBlogs] = useState<Array<IBlog>>([]);
  const [selectedBlogIndex, setSelectedBlogIndex] = useState(-1);
  const [imageDataURL, setImageDataURL] = useState("");
  const [formData, setFormData] = useState({
    picture: "",
    alt: "",
    description: "",
    date: null as Date | null,
    name: "",
    blogID: "",
    author: "",
  });

  const handleInputKeyPress = (
    e: React.KeyboardEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLButtonElement
      | HTMLSelectElement
    >
  ) => {
    if (e.key === "Tab") {
      e.preventDefault();
      // (Your tab navigation logic here)
    }
  };

  const fetchAllBlogs = async () => {
    try {
      const res = await fetch("/api/blog", {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch blogs");
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
        const data = await fetchAllBlogs();
        setBlogs(data);
      } catch (error: unknown) {
        console.error(`Error: ${error}`);
      }
    };
    fetchBlogData();
  }, [activeForm]);

  // When in edit mode and a blog is selected, populate the form fields
  useEffect(() => {
    if (activeForm === 2 && selectedBlogIndex !== -1) {
      const blog = blogs[selectedBlogIndex];
      setFormData({
        picture: blog.picture,
        alt: blog.alt,
        description: blog.description,
        date: new Date(blog.date),
        name: blog.name,
        blogID: blog.blogID,
        author: blog.author,
      });
      setImageDataURL(blog.picture);
    }
  }, [selectedBlogIndex, activeForm, blogs]);

  const handleEventChange = (
    event: React.ChangeEvent<HTMLFormElement>
  ): void => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create New Blog, POST
    if (activeForm === 0) {
      try {
        const newBlogData = {
          ...formData,
          blogID: formData.name, // temporary blogID using the name
          picture: imageDataURL,
        };

        const response = await fetch("/api/blog/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBlogData),
        });

        const responseData = await response.json();
        if (response.ok && responseData.message === "Success: Blog uploaded") {
          alert("New Blog Created!");
          window.location.reload();
          window.scrollTo(0, 0);
          push("/admin");
        } else {
          alert("Error: " + responseData.message);
        }
      } catch (error) {
        console.error(`Create Blog Error: ${error}`);
      }
    }
    // Delete Blog, DELETE
    else if (activeForm === 1) {
      try {
        const blogToDelete = blogs[selectedBlogIndex];
        const response = await fetch(`/api/blog/${blogToDelete.blogID}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ blogID: blogToDelete.blogID }),
        });

        const responseData = await response.json();
        if (response.ok && responseData.message === "Success: Blog deleted") {
          alert(`"${blogToDelete.name}" deleted`);
          window.location.reload();
          window.scrollTo(0, 0);
        } else {
          console.error(`Error deleting blog: ${responseData.message}`);
        }
      } catch (err) {
        console.error("Error deleting blog:", err);
      }
    }
    // Edit Blog, PUT
    else if (activeForm === 2) {
      try {
        const updatedBlog = {
          ...formData,
          picture: imageDataURL || formData.picture,
        };

        const response = await fetch(`/api/blog/${formData.blogID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBlog),
        });
        const responseData = await response.json();
        if (response.ok && responseData.message === "Success: Blog updated") {
          alert("Blog updated successfully!");
          window.location.reload();
          window.scrollTo(0, 0);
          push("/admin");
        } else {
          alert("Error updating blog: " + responseData.message);
        }
      } catch (error) {
        console.error("Error updating blog:", error);
      }
    }
  };

  const handleFormSwitch = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.id === "newBlogButton") {
      setActiveForm(0);
      setSelectedBlogIndex(-1);
    } else if (event.currentTarget.id === "deleteBlogButton") {
      setActiveForm(1);
      setSelectedBlogIndex(-1);
    } else if (event.currentTarget.id === "editBlogButton") {
      setActiveForm(2);
      setSelectedBlogIndex(-1);
    }

    // Reset form
    setFormData({
      picture: "",
      alt: "",
      description: "",
      date: null,
      name: "",
      blogID: "",
      author: "",
    });
    setImageDataURL("");
  };

  // For retrieving the actual data URL of an image
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files ? event.target.files[0] : null;
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const image_URL = reader.result;
        if (typeof image_URL === "string") {
          setImageDataURL(image_URL);
          setFormData((prev) => ({ ...prev, picture: image_URL }));
        } else {
          alert(
            "Image could not be uploaded. Please try again or select a different file"
          );
        }
      };
      reader.readAsDataURL(image);
    } else {
      console.log("Canceled image selection");
    }
  };

  const handleBlogSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBlogIndex(Number(event.target.value));
  };

  // Formats a Date object to YYYY-MM-DD for the date input element
  const formatDate = (date: Date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  // In delete mode the inputs should be disabled.
  // In edit mode, disable them until a blog is selected.
  const inputsDisabled =
    activeForm === 1 || (activeForm === 2 && selectedBlogIndex === -1);

  return (
    <div>
      <BackButton />
      <div className={styles.container}>
        <div className={styles.blogManager}>
          <div className={styles.topButtons}>
            <button
              className={`${styles.newBlogButton} ${
                activeForm === 0 ? styles.activeForm : ""
              }`}
              id="newBlogButton"
              type="button"
              ref={newBlogButtonRef}
              onClick={handleFormSwitch}
            >
              New Blog
            </button>
            <button
              className={`${styles.deleteBlogButton} ${
                activeForm === 1 ? styles.activeForm : ""
              }`}
              id="deleteBlogButton"
              type="button"
              ref={deleteBlogButtonRef}
              onClick={handleFormSwitch}
            >
              Delete Blog
            </button>
            <button
              className={`${styles.editBlogButton} ${
                activeForm === 2 ? styles.activeForm : ""
              }`}
              id="editBlogButton"
              type="button"
              onClick={handleFormSwitch}
            >
              Edit Blog
            </button>
          </div>

          {/* In edit and delete modes, first render a blog selector */}
          {(activeForm === 1 || activeForm === 2) && (
            <select
              className={styles.selectBlogReadable}
              id="blogSelector"
              name="blogSelector"
              onChange={handleBlogSelection}
              value={selectedBlogIndex}
              ref={blogSelectorRef}
            >
              <option value={-1}>Select Blog...</option>
              {blogs.map((blog: IBlog, index: number) => (
                <option key={index} value={index}>
                  {`Name: ${blog.name}`}
                </option>
              ))}
            </select>
          )}

          <form
            className={styles.blogForm}
            onChange={handleEventChange}
            onSubmit={handleSubmit}
          >
            {/* In New mode, render an input for the blog name */}
            {activeForm === 0 && (
              <input
                className={styles.input}
                type="text"
                id="nameInput"
                name="name"
                placeholder="Blog Title"
                value={formData.name}
                required
                ref={nameInputRef}
                onKeyDown={handleInputKeyPress}
              />
            )}

            {/* In Edit mode, if a blog is selected, allow editing the name */}
            {activeForm === 2 && selectedBlogIndex !== -1 && (
              <input
                className={styles.input}
                type="text"
                id="nameInput"
                name="name"
                placeholder="Blog Title"
                value={formData.name}
                required
                ref={nameInputRef}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                onKeyDown={handleInputKeyPress}
              />
            )}

            <input
              className={styles.input}
              type="text"
              id="authorInput"
              name="author"
              placeholder="Author"
              required
              ref={authorInputRef}
              onKeyDown={handleInputKeyPress}
              value={
                activeForm === 1 && selectedBlogIndex !== -1
                  ? blogs[selectedBlogIndex].author
                  : formData.author
              }
              disabled={inputsDisabled}
            />

            <input
              className={styles.input}
              type="date"
              id="date"
              name="date"
              placeholder="Date"
              required
              ref={dateInputRef}
              onKeyDown={handleInputKeyPress}
              value={
                activeForm === 1 && selectedBlogIndex !== -1
                  ? formatDate(new Date(blogs[selectedBlogIndex].date))
                  : formData.date
                  ? formatDate(formData.date)
                  : ""
              }
              disabled={inputsDisabled}
            />

            <input
              className={styles.input}
              type="file"
              accept=".png, .jpg, .jpeg, image/*"
              id="pictureInput"
              name="picture"
              placeholder="Upload Image"
              required={activeForm === 0}
              ref={pictureInputRef}
              onKeyDown={handleInputKeyPress}
              onChange={handleFileInput}
              disabled={inputsDisabled}
            />

            <input
              className={styles.input}
              type="text"
              id="altTextInput"
              name="alt"
              placeholder="Alternative Text for Image"
              required
              ref={altTextInputRef}
              onKeyDown={handleInputKeyPress}
              value={
                activeForm === 1 && selectedBlogIndex !== -1
                  ? blogs[selectedBlogIndex].alt
                  : formData.alt
              }
              disabled={inputsDisabled}
            />

            <textarea
              className={styles.descriptionInput}
              id="blogDescription"
              name="description"
              placeholder="Blog Description"
              required
              ref={blogDescriptionInputRef}
              onKeyDown={handleInputKeyPress}
              value={
                activeForm === 1 && selectedBlogIndex !== -1
                  ? String(blogs[selectedBlogIndex].description)
                  : formData.description
              }
              disabled={inputsDisabled}
            ></textarea>

            <button
              className={styles.createBlogButton}
              id="submitButton"
              type="submit"
              ref={submitButtonRef}
            >
              {activeForm === 0
                ? "Create New Blog"
                : activeForm === 1
                ? "Delete Blog"
                : "Edit Blog"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
