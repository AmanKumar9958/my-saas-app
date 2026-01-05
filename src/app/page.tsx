"use client";

import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import Image from 'next/image';

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
                image: "https://plus.unsplash.com/premium_photo-1726079248086-ad6bec853f36?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2UlMjBjb252ZXJ0ZXIlMjB3ZWJzaXRlfGVufDB8fDB8fHww"
              },
              {
                title: "URL Shortener",
                description: "Shorten long URLs into compact, shareable links with tracking and analytics features.",
                image: "https://images.unsplash.com/photo-1749877217773-6c844c38c874?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fFVSTCUyMHNob3J0bmVyJTIwd2Vic2l0ZXxlbnwwfHwwfHx8MA%3D%3D"
              },
              {
                title: "QR Code Generator",
                description: "Generate QR codes for URLs, text, and other data with customizable designs and sizes.",
                image: "https://plus.unsplash.com/premium_photo-1669244777130-3f78aca168a7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fFVSTCUyMHNob3J0bmVyJTIwd2Vic2l0ZXxlbnwwfHwwfHx8MA%3D%3D"
              },
              {
                title: "PDF Compressor",
                description: "Reduce the file size of your PDF documents without compromising quality for easier sharing.",
                image: "https://plus.unsplash.com/premium_photo-1669244777130-3f78aca168a7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fFVSTCUyMHNob3J0bmVyJTIwd2Vic2l0ZXxlbnwwfHwwfHx8MA%3D%3D"
              },
              {
                title: "Image Resizer",
                description: "Resize images to specific dimensions or optimize them for web use quickly and efficiently.",
                image: "https://plus.unsplash.com/premium_photo-1669244777130-3f78aca168a7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fFVSTCUyMHNob3J0bmVyJTIwd2Vic2l0ZXxlbnwwfHwwfHx8MA%3D%3D"
              },
              {
                title: "Word ↔ PDF",
                description: "Convert ",
                image: "https://plus.unsplash.com/premium_photo-1669244777130-3f78aca168a7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fFVSTCUyMHNob3J0bmVyJTIwd2Vic2l0ZXxlbnwwfHwwfHx8MA%3D%3D"
              },
            ].map((feature, index) => (
              <SpotlightCard key={index} className="p-6 bg-white/5 backdrop-blur-sm border border-neutral-200 rounded-2xl hover:border-[#02D67D]/50 transition-colors duration-300 hover:cursor-default flex flex-col hover:scale-105 transform transition-transform duration-300">
                <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden group">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
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
                        <p className="text-gray-300 italic mb-6">"{testimonial.text}"</p>
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
            Explore All Tools
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage
