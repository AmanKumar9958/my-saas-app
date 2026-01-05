"use client";

import React, { useState } from "react";
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';
import { SpotlightCard } from "@/components/ui/spotlight-card";

const ContactPage = () => {
  // Simple state for form submission simulation
  const [formStatus, setFormStatus] = useState("idle"); // idle, submitting, success

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    // Simulate a network request
    setTimeout(() => {
      setFormStatus("success");
      // Reset after 3 seconds
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-start justify-start">
      <BackgroundRippleEffect rows={15} />
      
      <div className="mt-40 w-full px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10">
        {/* ----------------- SECTION 1: HERO ----------------- */}
        <div className="text-center mb-20">
          <h2 className="mx-auto max-w-4xl text-center text-2xl font-bold text-(--text-color) md:text-5xl lg:text-7xl">
            We’d love to hear from you.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-gray-300 md:text-sm lg:text-xl">
            Whether you have a question about our features, pricing, or need a
            custom feature, our team is ready to answer all your questions.
          </p>
        </div>

        {/* ----------------- SECTION 2: CONTACT CARDS ----------------- */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-24">
          {[
            {
              title: "Technical Support",
              description: "Get help with technical issues, bug reports, and troubleshooting.",
              email: "amancollege04@gmail.com"
            },
            {
              title: "Sales Inquiry",
              description: "Questions about pricing, plans, or need a custom solution?",
              email: "amancollege04@gmail.com"
            },
            {
              title: "Partnerships",
              description: "Interested in partnering with us? Let's explore opportunities.",
              email: "amancollege04@gmail.com"
            }
          ].map((card, index) => (
            <SpotlightCard key={index} className="p-6 bg-white/5 backdrop-blur-sm border border-neutral-200 rounded-2xl hover:border-[#02D67D]/50 transition-colors duration-300 hover:cursor-default flex flex-col">
              <h3 className="text-2xl font-bold mb-4 text-(--text-color)">{card.title}</h3>
              <p className="text-gray-300 grow">{card.description}</p>
              <a href={`mailto:${card.email}`} className="mt-6 text-[#02D67D] font-semibold hover:underline">
                {card.email}
              </a>
            </SpotlightCard>
          ))
          }
        </div>

        {/* ----------------- SECTION 3: THE FORM ----------------- */}
        <div className="bg-white/5 backdrop-blur-sm border border-neutral-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row mb-24">
          
          {/* Left Side: Info */}
          <div className="md:w-1/2 p-10 lg:p-16 flex flex-col justify-between bg-black/20">
            <div>
              <h3 className="text-3xl font-bold text-(--text-color) mb-4">Let's build something great</h3>
              <p className="text-gray-300 text-lg mb-8">
                We typically respond within 2 hours during business hours. Fill out the form and our team will get back to you.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center text-gray-300">
                  <svg className="w-6 h-6 mr-4 text-[#02D67D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  <span>contact@utilify.com</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <svg className="w-6 h-6 mr-4 text-[#02D67D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  <span>New Delhi, India</span>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <p className="text-white font-semibold mb-4">Connect with us</p>
              <div className="flex space-x-4">
                 {/* Social Placeholder Icons */}
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#02D67D] hover:text-black transition-colors cursor-pointer text-white">X</div>
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#02D67D] hover:text-black transition-colors cursor-pointer text-white">In</div>
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#02D67D] hover:text-black transition-colors cursor-pointer text-white">Fb</div>
              </div>
            </div>
          </div>

          {/* Right Side: Inputs */}
          <div className="md:w-1/2 p-10 lg:p-16">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
                <input required type="text" id="name" className="mt-1 block w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg shadow-sm focus:ring-[#02D67D] focus:border-[#02D67D] text-white placeholder-gray-500" placeholder="John Doe" />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
                <input required type="email" id="email" className="mt-1 block w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg shadow-sm focus:ring-[#02D67D] focus:border-[#02D67D] text-white placeholder-gray-500" placeholder="john@example.com" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                <textarea required id="message" rows={4} className="mt-1 block w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg shadow-sm focus:ring-[#02D67D] focus:border-[#02D67D] text-white placeholder-gray-500" placeholder="How can we help you today?"></textarea>
              </div>

              <button 
                type="submit" 
                disabled={formStatus === "submitting" || formStatus === "success"}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-black transition-all duration-200 transform hover:scale-105
                  ${formStatus === "success" ? "bg-green-600 hover:bg-green-700" : "bg-[#02D67D] hover:bg-[#02b86b]"}
                  ${formStatus === "submitting" ? "opacity-75 cursor-wait" : ""}`}
              >
                {formStatus === "idle" && "Send Message"}
                {formStatus === "submitting" && "Sending..."}
                {formStatus === "success" && "Message Sent!"}
              </button>
            </form>
          </div>
        </div>

        {/* ----------------- SECTION 4: FAQ ----------------- */}
        <div className="max-w-4xl mx-auto py-16">
          <h2 className="text-3xl font-bold text-(--text-color) text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-8">
            <div className="border-b border-gray-700 pb-8">
              <h3 className="text-lg font-medium text-[#02D67D]">How do I cancel my subscription?</h3>
              <p className="mt-2 text-base text-gray-300">
                You can cancel your ₹10 monthly subscription anytime from your dashboard settings. The access will remain until the billing cycle ends.
              </p>
            </div>

            <div className="border-b border-gray-700 pb-8">
              <h3 className="text-lg font-medium text-[#02D67D]">Are my files private?</h3>
              <p className="mt-2 text-base text-gray-300">
                Yes! All file processing for tools like Image Converter and PDF tools happens 100% in your browser. Your files are never uploaded to our servers.
              </p>
            </div>

            <div className="border-b border-gray-700 pb-8">
              <h3 className="text-lg font-medium text-[#02D67D]">Do you offer API access?</h3>
              <p className="mt-2 text-base text-gray-300">
                Currently, we focus on user-facing tools.
              </p>
            </div>

              <div className="pb-8">
              <h3 className="text-lg font-medium text-[#02D67D]">What payment methods do you accept?</h3>
              <p className="mt-2 text-base text-gray-300">
                We accept all major UPI apps (GPay, PhonePe, Paytm), Credit Cards, and Debit Cards via our secure payment partner Razorpay.
              </p>
            </div>
          </div>
        </div>

        {/* ----------------- SECTION 5: FOOTER MOCKUP ----------------- */}
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
};

export default ContactPage;
