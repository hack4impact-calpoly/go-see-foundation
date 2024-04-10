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
     <br />
      <h1> Follow GO See Foundation: </h1>
      <div className = "socials" >
       <a href= "https://www.facebook.com/GOSeeFoundation">
        <Image 
          src={facebook} 
          alt= "Facebook"
          width = "35"
          height = "35"
        ></Image>
        </a>
        <a href="https://www.instagram.com/goseefoundation/?hl=en">
         <Image 
          src={insta} 
          alt= "Instagram"
          width = "35"
          height = "35"
        ></Image>
        </a>
        <a href="https://podcasters.spotify.com/pod/show/go-see/episodes/GSP-003-Laurie-Mileur-e21gcre/a-a9jho7c">
         <Image 
          src={spotify} 
          alt= "Spotify"
          width = "35"
          height = "35"
        ></Image>
        </a>
         <a href="https://www.youtube.com/@allysonseye?app=desktop">
         <Image 
          src={youtube} 
          alt= "Youtube"
          width = "35"
          height = "35"
        ></Image>
        </a>
      </div>
      <div className = "logo">
      <Image 
          src={logo} 
          alt= "Go See Foundation Logo"
          width = "390"
          height = "300"
        ></Image>
        <div className="address">
          GO See Foundation<br/>
          1234 This Street<br />
          San Luis Obispo, CA 93405<br />
        </div>
        <br />
        <div className="contact">
          Phone: 123-456-789 <br />
          Fax: 123-456-789 <br />
          Email: GOsee@email.com
        </div>
      </div>
      <div className="copyright">
          GO See Foundation is a 501(c)(3) not-for-profit organization. © 2024 GO See Foundation. All rights reserved.
      </div>
      <br />
    </div>
    
    );
  }
  
/*style={{ textAlign: 'center' }}*/