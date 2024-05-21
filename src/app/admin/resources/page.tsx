"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./resources.module.css";
import { useRouter } from "next/navigation";
import BackButton from "../../components/BackButton";

const ResourcePage = () => {
  const newResourceButtonRef = useRef<HTMLButtonElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const pictureInputRef = useRef<HTMLInputElement>(null);
  const altTextInputRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const { push } = useRouter(); // used for going to a different page
  const [imageDataURL, setImageDataURL] = useState("");
  const [formData, setFormData] = useState({
    picture: "",
    alt: "",
    title: "",
    url: "",
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
        case "newResourceButton":
          firstInputRef?.current?.focus();
          break;
        case "firstInput":
          urlInputRef?.current?.focus();
          break;
        case "urlInput":
          pictureInputRef?.current?.focus();
          break;
        case "pictureInput":
          altTextInputRef?.current?.focus();
          break;
        case "altTextInput":
          submitButtonRef?.current?.focus();
          break;
        case "submitButton":
          newResourceButtonRef?.current?.focus(); // Loop back to the first input field
          break;
        default:
          break;
      }
    }
  };

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
    // Create New Resource, POST
    try {
      formData["picture"] = imageDataURL;

      const response = await fetch("/api/resources/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      if (response.ok && responseData.message == "Success: Resource uploaded") {
        alert("New Event Created!");
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

  return (
    <div>
      <BackButton />
      <div className={styles.container}>
        <div className={styles.resourceManager}>
          <div className={styles.topButtons}>
            <button
              className={styles.newResourceButton}
              id="newResourceButton"
              type="button"
              ref={newResourceButtonRef}
              // onClick={handleFormSwitch} // only 1 tab, so no longer needed
            >
              New Resource
            </button>
          </div>
          <form
            className={styles.resourceForm}
            onChange={handleEventChange}
            onSubmit={handleSubmit}
          >
            <input
              className={styles.input}
              type="text"
              id="firstInput"
              name="title"
              placeholder="Title"
              value={formData["title"]}
              required
              ref={firstInputRef}
              onKeyDown={handleInputKeyPress}
            />
            <input
              className={styles.input}
              type="text"
              id="urlInput"
              name="url"
              value={formData["url"]}
              placeholder="Resource URL"
              required
              ref={urlInputRef}
              onKeyDown={handleInputKeyPress}
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
            />
            <input
              className={styles.input}
              type="text"
              id="altTextInput"
              name="alt"
              value={formData["alt"]}
              placeholder="Alternative Text for Image"
              required
              ref={altTextInputRef}
              onKeyDown={handleInputKeyPress}
            />
            <button
              className={styles.createResourceButton}
              id="submitButton"
              type="submit"
              ref={submitButtonRef}
            >
              Create New Resource
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResourcePage;
