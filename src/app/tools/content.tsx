"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';
import { SpotlightCard } from "@/components/ui/spotlight-card";

const ToolsContent = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const renderToolCardPreview = (tool: { link: string; title: string }) => {
    const wrap = (children: React.ReactNode) => (
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-t from-neutral-900 to-transparent z-10 opacity-60" />
        <div className="relative z-0 h-full w-full bg-black p-4">
          <div className="h-full w-full rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm p-4">
            {children}
          </div>
        </div>
      </div>
    );

    const qrPreview = (
      <div className="h-full w-full flex items-center gap-4">
        <div className="min-w-0 flex-1">
          <div className="text-xs font-semibold text-white/90 mb-2">QR Code Generator</div>
          <div className="h-8 w-full rounded-lg bg-black/50 border border-gray-700" />
          <div className="mt-3 h-2 w-2/3 rounded bg-white/10" />
          <div className="mt-2 h-2 w-1/2 rounded bg-white/10" />
          <div className="mt-4 h-9 w-32 rounded-lg bg-[#02D67D]" />
        </div>

        <div className="shrink-0">
          <div className="h-24 w-24 rounded-xl bg-white p-2 shadow-lg">
            <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
              <rect width="100" height="100" fill="#ffffff" />
              <g fill="#000000">
                <rect x="6" y="6" width="26" height="26" />
                <rect x="10" y="10" width="18" height="18" fill="#ffffff" />
                <rect x="14" y="14" width="10" height="10" />

                <rect x="68" y="6" width="26" height="26" />
                <rect x="72" y="10" width="18" height="18" fill="#ffffff" />
                <rect x="76" y="14" width="10" height="10" />

                <rect x="6" y="68" width="26" height="26" />
                <rect x="10" y="72" width="18" height="18" fill="#ffffff" />
                <rect x="14" y="76" width="10" height="10" />

                <rect x="40" y="8" width="8" height="8" />
                <rect x="52" y="10" width="6" height="6" />
                <rect x="44" y="22" width="10" height="10" />
                <rect x="40" y="40" width="6" height="6" />
                <rect x="50" y="40" width="8" height="8" />
                <rect x="62" y="38" width="6" height="6" />
                <rect x="38" y="52" width="12" height="6" />
                <rect x="56" y="52" width="6" height="12" />
                <rect x="70" y="52" width="8" height="8" />
                <rect x="46" y="66" width="6" height="6" />
                <rect x="58" y="70" width="10" height="10" />
                <rect x="74" y="70" width="6" height="6" />
                <rect x="40" y="80" width="8" height="8" />
                <rect x="52" y="82" width="6" height="6" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    );

    const imageConverterPreview = (
      <div className="h-full w-full flex flex-col">
        <div className="text-xs font-semibold text-white/90 mb-3">Image Converter</div>
        <div className="flex-1 flex items-center gap-3">
          <div className="flex-1 h-full rounded-xl bg-black/50 border border-gray-700 p-3">
            <div className="h-2 w-1/2 rounded bg-white/10" />
            <div className="mt-3 h-16 rounded-lg bg-white/5 border border-white/10" />
            <div className="mt-3 h-2 w-2/3 rounded bg-white/10" />
          </div>
          <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10" />
          <div className="flex-1 h-full rounded-xl bg-black/50 border border-gray-700 p-3">
            <div className="h-2 w-1/3 rounded bg-white/10" />
            <div className="mt-3 h-16 rounded-lg bg-white/5 border border-white/10" />
            <div className="mt-3 h-2 w-1/2 rounded bg-white/10" />
          </div>
        </div>
        <div className="mt-3 h-9 w-32 rounded-lg bg-[#02D67D]" />
      </div>
    );

    const urlShortenerPreview = (
      <div className="h-full w-full flex flex-col">
        <div className="text-xs font-semibold text-white/90 mb-3">URL Shortener</div>
        <div className="h-9 w-full rounded-lg bg-black/50 border border-gray-700" />
        <div className="mt-3 flex items-center gap-3">
          <div className="h-9 w-32 rounded-lg bg-[#02D67D]" />
          <div className="h-9 w-24 rounded-lg bg-white/10 border border-white/10" />
        </div>
        <div className="mt-4 rounded-xl bg-black/50 border border-gray-700 p-3">
          <div className="h-2 w-1/3 rounded bg-white/10" />
          <div className="mt-2 h-2 w-2/3 rounded bg-white/10" />
          <div className="mt-2 h-2 w-1/2 rounded bg-white/10" />
        </div>
      </div>
    );

    const pdfCompressorPreview = (
      <div className="h-full w-full flex flex-col">
        <div className="text-xs font-semibold text-white/90 mb-3">PDF Compressor</div>
        <div className="flex-1 rounded-xl bg-black/50 border border-gray-700 p-4 flex items-center gap-4">
          <div className="h-14 w-14 rounded-xl bg-white/10 border border-white/10" />
          <div className="min-w-0 flex-1">
            <div className="h-2 w-1/2 rounded bg-white/10" />
            <div className="mt-2 h-2 w-2/3 rounded bg-white/10" />
            <div className="mt-4 h-2 w-full rounded bg-white/10 overflow-hidden">
              <div className="h-full w-2/3 bg-[#02D67D]" />
            </div>
          </div>
        </div>
        <div className="mt-3 h-9 w-36 rounded-lg bg-[#02D67D]" />
      </div>
    );

    const imageResizerPreview = (
      <div className="h-full w-full flex flex-col">
        <div className="text-xs font-semibold text-white/90 mb-3">Image Resizer</div>
        <div className="flex-1 flex items-center gap-4">
          <div className="h-full w-28 rounded-xl bg-white/5 border border-white/10" />
          <div className="min-w-0 flex-1">
            <div className="grid grid-cols-2 gap-3">
              <div className="h-9 rounded-lg bg-black/50 border border-gray-700" />
              <div className="h-9 rounded-lg bg-black/50 border border-gray-700" />
            </div>
            <div className="mt-3 h-2 w-2/3 rounded bg-white/10" />
            <div className="mt-4 h-9 w-28 rounded-lg bg-[#02D67D]" />
          </div>
        </div>
      </div>
    );

    const wordToPdfPreview = (
      <div className="h-full w-full flex flex-col">
        <div className="text-xs font-semibold text-white/90 mb-3">Word to PDF</div>
        <div className="flex-1 rounded-xl bg-black/50 border border-gray-700 p-4 flex items-center justify-between">
          <div className="w-1/3 rounded-xl bg-white/5 border border-white/10 p-3">
            <div className="h-2 w-1/2 rounded bg-white/10" />
            <div className="mt-2 h-2 w-2/3 rounded bg-white/10" />
            <div className="mt-4 h-8 rounded bg-white/10" />
          </div>
          <div className="h-10 w-10 rounded-full bg-white/10 border border-white/10" />
          <div className="w-1/3 rounded-xl bg-white/5 border border-white/10 p-3">
            <div className="h-2 w-1/2 rounded bg-white/10" />
            <div className="mt-2 h-2 w-2/3 rounded bg-white/10" />
            <div className="mt-4 h-8 rounded bg-white/10" />
          </div>
        </div>
        <div className="mt-3 h-9 w-32 rounded-lg bg-[#02D67D]" />
      </div>
    );

    const pdfToWordPreview = (
      <div className="h-full w-full flex flex-col">
        <div className="text-xs font-semibold text-white/90 mb-3">PDF to Word</div>
        <div className="flex-1 rounded-xl bg-black/50 border border-gray-700 p-4 flex items-center justify-between">
          <div className="w-1/3 rounded-xl bg-white/5 border border-white/10 p-3">
            <div className="h-2 w-1/2 rounded bg-white/10" />
            <div className="mt-2 h-2 w-2/3 rounded bg-white/10" />
            <div className="mt-4 h-8 rounded bg-white/10" />
          </div>
          <div className="h-10 w-10 rounded-full bg-white/10 border border-white/10" />
          <div className="w-1/3 rounded-xl bg-white/5 border border-white/10 p-3">
            <div className="h-2 w-1/2 rounded bg-white/10" />
            <div className="mt-2 h-2 w-2/3 rounded bg-white/10" />
            <div className="mt-4 h-8 rounded bg-white/10" />
          </div>
        </div>
        <div className="mt-3 h-9 w-32 rounded-lg bg-[#02D67D]" />
      </div>
    );

    if (tool.link === "/tools/image-converter") return wrap(imageConverterPreview);
    if (tool.link === "/tools/url-shortener") return wrap(urlShortenerPreview);
    if (tool.link === "/tools/qr-generator") return wrap(qrPreview);
    if (tool.link === "/tools/pdf-compressor") return wrap(pdfCompressorPreview);
    if (tool.link === "/tools/image-resizer") return wrap(imageResizerPreview);
    if (tool.link === "/tools/word-to-pdf") return wrap(wordToPdfPreview);
    if (tool.link === "/tools/pdf-to-word") return wrap(pdfToWordPreview);

    return wrap(
      <div className="h-full w-full flex flex-col">
        <div className="text-xs font-semibold text-white/90 mb-3">{tool.title}</div>
        <div className="flex-1 rounded-xl bg-black/50 border border-gray-700" />
      </div>
    );
  };

  const tools = [
    {
      id: 1,
      title: "Image Converter",
      description: "Convert images between JPEG, PNG, WEBP, and more instantly in your browser.",
      link: "/tools/image-converter",
    },
    {
      id: 2,
      title: "URL Shortener",
      description: "Transform long, ugly links into short, shareable URLs. Track clicks and manage links.",
      link: "/tools/url-shortener",
    },
    {
      id: 3,
      title: "QR Code Generator",
      description: "Create custom QR codes for Wi-Fi, URLs, vCards, and more with your brand colors.",
      link: "/tools/qr-generator",
    },
    {
      id: 4,
      title: "PDF Compressor",
      description: "Reduce file size while maintaining quality. Perfect for email attachments.",
      link: "/tools/pdf-compressor",
    },
    {
      id: 5,
      title: "Image Resizer",
      description: "Resize images to specific dimensions or percentage without losing quality.",
      link: "/tools/image-resizer",
    },
    {
      id: 6,
      title: "Word to PDF",
      description: "Convert Microsoft Word documents (.docx) to professional PDF format securely.",
      link: "/tools/word-to-pdf",
    },
    {
      id: 7,
      title: "PDF to Word",
      description: "Extract text and formatting from PDFs into editable Word documents.",
      link: "/tools/pdf-to-word",
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
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text bg-linear-to-b from-white to-gray-500 mb-6 text-(--text-color)">
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
            <div className="absolute -inset-0.5 bg-linear-to-r from-[#02D67D] to-blue-600 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 -z-10"></div>
          </div>
        </div>

        {/* ----------------- TOOLS GRID ----------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTools.map((tool) => (
            <Link href={tool.link} key={tool.id} className="group">
              <SpotlightCard className="h-full bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden hover:border-[#02D67D]/50 transition-all duration-300 flex flex-col">
                
                {/* Image Container with Hover Zoom Effect */}
                <div className="relative w-full h-48 overflow-hidden">
                    {renderToolCardPreview(tool)}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col grow">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#02D67D] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed grow">
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
            <p className="text-gray-500 mt-2">We couldn&apos;t find any tools matching &quot;{searchQuery}&quot;.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ToolsContent;
