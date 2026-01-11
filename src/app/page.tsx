"use client";

import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import Link from 'next/link';

const renderLandingToolPreview = (title: string) => {
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

  if (title === "Image Converter") {
    return wrap(
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
  }

  if (title === "URL Shortener") {
    return wrap(
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
  }

  if (title === "QR Code Generator") {
    return wrap(
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
              </g>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  if (title === "PDF Compressor") {
    return wrap(
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
  }

  if (title === "Image Resizer") {
    return wrap(
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
  }

  if (title === "Word ↔ PDF") {
    return wrap(
      <div className="h-full w-full flex flex-col">
        <div className="text-xs font-semibold text-white/90 mb-3">Word ↔ PDF</div>
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
  }

  return wrap(
    <div className="h-full w-full flex flex-col">
      <div className="text-xs font-semibold text-white/90 mb-3">{title}</div>
      <div className="flex-1 rounded-xl bg-black/50 border border-gray-700" />
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-start justify-start hover:cursor-default">
      <BackgroundRippleEffect rows={15} />
      <div className="mt-40 w-full">
        <h2 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-(--text-color) md:text-5xl lg:text-7xl">
          Welcome to the OmniTools
        </h2>
        <p className="relative z-10 mx-auto mt-4 max-w-xl text-center text-white md:text-sm lg:text-xl">
          Your all-in-one solution for productivity and convenience. Explore a suite of essential tools designed to streamline your workflow and enhance your efficiency.
        </p>

        {/* Features Section */}
        <div className="relative z-10 mt-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center text-(--text-color)">
            Our Powerful Tools
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Image Converter",
                description: "Convert images between various formats including JPG ↔ PNG ↔ WEBP with ease.",
              },
              {
                title: "URL Shortener",
                description: "Shorten long URLs into compact, shareable links with tracking and analytics features.",
              },
              {
                title: "QR Code Generator",
                description: "Generate QR codes for URLs, text, and other data with customizable designs and sizes.",
              },
              {
                title: "PDF Compressor",
                description: "Reduce the file size of your PDF documents without compromising quality for easier sharing.",
              },
              {
                title: "Image Resizer",
                description: "Resize images to specific dimensions or optimize them for web use quickly and efficiently.",
              },
              {
                title: "Word ↔ PDF",
                description: "Convert ",
              },
            ].map((feature, index) => (
              <SpotlightCard key={index} className="p-6 bg-white/5 backdrop-blur-sm border border-neutral-200 rounded-2xl hover:border-[#02D67D]/50 hover:cursor-default flex flex-col hover:scale-105 transform transition-transform duration-300">
                <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden group">
                    {renderLandingToolPreview(feature.title)}
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#02D67D]">{feature.title}</h3>
                <p className="text-white leading-relaxed">
                  {feature.description}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="relative z-10 mt-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-16 text-center text-(--text-color)">
                How It Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                    { step: "01", title: "Choose a Tool", desc: "Select from our wide range of productivity tools." },
                    { step: "02", title: "Upload or Input", desc: "Upload your file or paste your link/text." },
                    { step: "03", title: "Get Results", desc: "Download your converted file or copy your generated content." }
                ].map((item, i) => (
                    <div key={i} className="relative flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-[#02D67D]/10 flex items-center justify-center text-[#02D67D] font-bold text-2xl mb-6 border border-[#02D67D]/30">
                            {item.step}
                        </div>
                        <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                        <p className="text-gray-400">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Testimonials Section */}
          <div className="relative z-10 mt-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center text-(--text-color)">
                What Users Say
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                    { name: "Alex Johnson", role: "Freelancer", text: "OmniTools has saved me hours of work. The image converter is lightning fast!" },
                    { name: "Sarah Williams", role: "Marketing Manager", text: "The QR code generator is perfect for our campaigns. Highly recommended." }
                ].map((testimonial, i) => (
                    <div key={i} className="p-8 bg-white/5 rounded-2xl border border-white/10">
                        <p className="text-gray-300 italic mb-6">&quot;{testimonial.text}&quot;</p>
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#02D67D] to-blue-500 mr-4"></div>
                            <div>
                                <h5 className="text-white font-bold">{testimonial.name}</h5>
                                <span className="text-sm text-[#02D67D]">{testimonial.role}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* CTA Section */}
        <div className="relative z-10 mt-32 mb-20 text-center px-4">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-(--text-color)">
            Boost Your Productivity Today
          </h3>
          <p className="mb-8 text-white max-w-2xl mx-auto">
            Join thousands of developers who trust OmniTools for their daily tasks. Start using our premium tools for free.
          </p>
          <button className="px-8 py-4 bg-[#02D67D] text-black font-bold rounded-full hover:bg-[#02b86b] transition-all duration-200 transform hover:scale-105 shadow-lg shadow-[#02D67D]/20 hover:cursor-pointer">
            <Link href="/tools">Explore All Tools</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage
