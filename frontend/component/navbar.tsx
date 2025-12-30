import Link from "next/link";
import { Montserrat } from "next/font/google";
import { Github } from "lucide-react";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function Navbar() {
    return(
        <nav className={`${montserrat.className} fixed top-0 w-full z-50 flex justify-between items-center bg-linear-to-l from-indigo-900 to-indigo-700 px-4 sm:px-8 md:px-12 lg:px-24 p-4`}>
            <div>
                <Link 
                    href="/" 
                    className="text-xl sm:text-2xl font-bold text-sky-100">
                        LinkSnap
                </Link>
            </div>
            <div className="flex gap-4 text-sky-100" style={{ fontWeight: 600 }}>
                <Link href="https://github.com/haaaarsh4/LinkSnap" target="_blank" >
                    <Github className="w-5 h-5 sm:w-6 sm:h-6 hover:text-gray-400 transition"/>
                </Link>
            </div>
        </nav>
    );
}
