/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { FaCloudUploadAlt, FaTrash, FaFileImage, FaArrowRight } from "react-icons/fa";
import { jsPDF } from "jspdf";

interface UploadedImage {
  file: File;
  preview: string;
  id: string;
}

const ImageToPdfContent = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages: UploadedImage[] = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9)
    }));
    setImages((prev) => [...prev, ...newImages]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true
  });

  const removeImage = (idToRemove: string) => {
    setImages((prev) => prev.filter((img) => img.id !== idToRemove));
  };

  // Helper: File ko Base64 string mein convert karne ke liye (High Quality ke liye zaroori)
  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Helper: Image dimensions load karne ke liye
  const loadImageDimensions = (url: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve({ width: img.width, height: img.height });
    });
  };

  const generatePdf = async () => {
    if (images.length === 0) return;
    setIsGenerating(true);

    try {
      const doc = new jsPDF();
      const pageWidth = 210;  // A4 Width in mm
      const pageHeight = 297; // A4 Height in mm
      const margin = 10;      // 10mm margin

      for (let i = 0; i < images.length; i++) {
        const imageItem = images[i];

        // 1. Get raw Base64 data (Highest Quality)
        const imgData = await readFileAsDataURL(imageItem.file);
        
        // 2. Get original dimensions to calculate aspect ratio
        const { width, height } = await loadImageDimensions(imgData);

        // 3. Determine Format (PNG keeps transparency/quality better)
        const format = imageItem.file.type === "image/png" ? "PNG" : "JPEG";

        // 4. Calculate Fit Dimensions (Maths to keep aspect ratio)
        const imgRatio = width / height;
        const availableWidth = pageWidth - (margin * 2);
        const availableHeight = pageHeight - (margin * 2);

        let finalWidth = availableWidth;
        let finalHeight = availableWidth / imgRatio;

        if (finalHeight > availableHeight) {
          finalHeight = availableHeight;
          finalWidth = finalHeight * imgRatio;
        }

        const xOffset = (pageWidth - finalWidth) / 2;
        const yOffset = margin;

        // 5. Add Image with 'NONE' or 'FAST' compression to prevent blurring
        // Syntax: imgData, format, x, y, width, height, alias, compression, rotation
        doc.addImage(imgData, format, xOffset, yOffset, finalWidth, finalHeight, undefined, 'FAST');

        if (i < images.length - 1) {
          doc.addPage();
        }
      }

      doc.save("high-quality-images.pdf");

    } catch (error) {
      console.error("PDF Generation failed:", error);
      alert("Failed. Try fewer images.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white selection:bg-[#02D67D] selection:text-black font-sans overflow-hidden">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
         <BackgroundRippleEffect rows={15} />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-20">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-(--text-color) mb-4">Image to PDF</h1>
          <p className="text-gray-400">Convert images to high-quality PDF without losing details.</p>
        </div>

        {/* MAIN AREA */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
            
            {/* UPLOAD AREA */}
            <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                    isDragActive ? "border-[#02D67D] bg-[#02D67D]/10" : "border-gray-700 hover:border-gray-500 hover:bg-white/5"
                }`}
            >
                <input {...getInputProps()} />
                <FaCloudUploadAlt className="text-4xl text-gray-400 mb-4" />
                <p className="text-lg font-bold text-gray-200">
                    {isDragActive ? "Drop images here..." : "Click to add Images"}
                </p>
                <p className="text-sm text-gray-500 mt-2">Supports JPG, PNG (High Quality)</p>
            </div>

            {/* PREVIEW & GENERATE */}
            {images.length > 0 && (
                <div className="mt-8 space-y-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-gray-300 font-bold">Selected Images ({images.length})</h3>
                        <button onClick={() => setImages([])} className="text-xs text-red-400 hover:text-red-300 underline">Clear All</button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {images.map((img, index) => (
                            <div key={img.id} className="relative group aspect-3/4 bg-black/50 border border-white/10 rounded-xl overflow-hidden">
                                <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full z-10">{index + 1}</div>
                                <button onClick={() => removeImage(img.id)} className="absolute top-2 right-2 bg-red-500/80 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10">
                                    <FaTrash size={12} />
                                </button>
                                {/* Standard img tag for preview */}
                                <img src={img.preview} alt="upload" className="w-full h-full object-cover" />
                            </div>
                        ))}
                        
                         <div {...getRootProps()} className="flex flex-col items-center justify-center bg-white/5 border border-white/10 border-dashed rounded-xl cursor-pointer hover:bg-white/10 transition aspect-3/4">
                             <input {...getInputProps()} />
                             <FaFileImage className="text-2xl text-gray-500 mb-2" />
                             <span className="text-xs text-gray-400">Add More</span>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/10 mt-6">
                        <button 
                            onClick={generatePdf}
                            disabled={isGenerating}
                            className="w-full py-4 bg-[#02D67D] hover:bg-[#02b86b] disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold text-lg rounded-xl transition-all shadow-[0_0_20px_rgba(2,214,125,0.4)] flex items-center justify-center gap-3"
                        >
                            {isGenerating ? "Processing High Quality..." : (
                                <>Generate HD PDF <FaArrowRight /></>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ImageToPdfContent;