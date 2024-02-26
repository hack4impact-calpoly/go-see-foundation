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
  quoteSrc,
}: {
  images: Array<string>;
  imageAlts: Array<string>;
  quotes: Array<string>;
  quoteSrc: Array<string>;
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
      backgroundColor: "#f6ff00",
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
      <div className={styles.fullCarousel}>
        <div className={styles.carousel}>
          <div className={styles.slideDirection}>
            <motion.div
              className={styles.left}
              onClick={handlePrev}
              variants={arrowVariants}
              whileHover="hover"
            >
              {"<"}
            </motion.div>
          </div>

          <div className={styles.carouselImage}>
            <AnimatePresence>
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={imageAlts[currentIndex]}
                className={styles.image}
                initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
                animate="visible"
                exit="exit"
                variants={slideVariants}
              />
            </AnimatePresence>
          </div>

          <div className={styles.slideDirection}>
            <motion.div
              className={styles.right}
              onClick={handleNext}
              variants={arrowVariants}
              whileHover="hover"
            >
              {">"}
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
        <p className={styles.quote}>"{quotes[currentIndex]}"</p>
        <p className={styles.quoteSrc}>- {quoteSrc[currentIndex]}</p>
      </div>
      {/* </div> */}
    </div>
  );
}
