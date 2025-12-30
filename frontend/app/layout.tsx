import "./globals.css";
import "./globals.css";
import Navbar from "../component/navbar";

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
