"use client";

import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { FaDownload, FaQrcode, FaPalette, FaLink } from "react-icons/fa6";
import { Link } from "lucide-react";

const QRCodeContent = () => {
  const [text, setText] = useState("https://utilify.com");
  const [fgColor, setFgColor] = useState("#000000"); // Foreground (Pixels)
  const [bgColor, setBgColor] = useState("#ffffff"); // Background
  const [size, setSize] = useState(256); // Size in pixels
  const qrRef = useRef(null);

  // Download Function
  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const url = canvas.toDataURL("image/png");
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `qrcode-${Date.now()}.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white selection:bg-[#02D67D] selection:text-black font-sans overflow-hidden">
      
      {/* Background Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <BackgroundRippleEffect rows={25} />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-20">
        
        {/* ----------------- HEADER ----------------- */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-(--text-color) mb-4">
            QR Code Generator
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Create permanent, high-quality QR codes for your links, Wi-Fi, or business cards. 
            Customize colors and download instantly.
          </p>
        </div>

        {/* ----------------- MAIN TOOL AREA ----------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            
            {/* LEFT COLUMN: CONFIGURATION */}
            <div className="lg:col-span-7 space-y-8">
                
                {/* 1. Input Section */}
                <div className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <FaLink className="text-[#02D67D]" /> Content
                    </h3>
                    <div className="space-y-4">
                        <label className="text-sm text-gray-400 uppercase tracking-wider font-semibold">
                            Website URL or Text
                        </label>
                        <input 
                            type="text" 
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="https://yourwebsite.com"
                            className="w-full bg-black/50 border border-gray-700 text-white p-4 rounded-xl focus:outline-none focus:border-[#02D67D] focus:ring-1 focus:ring-[#02D67D] transition-all placeholder-gray-600"
                        />
                    </div>
                </div>

                {/* 2. Customization Section */}
                <div className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <FaPalette className="text-[#02D67D]" /> Customization
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Foreground Color */}
                        <div>
                            <label className="block text-sm text-gray-400 uppercase tracking-wider font-semibold mb-3">
                                Pixel Color
                            </label>
                            <div className="flex items-center gap-3 bg-black/50 p-2 rounded-xl border border-gray-700">
                                <input 
                                    type="color" 
                                    value={fgColor}
                                    onChange={(e) => setFgColor(e.target.value)}
                                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-none"
                                />
                                <span className="text-gray-300 font-mono">{fgColor}</span>
                            </div>
                        </div>

                        {/* Background Color */}
                        <div>
                            <label className="block text-sm text-gray-400 uppercase tracking-wider font-semibold mb-3">
                                Background Color
                            </label>
                            <div className="flex items-center gap-3 bg-black/50 p-2 rounded-xl border border-gray-700">
                                <input 
                                    type="color" 
                                    value={bgColor}
                                    onChange={(e) => setBgColor(e.target.value)}
                                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-none"
                                />
                                <span className="text-gray-300 font-mono">{bgColor}</span>
                            </div>
                        </div>
                    </div>

                    {/* Size Slider */}
                    <div className="mt-8">
                         <div className="flex justify-between mb-3">
                            <label className="text-sm text-gray-400 uppercase tracking-wider font-semibold">
                                Size (Resolution)
                            </label>
                            <span className="text-[#02D67D] font-mono">{size}px</span>
                         </div>
                         <input 
                            type="range" 
                            min="128" 
                            max="1024" 
                            step="32"
                            value={size} 
                            onChange={(e) => setSize(Number(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#02D67D]"
                         />
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: PREVIEW & DOWNLOAD */}
            <div className="lg:col-span-5">
                <div className="sticky top-24">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md flex flex-col items-center text-center shadow-2xl">
                        <h3 className="text-gray-300 font-medium mb-6">Live Preview</h3>
                        
                        {/* The QR Code Container */}
                        <div 
                            ref={qrRef}
                            className="p-6 bg-white rounded-2xl shadow-lg mb-8 transition-transform duration-300 hover:scale-105"
                            style={{ backgroundColor: bgColor }} // Ensure container matches bg
                        >
                            <QRCodeCanvas
                                value={text || "https://utilify.com"}
                                size={250}
                                bgColor={bgColor}
                                fgColor={fgColor}
                                level={"H"} // High Error Correction
                                includeMargin={false}
                            />
                        </div>

                        <button 
                            onClick={downloadQRCode}
                            className="w-full py-4 bg-[#02D67D] hover:bg-[#02b86b] text-black font-bold text-lg rounded-xl transition-all shadow-[0_0_20px_rgba(2,214,125,0.4)] flex items-center justify-center gap-3 transform active:scale-95"
                        >
                            <FaDownload /> Download PNG
                        </button>
                        
                        <p className="mt-4 text-xs text-gray-500">
                            Generated locally in your browser. <br/>Your data is private.
                        </p>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  );
};

export default QRCodeContent;