import Navbar from "@components/Navbar";
import CreateAccount from "./authentication/createAccount";

export default function Home() {
  return (
    <main>
      <Navbar />
      <h1>Home</h1>
      <CreateAccount />
    </main>
  );
}