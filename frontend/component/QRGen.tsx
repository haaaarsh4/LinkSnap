"use client";

import Link from "next/link";
import { useState } from "react";
import { Download } from "lucide-react";

export default function QRGen () {
    const [loading, setloading] = useState(false)
    const [Url, setUrl] = useState("")
    const [QR, setQR] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setloading(true)
        setError("")
        setQR("")

        try {
            const formData = new FormData()
            formData.append("url", Url)

            const response = await fetch("https://linksnap-qr.onrender.com/QRGen", {
                method: "POST", 
                body: formData
            })

            if (response.ok) {
                const blob = await response.blob()
                const imageUrl = URL.createObjectURL(blob)
                setQR(imageUrl)
            } else {
                setError("Invalid URL or server error")
            }
        } catch (err) {
            setError("Failed to connect to the server")
        } finally {
            setloading(false)
        }
    };

    const handleDownload = () => {
        const link = document.createElement('a')
        link.href = QR
        link.download = 'qr-code.png'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    };
    
    return(
        <div className="bg-white p-4 rounded-b-lg">
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-700">
                        Enter a URL to generate a scannable QR code for easy mobile access.
                    </p>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 px-1 mb-2">
                        URL
                    </label>
                    <input 
                        type="text" 
                        name="Url" 
                        value={Url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Paste URL here"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        required
                    />
                </div>
                <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition shadow-md hover:shadow-lg disabled:bg-gray-400">
                    {loading ? "Generating..." : "Generate QR Code"}
                </button>
            </form>
            
            {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            {QR && (
                <div className="mt-4 p-4 bg-green-100 rounded-lg text-center">
                    <p className="text-sm font-semibold text-gray-700 mb-4">QR Code:</p>
                    <img src={QR} alt="QR Code" className="mx-auto border rounded-lg mb-4" />
                    <button 
                        onClick={handleDownload}
                        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition">
                        <Download className="w-5 h-5" />
                        Download QR Code
                    </button>
                </div>
            )}
        </div>
    ); 
}