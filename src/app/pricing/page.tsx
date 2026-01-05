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

// Cross Icon Component
const CrossIcon = ({ className }: { className?: string }) => (
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
        d="M6 18L18 6M6 6l12 12"
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
        <div className="text-center mb-16">
          <h2 className="text-[#02D67D] font-bold tracking-wide uppercase text-sm mb-4">
            Pricing Plans
          </h2>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-(--text-color) mb-6">
            Simple, transparent pricing.
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            No hidden fees. No complicated tiers. Choose the plan that fits your workflow and start building today.
          </p>
        </div>

        {/* ----------------- TOGGLE SWITCH ----------------- */}
        <div className="flex justify-center mb-20">
          <div className="relative flex items-center bg-white/5 border border-white/10 rounded-full p-1 cursor-pointer w-72 h-14 backdrop-blur-sm">
            
            {/* The Moving Pill */}
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#02D67D] rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(2,214,125,0.3)] ${
                billingCycle === "monthly" ? "left-[calc(50%+2px)]" : "left-1"
              }`}
            />

            {/* Daily Button */}
            <button
              onClick={() => setBillingCycle("daily")}
              className={`relative z-10 w-1/2 text-base font-bold transition-colors duration-300 ${
                billingCycle === "daily" ? "text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              Daily Pass
            </button>

            {/* Monthly Button */}
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`relative z-10 w-1/2 text-base font-bold transition-colors duration-300 flex items-center justify-center gap-2 ${
                billingCycle === "monthly" ? "text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly
              {/* Savings Badge */}
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wider ${
                billingCycle === "monthly" ? "bg-black/20 text-black" : "bg-[#02D67D]/20 text-[#02D67D]"
              }`}>
                -66%
              </span>
            </button>
          </div>
        </div>

        {/* ----------------- PRICING CARDS ----------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-32">
          
          {/* CARD 1: FREE TIER */}
          <SpotlightCard className="p-8 md:p-10 bg-white/5 backdrop-blur-sm border border-neutral-800 rounded-3xl flex flex-col hover:border-neutral-600 transition-colors h-full">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white">Visitor</h3>
              <p className="text-gray-400 mt-2">
                Perfect for trying out our tools and quick tasks.
              </p>
            </div>
            
            <div className="mb-8">
              <span className="text-5xl font-bold text-white">₹0</span>
              <span className="text-gray-500 ml-2">/forever</span>
            </div>

            <button className="w-full py-4 px-6 rounded-xl border border-neutral-700 text-white font-bold hover:bg-white/10 transition-all mb-10">
              Start for Free
            </button>

            <div className="space-y-5 text-gray-300">
              <div className="flex items-center">
                <CheckIcon className="w-5 h-5 text-white mr-3 shrink-0" />
                <span>3 Image conversions / day</span>
              </div>
              <div className="flex items-center">
                <CheckIcon className="w-5 h-5 text-white mr-3 shrink-0" />
                <span>Standard processing speed</span>
              </div>
              <div className="flex items-center">
                <CheckIcon className="w-5 h-5 text-white mr-3 shrink-0" />
                <span>Basic QR Generator</span>
              </div>
              <div className="flex items-center text-gray-500">
                <CrossIcon className="w-5 h-5 mr-3 shrink-0" />
                <span>No PDF Tools</span>
              </div>
              <div className="flex items-center text-gray-500">
                <CrossIcon className="w-5 h-5 mr-3 shrink-0" />
                <span>Contains Ads</span>
              </div>
            </div>
          </SpotlightCard>

          {/* CARD 2: PRO TIER */}
          <SpotlightCard className="relative p-8 md:p-10 bg-linear-to-b from-white/10 to-white/5 backdrop-blur-md border border-[#02D67D]/50 rounded-3xl flex flex-col shadow-[0_0_40px_rgba(2,214,125,0.1)] h-full transform md:-translate-y-4">
            {/* Best Value Badge */}
            <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <span className="bg-[#02D67D] text-black text-xs font-bold px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
                    Most Popular
                </span>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white">Pro Access</h3>
              <p className="text-[#02D67D] mt-2 font-medium">
                {billingCycle === "daily" 
                    ? "Flexible access. Pay only when you need it." 
                    : "Unlock full potential. Cancel anytime."}
              </p>
            </div>
            
            <div className="mb-8 flex items-baseline">
              <span className="text-6xl font-bold text-white">
                ₹{billingCycle === "daily" ? "1" : "10"}
              </span>
              <span className="text-gray-400 ml-2 text-xl">
                /{billingCycle === "daily" ? "day" : "month"}
              </span>
            </div>

            <button className="w-full py-4 px-6 rounded-xl bg-[#02D67D] text-black font-bold hover:bg-[#02b86b] hover:scale-[1.02] transition-all mb-10 shadow-[0_0_20px_rgba(2,214,125,0.4)]">
              {billingCycle === "daily" ? "Get Daily Pass" : "Subscribe Now"}
            </button>

            <div className="space-y-5 text-white">
              <div className="flex items-center">
                <div className="bg-[#02D67D]/20 p-1 rounded-full mr-3">
                    <CheckIcon className="w-4 h-4 text-[#02D67D]" />
                </div>
                <span className="font-medium">Unlimited Image Conversions</span>
              </div>
              <div className="flex items-center">
                <div className="bg-[#02D67D]/20 p-1 rounded-full mr-3">
                    <CheckIcon className="w-4 h-4 text-[#02D67D]" />
                </div>
                <span className="font-medium">All PDF Tools Included</span>
              </div>
              <div className="flex items-center">
                <div className="bg-[#02D67D]/20 p-1 rounded-full mr-3">
                    <CheckIcon className="w-4 h-4 text-[#02D67D]" />
                </div>
                <span className="font-medium">Unlimited URL Shortener</span>
              </div>
              <div className="flex items-center">
                <div className="bg-[#02D67D]/20 p-1 rounded-full mr-3">
                    <CheckIcon className="w-4 h-4 text-[#02D67D]" />
                </div>
                <span className="font-medium">No Ads & Priority Processing</span>
              </div>
              <div className="flex items-center">
                <div className="bg-[#02D67D]/20 p-1 rounded-full mr-3">
                    <CheckIcon className="w-4 h-4 text-[#02D67D]" />
                </div>
                <span className="font-medium">Client-side Privacy Protection</span>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* ----------------- COMPARISON TABLE ----------------- */}
        <div className="max-w-5xl mx-auto mb-32">
            <h3 className="text-3xl font-bold text-center mb-12 text-(--text-color)">Compare Features</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="py-6 px-4 text-gray-400 font-medium w-1/2">Feature</th>
                            <th className="py-6 px-4 text-white font-bold text-center w-1/4">Visitor</th>
                            <th className="py-6 px-4 text-[#02D67D] font-bold text-center w-1/4">Pro Access</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-300">
                        {[
                            { name: "Image Conversions", free: "3 / day", pro: "Unlimited" },
                            { name: "PDF Tools", free: <CrossIcon className="w-5 h-5 mx-auto text-gray-600" />, pro: <CheckIcon className="w-5 h-5 mx-auto text-[#02D67D]" /> },
                            { name: "URL Shortener", free: "Basic", pro: "Advanced Analytics" },
                            { name: "QR Code Generator", free: "Standard", pro: "Custom Branding" },
                            { name: "Processing Speed", free: "Standard", pro: "Lightning Fast" },
                            { name: "Ad-Free Experience", free: <CrossIcon className="w-5 h-5 mx-auto text-gray-600" />, pro: <CheckIcon className="w-5 h-5 mx-auto text-[#02D67D]" /> },
                            { name: "Priority Support", free: <CrossIcon className="w-5 h-5 mx-auto text-gray-600" />, pro: <CheckIcon className="w-5 h-5 mx-auto text-[#02D67D]" /> },
                        ].map((row, i) => (
                            <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="py-5 px-4 font-medium">{row.name}</td>
                                <td className="py-5 px-4 text-center">{row.free}</td>
                                <td className="py-5 px-4 text-center font-semibold text-white">{row.pro}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* ----------------- FAQ SECTION ----------------- */}
        <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12 text-(--text-color)">Frequently Asked Questions</h3>
            <div className="grid gap-6">
                {[
                    { q: "How does the Daily Pass work?", a: "It's a one-time payment of ₹1. You get full access to all Pro features for 24 hours. It does not auto-renew. Perfect if you just have one urgent task." },
                    { q: "Can I cancel the Monthly Plan?", a: "Yes, you can cancel the ₹10/month subscription at any time from your dashboard. Your access will continue until the end of your billing month." },
                    { q: "Is my payment information secure?", a: "Absolutely. We use industry-standard encryption and trusted payment gateways to ensure your data is always safe." },
                    { q: "Do you offer refunds?", a: "Since we offer a low-cost daily pass for testing, we generally do not offer refunds for the monthly plan. However, if you have a technical issue, please contact support." }
                ].map((item, i) => (
                    <SpotlightCard key={i} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-[#02D67D]/30 transition-colors">
                        <h4 className="text-xl font-bold text-white mb-3">{item.q}</h4>
                        <p className="text-gray-400 leading-relaxed">
                            {item.a}
                        </p>
                    </SpotlightCard>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default PricingPage;
