"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./blog.module.css";
import { useRouter } from "next/navigation";
import { IEvent } from "@database/blogSchema";
import BackButton from '../../components/backButton';

const BlogPage = () => {
  const newBlogButtonRef = useRef<HTMLButtonElement>(null);
  const deleteBlogButtonRef = useRef<HTMLButtonElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const authorInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const pictureInputRef = useRef<HTMLInputElement>(null);
  const altTextInputRef = useRef<HTMLInputElement>(null);
  const blogDescriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const { push } = useRouter();

  const [activeForm, setActiveForm] = useState(0);
  const [blogs, setBlogs] = useState<Array<IEvent>>([]);
  const [selectedBlogIndex, setSelectedBlogIndex] = useState(-1);
  const [imageDataURL, setImageDataURL] = useState("");
  const [formData, setFormData] = useState({
    picture: "",
    alt: "",
    description: "",
    date: null,
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
      switch (e.currentTarget.id) {
        case "newBlogButton":
          deleteBlogButtonRef?.current?.focus();
          break;
        case "deleteBlogButton":
          firstInputRef?.current?.focus();
          break;
        case "firstInput":
          authorInputRef?.current?.focus();
          break;
        case "authorInput":
          dateInputRef?.current?.focus();
          break;
        case "date":
          pictureInputRef?.current?.focus();
          break;
        case "pictureInput":
          altTextInputRef?.current?.focus();
          break;
        case "altTextInput":
          blogDescriptionInputRef?.current?.focus();
          break;
        case "blogDescription":
          submitButtonRef?.current?.focus();
          break;
        case "createBlogButton":
          newBlogButtonRef?.current?.focus(); // Loop back to the first input field
          break;
        default:
          break;
      }
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
        formData["blogID"] = formData.name; // temporary, blogID same as name
        formData["picture"] = imageDataURL;

        const response = await fetch("/api/blog/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const responseData = await response.json();
        if (response.ok && responseData.message == "Success: Blog uploaded") {
          alert("New Blog Created!");
          window.location.reload();
          window.scrollTo(0, 0);
          // push("/admin");
        } else {
          const errorMessage = responseData.message;
          alert("Error: " + errorMessage);
        }
      } catch (error) {
        console.error(`Create Blog Error: ${error}`);
      }
    }
    // Deleting Blog, DELETE
    else {
      try {
        const response = await fetch(
          `/api/blog/${blogs[selectedBlogIndex].blogID}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/JSON",
            },
            body: JSON.stringify({ blogID: blogs[selectedBlogIndex].blogID }),
          }
        );

        const responseData = await response.json();
        if (response.ok && responseData.message == "Success: Blog deleted") {
          alert(`"${blogs[selectedBlogIndex].name}" deleted`);
          window.location.reload();
          window.scrollTo(0, 0);
        } else {
          console.error(`Error deleting blog: ${responseData.message}`);
        }
      } catch (err) {
        console.error("Error deleting blog:", err);
      }
    }
  };

  const handleFormSwitch = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.id === "newBlogButton") {
      setActiveForm(0);
      setSelectedBlogIndex(-1);
    } else {
      setActiveForm(1);
    }
    setFormData({
      picture: "",
      alt: "",
      description: "",
      date: null,
      name: "",
      blogID: "",
      author: "",
    });
  };

  // for retreiving the actual data URL of an image instead of the file path
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files ? event.target.files[0] : null;
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const image_URL = reader.result;
        if (typeof image_URL === "string") {
          formData["picture"] = image_URL;
          setImageDataURL(image_URL);
        } else {
          console.log("error, image could not be uploaded");
          alert(
            "image could not be uploaded. please try again or select a different file"
          );
        }
      };
      reader.readAsDataURL(image);
    } else {
      console.log("canceled image selection");
    }
  };

  const handleBlogSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBlogIndex(Number(event.target.value));
    // TODO: load all info for inputs
  };

  // formats a Date object to YYYY-MM-DD for the date input element
  const formatDate = (date: Date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  return (
    <div> <BackButton/>
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
        </div>
        <form
          className={styles.blogForm}
          onChange={handleEventChange}
          onSubmit={handleSubmit}
        >
          {activeForm === 0 ? (
            <input
              className={styles.input}
              type="text"
              id="firstInput"
              name="name"
              placeholder="Title"
              value={formData["name"]}
              required
              ref={firstInputRef}
              onKeyDown={handleInputKeyPress}
            />
          ) : (
            <select
            className={styles.selectBlog}
            id="firstInput"
            name="name"
            required
            onKeyDown={handleInputKeyPress}
            onChange={handleBlogSelection}
          >
            <option value="-1">Select Blog...</option>
            {blogs.map((blog: IEvent, index: number) => (
              <option key={index} value={index}>{`Name: ${blog.name}`}</option>
            ))}
          </select>
          )}
          <input
            className={styles.input}
            type="text"
            id="authorInput"
            name="author"
            value={
              selectedBlogIndex === -1
                ? formData["author"]
                : blogs[selectedBlogIndex].author
            }
            placeholder="Author"
            required
            ref={authorInputRef}
            onKeyDown={handleInputKeyPress}
            disabled={selectedBlogIndex === -1 ? false : true}
          />
          <input
            className={styles.input}
            type="date"
            id="date"
            name="date"
            value={
              selectedBlogIndex === -1
                ? formData["date"]
                  ? formatDate(formData["date"])
                  : ""
                : formatDate(blogs[selectedBlogIndex].date)
            }
            placeholder="Date"
            required
            ref={dateInputRef}
            onKeyDown={handleInputKeyPress}
            disabled={selectedBlogIndex === -1 ? false : true}
          />
          <input
            className={styles.input}
            type="file"
            accept=".png, .jpg, .jpeg, image/*"
            value={formData.picture}
            id="pictureInput"
            name="picture"
            placeholder="Upload Image"
            required
            ref={pictureInputRef}
            onKeyDown={handleInputKeyPress}
            onChange={handleFileInput}
            disabled={selectedBlogIndex === -1 ? false : true}
          />
          <input
            className={styles.input}
            type="text"
            id="altTextInput"
            name="alt"
            value={
              selectedBlogIndex === -1
                ? formData["alt"]
                : blogs[selectedBlogIndex].alt
            }
            placeholder="Alternative Text for Image"
            required
            ref={altTextInputRef}
            onKeyDown={handleInputKeyPress}
            disabled={selectedBlogIndex === -1 ? false : true}
          />
          <textarea
            className={styles.descriptionInput}
            id="blogDescription"
            name="description"
            placeholder="Blog Description"
            value={
              selectedBlogIndex === -1
                ? formData["description"]
                : String(blogs[selectedBlogIndex].description)
            }
            required
            ref={blogDescriptionInputRef}
            onKeyDown={handleInputKeyPress}
            disabled={selectedBlogIndex === -1 ? false : true}
          ></textarea>
          <button
            className={styles.createBlogButton}
            id="submitButton"
            type="submit"
            ref={submitButtonRef}
          >
            {activeForm === 0 ? "Create New Blog" : "Delete Blog"}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default BlogPage;
