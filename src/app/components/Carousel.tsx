"use client";
import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./carousel.module.css";
import Image, { StaticImageData } from "next/image";

export default function Carousel({
  images,
  imageAlts,
  quotes,
}: {
  images: Array<string>;
  imageAlts: Array<string>;
  quotes: Array<string>;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("left");

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setDirection("left");
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  const slideVariants = {
    hiddenRight: {
      x: "100%",
      opacity: 0,
    },
    hiddenLeft: {
      x: "-100%",
      opacity: 0,
    },
    visible: {
      x: "0",
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
      },
    },
  };

  const arrowVariants = {
    hover: {
      scale: 1.2,
      backgroundColor: "#ff00008e",
    },
  };

  const dotsVariants = {
    initial: {
      y: 0,
    },
    animate: {
      y: -10,
      scale: 1.2,
      transition: { type: "spring", stiffness: 1000, damping: "10" },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className={styles.container}>
      <h2>Here's what we've been up to...</h2>
      {/* <div className={styles.fullCarousel}> */}
      <div className={styles.carousel}>
        <div className={styles.carouselImage}>
          <AnimatePresence>
            <motion.img
              key={currentIndex}
              // src={require(images[currentIndex])}
              src={require("../images/Group_Photo.jpeg")}
              alt={imageAlts[currentIndex]}
              className={styles.image}
              initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
              animate="visible"
              exit="exit"
              variants={slideVariants}
            />
          </AnimatePresence>

          <div className={styles.slideDirection}>
            <motion.div
              className={styles.left}
              onClick={handlePrev}
              variants={arrowVariants}
              whileHover="hover"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                width="20"
                viewBox="0 96 960 960"
              >
                <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
              </svg>
            </motion.div>
            <motion.div
              className={styles.right}
              onClick={handleNext}
              variants={arrowVariants}
              whileHover="hover"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                width="20"
                viewBox="0 96 960 960"
              >
                <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
              </svg>
            </motion.div>
          </div>
        </div>
        <AnimatePresence></AnimatePresence>
        <div className={styles.indicator}>
          {images.map((_: any, index: number) => (
            <motion.div
              key={index}
              className={`${styles.dot} ${
                currentIndex === index ? styles.active : ""
              }`}
              onClick={() => handleDotClick(index)}
              initial="initial"
              animate={currentIndex === index ? "animate" : ""}
              whileHover="hover"
              variants={dotsVariants}
            ></motion.div>
          ))}
        </div>
      </div>
      <div className={styles.quoteContainer}>
        <p className={styles.quote}>{quotes[currentIndex]}</p>
      </div>
      {/* </div> */}
    </div>
  );
}
