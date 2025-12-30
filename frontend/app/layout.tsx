import "./globals.css";
import "./globals.css";
import Navbar from "../component/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkSnap",
  description: "URL Shortener & QR Code Generator",
  icons: {
    icon: [
      {
        url: '/DP.jpg',
        type: 'image/jpeg',
      }
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="">
          {children}
        </main>
      </body>
    </html>
  );
}
