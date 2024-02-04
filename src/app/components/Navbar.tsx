import React from "react";
import Link from "next/link";

export default function Navbar() {
  return <div>Navbar
    <ul>
      <li><Link href="/">Home</Link></li>
      <li><Link href="/pages/authentication/login">Login</Link></li>
      <li><Link href="/pages/authentication/createAccount">Create Account</Link></li>
    </ul>
  </div>;
}
