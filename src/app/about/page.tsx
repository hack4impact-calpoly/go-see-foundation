"use client";
import React from "react";
import EmbedVideo from "../components/VideoEmbed";
import Image from "next/image";
import styles from "./about.module.css";
import founder from "../images/founder.png";
import podcast from "../images/podcast.png";
import spotify from "../images/spotify.svg";

const AboutPage = () => {
  return (
    <div className={styles.about}>
      <h1 className={styles.title}>Allyson Buerger - The Founder</h1>
      <div className={styles.introWrapper}>
        <div className={styles.introduction}>
          <div className={styles.firstHalf}>
            <div className={styles.text}>
              <p>
                My name is Allyson Buerger and I created the GO See Foundation
                with a mission to encourage, inspire, and empower those going
                through vision loss to remain active and engaged with the world.
                I’ve been dealing with vision loss for as long as I can remember
                and have had over 25 eye surgeries. I have been diagnosed with
                juvenile inflammatory arthritis, uveitis, glaucoma, cataracts,
                and my right eye is now a prosthetic. Throughout my vision
                journey, I have experienced the life changing uncertainty and
                challenges that come with losing your sight.
              </p>
              <p>
                My dad, Gary Owens who we all called G.O. was known for his
                generous heart and boundless zest for life. His infectious
                enthusiasm always encouraged my whole family and I to live our
                lives to the fullest. The foundation is named “GO See” because
                of my dad G.O. and what I learned from him about dealing with
                life’s challenges, including my vision loss. Because of my dad,
                I believe that it is important to stay active and engaged with
                the world around you and to GO like G.O. always did.
              </p>
            </div>
            <div className={styles.imageShadow}>
              <Image
                className={styles.founder}
                src={founder}
                alt="founder image"
              />
            </div>
          </div>
          <p>
            Through the GO See Foundation blind and visually impaired adults on
            the Central Coast have enjoyed tandem kayaking, trail hikes, yoga,
            birding by ear, zip-lining, and other tactile experiences. These
            activities are meant to engage our other senses in fun ways and
            forge a community where people with vision loss can support each
            other and experience new things.
          </p>
          <p>
            The GO See Foundation relies on private donations to fund our
            activities and volunteers for each of the events. If you would like
            to volunteer your time with the GO See Foundation we are always
            looking for sighted guides, drivers, and other volunteers. If you
            would like to donate to support our mission, you can make a monetary
            donation on our website.
          </p>
        </div>
      </div>
      <div>
        <h1 className={`${styles.header} ${styles.videoHeader}`}>
          Watch an Interview with Allyson
        </h1>
        <div className={styles.video}>
          <EmbedVideo videoId="0sjTI04kwUw" width={700} height={400} />
        </div>
      </div>
      <div className={styles.podcast}>
        <h1 className={styles.header}>
          Listen to Our Podcast - Episode 3 out now!
        </h1>
        <div className={styles.podcastContent}>
          <div className={styles.imageBorder}>
            <Image
              className={styles.podcastImage}
              src={podcast}
              alt="podcast image"
            />
          </div>
          <div className={styles.podcastDescription}>
            <h1 className={styles.description}>GO See Podcast</h1>
            <p className={styles.description}>
              Helping the blind and visually impaired thrive through stories and
              conversations with inspiring members of our community.
            </p>
            <a href="https://podcasters.spotify.com/pod/show/go-see/episodes/GSP-003-Laurie-Mileur-e21gcre/a-a9jho7c">
              <button className={styles.podcastButton}>
                <Image className={styles.spotify} src={spotify} alt="spotify logo"/> {' '}
                Listen on Spotify
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
