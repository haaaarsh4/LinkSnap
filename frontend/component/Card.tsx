"use client";

import { useState } from "react";
import URLshorten from "./URLshorten";
import QRGen from "./QRGen";

export default function Card () {
    const [isShorten, setSelected] = useState(true)

    return(
        <div>
            <div className="flex justify-center shadow-sm">
                <button 
                    onClick={() => setSelected(true)} 
                    className={`w-1/2 font-medium rounded-t-lg p-4 border-r border-gray-600 cursor-pointer transition ${isShorten ? 'bg-blue-500 text-white' : 'bg-white'}`}>
                    Shorten a Link
                </button>
                <button 
                    onClick={() => {setSelected(false)}} 
                    className={`w-1/2 font-medium rounded-t-lg border-l border-gray-600 cursor-pointer transition ${!isShorten ? 'bg-blue-500 text-white' : 'bg-white'}`}>
                    Generate QR Code
                </button>
            </div>
            {isShorten ? (
                <URLshorten />
            ) : (
                <div>
                    <QRGen />
                </div>
            )}
        </div>
    );
}