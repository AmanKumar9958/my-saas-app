"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { FaCloudUploadAlt, FaImage, FaDownload, FaTrash } from "react-icons/fa";
import { saveAs } from "file-saver"; // Standard library for saving files
import Image from "next/image";

const ImageConverterContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [format, setFormat] = useState("image/png");
  const [quality, setQuality] = useState(0.9); // 0 to 1
  const [isConverting, setIsConverting] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 1. Handle File Drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selected = acceptedFiles[0];
    if (selected) {
      setFile(selected);
      // Create preview URL
      const objectUrl = URL.createObjectURL(selected);
      setPreview(objectUrl);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] }, // Accept all images
    multiple: false
  });

  // 2. Conversion Logic
  const handleConvert = () => {
    if (!file || !preview) return;
    setIsConverting(true);

    const img = document.createElement("img");
    img.src = preview;

    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        setIsConverting(false);
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setIsConverting(false);
        return;
      }

      // Match dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Fix for Transparent Backgrounds (JPG turns transparent pixels black by default)
      if (format === "image/jpeg") {
        ctx.fillStyle = "#FFFFFF"; // Fill white
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw image
      ctx.drawImage(img, 0, 0);

      // Convert
      canvas.toBlob((blob) => {
        // Generate filename (e.g., "my-image.png")
        const fileName = file.name.split('.')[0];
        const extension = format.split('/')[1];
        
        if (blob) {
          saveAs(blob, `${fileName}-converted.${extension}`);
        }
        setIsConverting(false);
      }, format, quality);
    };

    img.onerror = () => {
      setIsConverting(false);
    };
  };

  const reset = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white selection:bg-[#02D67D] selection:text-black font-sans overflow-hidden">
      
      {/* Background Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <BackgroundRippleEffect rows={25} />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-20">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-[#02D67D]/10 text-[#02D67D] border border-[#02D67D]/20">
            <FaImage className="text-3xl" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Image Converter</h1>
          <p className="text-gray-400">Convert JPEG, PNG, WEBP, and more securely in your browser.</p>
        </div>

        {/* MAIN TOOL AREA */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
            
            {/* 1. UPLOAD AREA (If no file selected) */}
            {!file && (
                <div 
                    {...getRootProps()} 
                    className={`border-2 border-dashed rounded-2xl h-80 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                        isDragActive ? "border-[#02D67D] bg-[#02D67D]/10" : "border-gray-700 hover:border-gray-500 hover:bg-white/5"
                    }`}
                >
                    <input {...getInputProps()} />
                    <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-6 text-gray-400">
                        <FaCloudUploadAlt className="text-4xl" />
                    </div>
                    <p className="text-xl font-bold text-gray-200">
                        {isDragActive ? "Drop image here..." : "Click or Drag image here"}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">Supports JPEG, PNG, WEBP, GIF</p>
                </div>
            )}

            {/* 2. CONVERT AREA (If file selected) */}
            {file && preview && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Preview Column */}
                    <div className="relative bg-black/40 rounded-2xl p-4 border border-white/10 flex items-center justify-center">
                      <div className="relative w-full h-80">
                        {preview && (
                          <Image
                            src={preview}
                            alt="Preview"
                            fill
                            unoptimized
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-contain rounded-lg"
                          />
                        )}
                      </div>
                        <button 
                            onClick={reset}
                            className="absolute top-4 right-4 p-2 bg-red-500/80 text-white rounded-lg hover:bg-red-600 transition"
                            title="Remove Image"
                        >
                            <FaTrash />
                        </button>
                    </div>

                    {/* Settings Column */}
                    <div className="flex flex-col justify-center space-y-8">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">{file.name}</h3>
                            <p className="text-sm text-gray-400">{(file.size / 1024).toFixed(2)} KB</p>
                        </div>

                        {/* Format Selection */}
                        <div>
                            <label className="text-sm text-[#02D67D] font-bold uppercase tracking-wider mb-3 block">
                                Convert To
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {["image/png", "image/jpeg", "image/webp"].map((fmt) => (
                                    <button
                                        key={fmt}
                                        onClick={() => setFormat(fmt)}
                                        className={`py-3 rounded-xl border font-medium transition-all ${
                                            format === fmt 
                                            ? "bg-[#02D67D] text-black border-[#02D67D]" 
                                            : "bg-transparent text-gray-400 border-gray-700 hover:border-gray-500"
                                        }`}
                                    >
                                        {fmt.split('/')[1].toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quality Slider (Only for JPG/WEBP) */}
                        {format !== "image/png" && (
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm text-gray-400 uppercase font-semibold">Quality</label>
                                    <span className="text-[#02D67D]">{Math.round(quality * 100)}%</span>
                                </div>
                                <input 
                                    type="range" min="0.1" max="1" step="0.1" 
                                    value={quality}
                                    onChange={(e) => setQuality(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#02D67D]"
                                />
                            </div>
                        )}

                        {/* Convert Button */}
                        <button 
                            onClick={handleConvert}
                            disabled={isConverting}
                            className="w-full py-4 bg-[#02D67D] hover:bg-[#02b86b] disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold text-lg rounded-xl transition-all shadow-[0_0_20px_rgba(2,214,125,0.4)] flex items-center justify-center gap-3 hover:cursor-pointer"
                        >
                            {isConverting ? "Converting..." : <><FaDownload /> Download Converted Image</>}
                        </button>
                    </div>
                </div>
            )}
        </div>

        {/* Hidden Canvas for Processing */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default ImageConverterContent;