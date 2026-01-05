"use client";

import React, { useState } from "react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { SpotlightCard } from "@/components/ui/spotlight-card";

// Checkmark Icon Component
const CheckIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
        />
    </svg>
);

type BillingCycle = "daily" | "monthly";

const PricingPage = () => {
    const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-start bg-black text-white selection:bg-[#02D67D] selection:text-black font-sans">
            <BackgroundRippleEffect rows={20} />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mt-32 md:mt-40 mb-24">
                
                {/* ----------------- HEADER ----------------- */}
                <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold  mb-6 text-(--text-color)">
                    Simple, transparent pricing.
                </h1>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                    No hidden fees. No complicated tiers. Choose the plan that fits your workflow.
                </p>
                </div>

                {/* ----------------- TOGGLE SWITCH ----------------- */}
                <div className="flex justify-center mb-16">
                <div className="relative flex items-center bg-white/5 border border-white/10 rounded-full p-1 cursor-pointer w-64 h-12">
                    
                    {/* The Moving Pill */}
                    <div
                    className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#02D67D] hover:cursor-pointer rounded-full transition-all duration-300 shadow-lg ${
                        billingCycle === "monthly" ? "left-[calc(50%+2px)]" : "left-1"
                    }`}
                    />

                    {/* Daily Button */}
                    <button
                    onClick={() => setBillingCycle("daily")}
                    className={`relative z-10 w-1/2 text-sm font-bold transition-colors duration-300 hover:cursor-pointer ${
                        billingCycle === "daily" ? "text-black" : "text-gray-400 hover:text-white"
                    }`}
                    >
                    Daily
                    </button>

                    {/* Monthly Button */}
                    <button
                    onClick={() => setBillingCycle("monthly")}
                    className={`relative z-10 w-1/2 text-sm font-bold transition-colors duration-300 flex items-center justify-center gap-2 hover:cursor-pointer ${
                        billingCycle === "monthly" ? "text-black" : "text-gray-400 hover:text-white"
                    }`}
                    >
                    Monthly
                    {/* Savings Badge */}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        billingCycle === "monthly" ? "bg-black/20 text-black" : "bg-[#02D67D]/20 text-[#02D67D]"
                    }`}>
                        -66%
                    </span>
                    </button>
                </div>
                </div>

                {/* ----------------- PRICING CARDS ----------------- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                
                {/* CARD 1: FREE TIER (Anchor Pricing) */}
                <SpotlightCard className="p-8 bg-neutral-900/50 border border-neutral-800 rounded-3xl flex flex-col hover:border-neutral-600 transition-colors">
                    <div className="mb-4">
                    <h3 className="text-xl font-medium text-gray-300">Visitor</h3>
                    <p className="text-sm text-gray-500 mt-2 h-10">
                        Good for testing the waters.
                    </p>
                    </div>
                    
                    <div className="mb-8">
                    <span className="text-4xl font-bold text-white">₹0</span>
                    </div>

                    <button className="w-full py-3 px-4 rounded-xl border border-neutral-700 text-white font-medium hover:bg-neutral-800 transition-all mb-8">
                    Start for Free
                    </button>

                    <div className="space-y-4 text-sm text-gray-400">
                    <div className="flex items-center">
                        <CheckIcon className="w-5 h-5 text-gray-500 mr-3" />
                        <span>3 Image conversions / day</span>
                    </div>
                    <div className="flex items-center">
                        <CheckIcon className="w-5 h-5 text-gray-500 mr-3" />
                        <span>Standard speed</span>
                    </div>
                    <div className="flex items-center">
                        <CheckIcon className="w-5 h-5 text-gray-500 mr-3" />
                        <span>Basic QR Generator</span>
                    </div>
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        <span>No PDF Tools</span>
                    </div>
                    </div>
                </SpotlightCard>

                {/* CARD 2: PRO TIER (Dynamic) */}
                <SpotlightCard className="relative p-8 bg-white/5 border border-[#02D67D]/30 rounded-3xl flex flex-col shadow-2xl shadow-[#02D67D]/10">
                    {/* Best Value Badge */}
                    {billingCycle === "monthly" && (
                        <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                            <span className="bg-[#02D67D] text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                BEST VALUE
                            </span>
                        </div>
                    )}

                    <div className="mb-4">
                    <h3 className="text-xl font-bold text-white">Pro Access</h3>
                    <p className="text-sm text-[#02D67D] mt-2 h-10">
                        {billingCycle === "daily" 
                            ? "Flexible. Pay only when you need it." 
                            : "Unlock everything. Cancel anytime."}
                    </p>
                    </div>
                    
                    <div className="mb-8 flex items-baseline">
                    <span className="text-5xl font-bold text-white">
                        ₹{billingCycle === "daily" ? "1" : "10"}
                    </span>
                    <span className="text-gray-400 ml-2">
                        /{billingCycle === "daily" ? "day" : "month"}
                    </span>
                    </div>

                    <button className="w-full py-3 px-4 rounded-xl bg-[#02D67D] text-black font-bold hover:bg-[#02b86b] hover:scale-[1.02] transition-all mb-8 shadow-[0_0_20px_rgba(2,214,125,0.3)]">
                    {billingCycle === "daily" ? "Get Daily Pass" : "Subscribe Now"}
                    </button>

                    <div className="space-y-4 text-sm text-gray-300">
                    <div className="flex items-center">
                        <CheckIcon className="w-5 h-5 text-[#02D67D] mr-3" />
                        <span className="font-medium text-white">Unlimited Image Conversions</span>
                    </div>
                    <div className="flex items-center">
                        <CheckIcon className="w-5 h-5 text-[#02D67D] mr-3" />
                        <span className="font-medium text-white">All PDF Tools Included</span>
                    </div>
                    <div className="flex items-center">
                        <CheckIcon className="w-5 h-5 text-[#02D67D] mr-3" />
                        <span>Unlimited URL Shortener</span>
                    </div>
                    <div className="flex items-center">
                        <CheckIcon className="w-5 h-5 text-[#02D67D] mr-3" />
                        <span>No Ads & Fast Processing</span>
                    </div>
                    <div className="flex items-center">
                        <CheckIcon className="w-5 h-5 text-[#02D67D] mr-3" />
                        <span>Client-side Privacy Protection</span>
                    </div>
                    </div>
                </SpotlightCard>
                </div>

                {/* ----------------- FAQ SECTION (To add length) ----------------- */}
                <div className="max-w-3xl mx-auto mt-32">
                    <h3 className="text-2xl font-bold text-center mb-10">Questions regarding payment?</h3>
                    <div className="space-y-6">
                        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                            <h4 className="font-bold text-white mb-2">How does the Daily Pass work?</h4>
                            <p className="text-gray-400 text-sm">
                                It's a one-time payment of ₹1. You get full access to all Pro features for 24 hours. It does not auto-renew. Perfect if you just have one urgent task.
                            </p>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                            <h4 className="font-bold text-white mb-2">Can I cancel the Monthly Plan?</h4>
                            <p className="text-gray-400 text-sm">
                                Yes, you can cancel the ₹10/month subscription at any time from your dashboard. Your access will continue until the end of your billing month.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PricingPage;