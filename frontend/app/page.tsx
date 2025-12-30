import Card from "@/component/Card";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={`${inter.className} bg-slate-800 min-h-screen pt-20`}>
      <div className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-8 md:px-12 lg:px-24 py-8 gap-8 md:gap-12">
        <div className="text-white w-full md:w-1/2">
          <h2 className="py-2 text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold">
            Short Links. 
          </h2>
          <h2 className="py-2 text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold">
            QR Codes. 
          </h2>
          <h2 className="py-2 text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold">
            Simplified Sharing.
          </h2>
          <p className="text-base sm:text-lg md:text-lg lg:text-xl py-4 leading-relaxed">
            Create short, shareable links and instant QR codes - all in one place.
          </p>
          <p className="text-sm sm:text-base md:text-base lg:text-lg text-gray-300">
            LinkSnap makes it easy to turn long URLs into clean links and scannable QR codes you can use anywhere. Fast, simple, and built for everyday sharing.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <Card />
        </div>
      </div>
      <div className="text-white px-4 sm:px-8 md:px-12 lg:px-24 py-8">
        <div className="bg-slate-700/50 border-l-4 border-indigo-500 rounded-lg p-4 sm:p-6">
          <p className="text-sm sm:text-base leading-relaxed">
            <strong className="text-indigo-300">Note:</strong> The Shorten a Link component will create a short code for your link, append it to the deployed backend URL, and generate a new shortened link. Clicking the shortened link will redirect you to the original URL. Because the backend is hosted on Render’s free domain, the link may appear longer than usual. Cloning the project and using a custom domain would make it much cleaner.          </p>
        </div>
      </div>
    </div>
  );
}