import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

//! Update metadata to match your project
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (    
    <html lang="en">
      <body>
        <Navbar />
        <div id="main">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
