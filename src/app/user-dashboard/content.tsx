"use client";

import React from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect"; // Assuming you have this
import { SpotlightCard } from "@/components/ui/spotlight-card"; // Assuming you have this
import { 
  FaBolt, 
  FaFilePdf, 
  FaImage, 
  FaQrcode, 
  FaLink, 
  FaCrown 
} from "react-icons/fa6";
import Image from "next/image";

const UserDashboardContent = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-[#02D67D]">
        Loading your dashboard...
      </div>
    );
  }

  // Mock Data - In real app, fetch this from your MongoDB
  const stats = [
    { label: "Total Conversions", value: "12", icon: <FaBolt /> },
    { label: "Files Saved", value: "450MB", icon: <FaFilePdf /> },
    { label: "Current Plan", value: "Free Tier", icon: <FaCrown className="text-yellow-500" /> },
  ];

  const quickTools = [
    { title: "Image Converter", icon: <FaImage />, href: "/tools/image-converter", color: "text-blue-400" },
    { title: "URL Shortener", icon: <FaLink />, href: "/tools/url-shortener", color: "text-purple-400" },
    { title: "QR Generator", icon: <FaQrcode />, href: "/tools/qr-generator", color: "text-pink-400" },
    { title: "PDF Tools", icon: <FaFilePdf />, href: "/tools/pdf-tools", color: "text-red-400" },
  ];

  return (
    <div className="relative min-h-screen w-full bg-black text-white selection:bg-[#02D67D] selection:text-black font-sans overflow-hidden">
      
      {/* Background Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <BackgroundRippleEffect rows={15} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-20">
        
        {/* ----------------- 1. WELCOME HEADER ----------------- */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-6">
            {/* User Avatar with Glow */}
            <div className="relative">
                <div className="absolute -inset-1 bg-linear-to-r from-[#02D67D] to-blue-600 rounded-full blur opacity-50"></div>
                <Image
                    src={user?.imageUrl || "/logo.png"}
                    alt="Profile" 
                    width={80}
                    height={80}
                    sizes="80px"
                    className="relative w-20 h-20 rounded-full border-2 border-black object-cover"
                />
            </div>
            <div>
                <h1 className="text-3xl font-bold text-white">
                    Welcome back, <span className="text-[#02D67D]">{user?.firstName || "Creator"}</span>
                </h1>
                <p className="text-gray-400 mt-1">Here is what&apos;s happening with your account.</p>
            </div>
          </div>

          <div className="flex gap-4">
             <Link href="/pricing" className="px-6 py-2 bg-white/5 border border-white/10 hover:border-[#02D67D] text-white rounded-full font-medium transition-all">
                Manage Billing
             </Link>
             <button className="px-6 py-2 bg-[#02D67D] text-black font-bold rounded-full hover:bg-[#02b86b] transition-all shadow-[0_0_15px_rgba(2,214,125,0.4)]">
                Upgrade to Pro
             </button>
          </div>
        </div>

        {/* ----------------- 2. STATS GRID ----------------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, index) => (
                <SpotlightCard key={index} className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-2xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-xl text-[#02D67D] border border-white/10">
                        {stat.icon}
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                </SpotlightCard>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* ----------------- 3. QUICK TOOLS (Left Column) ----------------- */}
            <div className="lg:col-span-2 space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <FaBolt className="text-[#02D67D]" /> Quick Access
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {quickTools.map((tool, idx) => (
                        <Link href={tool.href} key={idx} className="group">
                             <div className="p-5 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:border-[#02D67D]/30 transition-all cursor-pointer flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`text-2xl ${tool.color}`}>{tool.icon}</div>
                                    <span className="font-medium text-gray-200 group-hover:text-white">{tool.title}</span>
                                </div>
                                <span className="text-gray-500 group-hover:translate-x-1 transition-transform">&rarr;</span>
                             </div>
                        </Link>
                    ))}
                </div>

                {/* Recent Activity Table (Mock) */}
                <div className="bg-neutral-900/30 border border-neutral-800 rounded-2xl p-6 mt-8">
                    <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-gray-400">
                                        <FaFilePdf />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">Invoice_Oct_2025.pdf</p>
                                        <p className="text-xs text-gray-500">Converted to Word • 2 mins ago</p>
                                    </div>
                                </div>
                                <span className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/20">Success</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ----------------- 4. SIDEBAR / PROMO (Right Column) ----------------- */}
            <div className="lg:col-span-1 space-y-6">
                
                {/* Upgrade Card */}
                <div className="relative p-6 rounded-2xl overflow-hidden border border-[#02D67D]/30 group">
                    <div className="absolute inset-0 bg-linear-to-br from-[#02D67D]/20 to-transparent opacity-50"></div>
                    
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-[#02D67D] text-black flex items-center justify-center rounded-xl mb-4 shadow-lg text-xl">
                            <FaCrown />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Unlock Pro Power</h3>
                        <p className="text-sm text-gray-300 mb-6">
                            Get unlimited conversions, priority processing, and 4K upscaling for just ₹10/month.
                        </p>
                        <button className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">
                            Upgrade Now
                        </button>
                    </div>
                </div>

                {/* Tip of the day */}
                <div className="p-6 bg-white/5 border border-white/5 rounded-2xl">
                    <h4 className="font-bold text-gray-200 mb-2">💡 Did you know?</h4>
                    <p className="text-sm text-gray-400">
                        You can drag and drop images directly onto the Image Converter tool to save time!
                    </p>
                </div>

            </div>

        </div>

      </div>
    </div>
  );
};

export default UserDashboardContent;