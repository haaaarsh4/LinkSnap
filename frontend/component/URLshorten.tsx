"use client";

import Link from "next/link";
import { useState } from "react";

export default function URLshorten () {
    const [loading, setloading] = useState(false)
    const [shortCode, setShortCode] = useState("")
    const [longUrl, setLongUrl] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setloading(true)
        setError("")
        setShortCode("")

        try {
            const formData = new FormData()
            formData.append("url", longUrl)

            const response = await fetch("https://linksnap-shortener.onrender.com/shorten", {
                method: "POST", 
                body: formData
            })

            if (response.ok) {
                const code = await response.text()
                setShortCode(code)
            } else {
                setError("Invalid URL or server error")
            }
        } catch (err) {
            setError("Failed to connect to the server")
        } finally {
            setloading(false)
        }
    };
    
    return(
        <div className="bg-white p-4 rounded-b-lg">
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-700">
                        Enter a URL to create a short link that redirects to your destination.
                    </p>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 px-1 mb-2">
                        Long URL
                    </label>
                    <input 
                        type="text" 
                        name="LongURL" 
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                        placeholder="Paste long URL here"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        required
                    />
                </div>
                <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition shadow-md hover:shadow-lg disabled:bg-gray-400">
                    {loading ? "Shortening..." : "Shorten Link"}
                </button>
            </form>
            
            {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            {shortCode && (
                <div className="mt-4 p-4 bg-green-100 rounded-lg">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Shortened URL:</p>
                    <Link 
                        href={`https://linksnapp.vercel.app/${shortCode}`} 
                        target="_blank" 
                        className="text-blue-600 font-mono hover:underline">
                            https://linksnapp.vercel.app/{shortCode}
                    </Link>
                </div>
            )}
        </div>
    ); 
}