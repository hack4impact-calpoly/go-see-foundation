// Create Account Page
"use client";
import React, { useState } from "react";
import Image from "next/image";
import "./createAccount.css";

const CreateAccount = () => {
  const [account, setAccount] = useState({
    first: "",
    last: "",
    phone: "",
    email: "",
    user: "",
    password: "",
  });

  const handleAccountChange = (e: React.FormEvent<HTMLFormElement>) => {
    const event = e.target as HTMLInputElement;
    setAccount({ ...account, [event.id]: event.value });
  };

  const handleAccountSubmit = () => {};

  return (
    <div className="createAccount">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="../../images/GO-See-HLogo.fw_.png" alt="logo" />
      <form onChange={handleAccountChange} onSubmit={handleAccountSubmit}>
        <input type="text" id="first" placeholder="First Name" />
        <input type="text" id="last" placeholder="Last Name" />
        <input type="tel" id="phone" placeholder="Phone Number" />
        <input type="email" id="email" placeholder="Email" />
        <select id="user">
          <option value="Member">Member</option>
          <option value="Volunteer">Volunteer</option>
          <option value="Partner/Doner">Partner/Doner</option>
        </select>
        <input type="password" id="password" placeholder="Password" />
        <input type="submit" />
      </form>
    </div>
  );
};

export default CreateAccount;
