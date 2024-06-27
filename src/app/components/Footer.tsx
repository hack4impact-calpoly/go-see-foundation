"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import facebook from "../images/facebook-icon.png";
import insta from "../images/insta-icon.png";
import spotify from "../images/spotify-icon.png";
import youtube from "../images/youtube-icon.png";
import logo from "../images/logo-white.png";
import "./footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footerContent">
        <div className="follow">
          <h1>Follow GO See Foundation</h1>
          <div className="socials">
            <a href="https://www.facebook.com/GOSeeFoundation">
              <Image src={facebook} alt="Facebook" width="35" height="35" />
            </a>
            <a href="https://www.instagram.com/goseefoundation/?hl=en">
              <Image src={insta} alt="Instagram" width="35" height="35" />
            </a>
            <a href="https://podcasters.spotify.com/pod/show/go-see/episodes/GSP-003-Laurie-Mileur-e21gcre/a-a9jho7c">
              <Image src={spotify} alt="Spotify" width="35" height="35" />
            </a>
            <a href="https://www.youtube.com/@allysonseye?app=desktop">
              <Image src={youtube} alt="Youtube" width="35" height="35" />
            </a>
          </div>
        </div>

        <div className="contact">
          <h1>Contact</h1>
          <div>
            Phone: (805) 242-4220 <br />
            Email: allyson@goseefoundation.org
          </div>
        </div>
      </div>
      <div className= "divider"></div>
      <div className="copyright">
        GO See Foundation is a 501(c)(3) not-for-profit organization. © 2024 GO
        See Foundation. All rights reserved.
      </div>
    </div>
  );
}