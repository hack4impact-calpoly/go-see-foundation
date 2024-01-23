import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      Navbar
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/pages/login">Login</Link>
        </li>
      </ul>
    </div>
  );
}
