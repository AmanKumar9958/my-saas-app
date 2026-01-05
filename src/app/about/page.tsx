"use client";

import React from "react";
import Image from "next/image";
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';
import { SpotlightCard } from "@/components/ui/spotlight-card";

const AboutPage = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-start justify-start">
      {/* Background Effect */}
      <BackgroundRippleEffect rows={15} />
      
      <div className="mt-40 w-full px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10">
        
        {/* ----------------- SECTION 1: HERO ----------------- */}
        <div className="text-center mb-20">
          <h2 className="mx-auto max-w-4xl text-center text-2xl font-bold text-(--text-color) md:text-5xl lg:text-7xl">
            Building the <span className="text-[#02D67D]">Swiss Army Knife</span> of the Web.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-gray-300 md:text-sm lg:text-xl">
            We believe that essential digital tools shouldn't cost a fortune. 
            One subscription, endless utilities, zero clutter.
          </p>
        </div>

        {/* ----------------- SECTION 2: OUR VALUES (Grid) ----------------- */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 mb-24">
          {[
            {
              title: "Privacy First",
              description: "We don't snoop. Our Image and PDF tools run entirely in your browser using Client-Side technology. Your files never leave your device.",
              icon: (
                <svg className="w-8 h-8 text-[#02D67D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              )
            },
            {
              title: "Unbeatable Value",
              description: "Why pay ₹500 for a PDF editor and ₹800 for an image upscaler? We bundle everything for the price of a cup of tea (₹10/mo).",
              icon: (
                <svg className="w-8 h-8 text-[#02D67D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              )
            },
            {
              title: "Community Driven",
              description: "We build what you need. Our roadmap is dictated by user requests, not corporate agendas. Have an idea? We build it.",
              icon: (
                <svg className="w-8 h-8 text-[#02D67D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              )
            }
          ].map((card, index) => (
            <SpotlightCard key={index} className="p-8 bg-white/5 backdrop-blur-sm border border-neutral-200 rounded-3xl hover:border-[#02D67D]/50 transition-colors duration-300 flex flex-col items-start">
              <div className="bg-white/10 p-3 rounded-full mb-6">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-(--text-color)">{card.title}</h3>
              <p className="text-gray-400 leading-relaxed">{card.description}</p>
            </SpotlightCard>
          ))}
        </div>

        {/* ----------------- SECTION 3: THE STORY (Layout matches Contact Form) ----------------- */}
        <div className="bg-white/5 backdrop-blur-sm border border-neutral-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row mb-24">
          
          {/* Left Side: Text */}
          <div className="md:w-1/2 p-10 lg:p-16 flex flex-col justify-center bg-black/20">
            <h3 className="text-3xl font-bold text-(--text-color) mb-6">Our Story</h3>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              It started with a simple frustration: I needed to convert a HEIC image to JPG. Every website I visited was either covered in ads, required a signup, or asked for $10/month just for one file.
            </p>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              I realized the web was broken. Simple utilities should be accessible to everyone.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              So, I decided to build <span className="text-[#02D67D] font-bold">OmniTools</span>. A suite of high-quality tools for developers, creators, and students, all under one roof, for less than the price of a samosa.
            </p>
          </div>

          {/* Right Side: Visual/Stats */}
          <div className="md:w-1/2 p-10 lg:p-16 bg-white/5 flex flex-col items-center justify-center border-l border-neutral-800">
             {/* You can replace this with a real image of you coding or a dashboard screenshot */}
             <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-gray-700 bg-black shadow-2xl mb-8 group">
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 text-gray-500">
                   {/* Placeholder for Image */}
                    <Image
                      src="https://ai-saas-template-aceternity.vercel.app/_next/image?url=%2Fheader.png&w=3840&q=75"
                      alt="Coding or Dashboard Screenshot"
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                    />
                </div>
             </div>

             <div className="grid grid-cols-2 gap-6 w-full">
                <div className="text-center">
                   <p className="text-4xl font-bold text-[#02D67D]">500+</p>
                   <p className="text-gray-400 text-sm mt-1">Files Processed</p>
                </div>
                <div className="text-center">
                   <p className="text-4xl font-bold text-[#02D67D]">100%</p>
                   <p className="text-gray-400 text-sm mt-1">Uptime</p>
                </div>
             </div>
          </div>
        </div>

        {/* ----------------- SECTION 4: THE TECH STACK ----------------- */}
        <div className="max-w-4xl mx-auto text-center mb-24">
            <h3 className="text-2xl font-bold text-(--text-color) mb-8">Built with Modern Tech</h3>
            <div className="flex flex-wrap justify-center gap-4">
                {["Next.js 14", "React", "TypeScript", "Tailwind CSS", "MongoDB", "Razorpay"].map((tech) => (
                    <span key={tech} className="px-6 py-2 rounded-full border border-gray-700 bg-white/5 text-gray-300 text-sm font-medium hover:border-[#02D67D] transition-colors cursor-default">
                        {tech}
                    </span>
                ))}
            </div>
        </div>

        {/* ----------------- SECTION 5: FOOTER ----------------- */}
        <div className="border-t border-gray-800 py-12">
          <div className="text-center">
              <p className="text-base text-gray-500">
                  &copy; {new Date().getFullYear()} OmniTools Inc. All rights reserved.
              </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AboutPage;