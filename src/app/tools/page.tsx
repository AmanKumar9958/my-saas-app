"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';
import { SpotlightCard } from "@/components/ui/spotlight-card";

const AllToolsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const tools = [
    {
      id: 1,
      title: "Image Converter",
      description: "Convert images between JPG, PNG, WEBP, and more instantly in your browser.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80", // Abstract digital layers
      link: "/tools/image-converter",
      category: "Image",
    },
    {
      id: 2,
      title: "URL Shortener",
      description: "Transform long, ugly links into short, shareable URLs. Track clicks and manage links.",
      image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&w=800&q=80", // Network/Link abstract
      link: "/tools/url-shortener",
      category: "Utility",
    },
    {
      id: 3,
      title: "QR Code Generator",
      description: "Create custom QR codes for Wi-Fi, URLs, vCards, and more with your brand colors.",
      image: "https://images.unsplash.com/photo-1595079676339-1534801fafde?auto=format&fit=crop&w=800&q=80", // Scanning QR Code
      link: "/tools/qr-generator",
      category: "Utility",
    },
    {
      id: 4,
      title: "PDF Compressor",
      description: "Reduce file size while maintaining quality. Perfect for email attachments.",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80", // Stacks of paper/files
      link: "/tools/pdf-compressor",
      category: "PDF",
    },
    {
      id: 5,
      title: "Image Resizer",
      description: "Resize images to specific dimensions or percentage without losing quality.",
      image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80", // Design software UI
      link: "/tools/image-resizer",
      category: "Image",
    },
    {
      id: 6,
      title: "Word to PDF",
      description: "Convert Microsoft Word documents (.docx) to professional PDF format securely.",
      image: "https://images.unsplash.com/photo-1512314889357-e15a8c384c27?auto=format&fit=crop&w=800&q=80", // Laptop and notebook
      link: "/tools/word-to-pdf",
      category: "PDF",
    },
    {
      id: 7,
      title: "PDF to Word",
      description: "Extract text and formatting from PDFs into editable Word documents.",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80", // Writing/Paperwork
      link: "/tools/pdf-to-word",
      category: "PDF",
    },
  ];

  // Filter tools based on search
  const filteredTools = tools.filter((tool) =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative flex min-h-screen w-full flex-col items-start justify-start bg-black text-white selection:bg-[#02D67D] selection:text-black">
      <BackgroundRippleEffect rows={20} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mt-32 md:mt-40 mb-24">
        
        {/* ----------------- HEADER SECTION ----------------- */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-6 text-(--text-color)">
            All the tools you need. <br />
            <span className="text-white">One Subscription.</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
            Stop paying for 10 different subscriptions. Access our entire suite of premium utilities for just ₹10/month.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for a tool..."
              className="block w-full pl-10 pr-3 py-3 border border-neutral-800 rounded-full leading-5 bg-white/5 text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:ring-1 focus:ring-[#02D67D] focus:border-[#02D67D] sm:text-sm transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* Glow effect on search focus/hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#02D67D] to-blue-600 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 -z-10"></div>
          </div>
        </div>

        {/* ----------------- TOOLS GRID ----------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTools.map((tool) => (
            <Link href={tool.link} key={tool.id} className="group">
              <SpotlightCard className="h-full bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden hover:border-[#02D67D]/50 transition-all duration-300 flex flex-col">
                
                {/* Image Container with Hover Zoom Effect */}
                <div className="relative w-full h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent z-10 opacity-60" />
                  <Image
                    src={tool.image}
                    alt={tool.title}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium text-[#02D67D]">
                    {tool.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#02D67D] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                    {tool.description}
                  </p>
                  
                  <div className="mt-6 flex items-center text-sm font-medium text-white group-hover:translate-x-1 transition-transform">
                    Try now 
                    <svg className="w-4 h-4 ml-2 text-[#02D67D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </SpotlightCard>
            </Link>
          ))}
        </div>

        {/* ----------------- EMPTY STATE ----------------- */}
        {filteredTools.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block p-4 rounded-full bg-white/5 mb-4">
              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white">No tools found</h3>
            <p className="text-gray-500 mt-2">We couldn't find any tools matching "{searchQuery}".</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default AllToolsPage;