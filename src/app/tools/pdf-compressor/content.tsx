"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { FaCloudUploadAlt, FaFilePdf, FaDownload, FaTrash, FaCompressArrowsAlt } from "react-icons/fa";
import { jsPDF } from "jspdf";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist/legacy/build/pdf";

const PdfCompressorContent = () => {
    const [file, setFile] = useState<File | null>(null);
    const [targetSize, setTargetSize] = useState(500); // Default 500 KB
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0); // 0 to 100
    const [compressedPdf, setCompressedPdf] = useState<Blob | null>(null);
    const [originalSize, setOriginalSize] = useState(0);

    // Initialize PDF.js worker from CDN (Critical for Next.js)
    useEffect(() => {
        const configureWorker = async () => {
            try {
                const workerModule: { default?: string } = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
                const workerSrc = workerModule.default ?? "";
                if (workerSrc) {
                    GlobalWorkerOptions.workerSrc = workerSrc;
                } else {
                    throw new Error("Missing worker asset URL");
                }
            } catch (err) {
                console.error("Failed to configure PDF.js worker", err);
            }
        };

        configureWorker();
    }, []);

    // 1. Handle File Drop
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const selected = acceptedFiles[0];
        if (selected) {
        if (selected.type !== "application/pdf") {
            alert("Please upload a PDF file.");
            return;
        }
        setFile(selected);
        setOriginalSize(selected.size / 1024); // KB
        setCompressedPdf(null); // Reset previous result
        // Smart default: Aim for 50% of original size initially
        setTargetSize(Math.floor((selected.size / 1024) * 0.5));
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': [] },
        multiple: false
    });

    // 2. The Compression Engine
    const compressPdf = async () => {
        if (!file) return;
        setIsProcessing(true);
        setProgress(0);

        try {
        // A. Read the PDF
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await getDocument({ data: arrayBuffer }).promise;
        const totalPages = pdf.numPages;

        // B. Create new PDF generator
        const newPdf = new jsPDF();
        
        // Calculate Quality Ratio (Simple heuristic)
        // If we want 500KB from 1000KB, ratio is 0.5.
        // We clamp quality between 0.1 (max compress) and 0.9 (light compress)
        let qualityRatio = targetSize / originalSize;
        if (qualityRatio > 1) qualityRatio = 0.9;
        if (qualityRatio < 0.1) qualityRatio = 0.1;

        // C. Process each page
        for (let i = 1; i <= totalPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 1.5 }); // 1.5 scale for decent readability
            
            // Render page to canvas
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            if (!context) {
                throw new Error("Canvas context unavailable");
            }
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await page.render({
                canvas: canvas,
                canvasContext: context,
                viewport: viewport,
            }).promise;

            // Compress: Convert canvas to JPEG with calculated quality
            const imgData = canvas.toDataURL("image/jpeg", qualityRatio);

            // Add to new PDF
            if (i > 1) newPdf.addPage();
            
            // Calculate dimensions to fit A4 or keep original ratio
            const pdfWidth = newPdf.internal.pageSize.getWidth();
            const pdfHeight = (viewport.height * pdfWidth) / viewport.width;

            newPdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

            // Update Progress bar
            setProgress(Math.round((i / totalPages) * 100));
        }

        // D. Finish
        const generatedBlob = newPdf.output("blob");
        setCompressedPdf(generatedBlob);
        
        } catch (error) {
        console.error("Compression failed:", error);
        alert("Something went wrong. The PDF might be password protected or too complex.\n\nDetails: " + (error instanceof Error ? error.message : "Unknown error"));
        } finally {
        setIsProcessing(false);
        }
    };

    const downloadFile = () => {
        if (compressedPdf && file) {
        const url = URL.createObjectURL(compressedPdf);
        const link = document.createElement("a");
        link.href = url;
        link.download = `compressed-${file.name}`;
        link.click();
        }
    };

    const reset = () => {
        setFile(null);
        setCompressedPdf(null);
        setProgress(0);
    };

    return (
        <div className="relative min-h-screen w-full bg-black text-white selection:bg-[#02D67D] selection:text-black font-sans overflow-hidden">
        
        {/* Background Effect */}
        <div className="fixed inset-0 z-0 pointer-events-none">
            <BackgroundRippleEffect rows={25} />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 pt-32 pb-20">
            
            {/* HEADER */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-(--text-color) mb-4">PDF Size Reducer</h1>
                <p className="text-gray-400">Reduce PDF file size securely. Select your target size below.</p>
            </div>

            {/* MAIN CARD */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
                
                {/* 1. UPLOAD AREA */}
                {!file && (
                    <div 
                        {...getRootProps()} 
                        className={`border-2 border-dashed rounded-2xl h-64 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                            isDragActive ? "border-[#02D67D] bg-[#02D67D]/10" : "border-gray-700 hover:border-gray-500 hover:bg-white/5"
                        }`}
                    >
                        <input {...getInputProps()} />
                        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4 text-gray-400">
                            <FaCloudUploadAlt className="text-3xl" />
                        </div>
                        <p className="text-lg font-bold text-gray-200">
                            Drop PDF here to compress
                        </p>
                        <p className="text-sm text-gray-500 mt-2">Max 50MB</p>
                    </div>
                )}

                {/* 2. COMPRESSOR UI */}
                {file && (
                    <div className="space-y-8">
                        
                        {/* File Info */}
                        <div className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-red-500/20 text-red-500 rounded-lg flex items-center justify-center text-2xl">
                                    <FaFilePdf />
                                </div>
                                <div>
                                    <p className="font-bold text-white truncate max-w-50">{file.name}</p>
                                    <p className="text-sm text-gray-400">Original: {originalSize.toFixed(0)} KB</p>
                                </div>
                            </div>
                            <button onClick={reset} className="text-gray-500 hover:text-white transition">
                                <FaTrash />
                            </button>
                        </div>

                        {/* Compression Controls (Only if not done yet) */}
                        {!compressedPdf && !isProcessing && (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-bold text-[#02D67D] uppercase tracking-wider">
                                        Target Size (Approx)
                                    </label>
                                    <span className="text-white font-mono bg-white/10 px-2 py-1 rounded">
                                        {targetSize} KB
                                    </span>
                                </div>
                                
                                <input 
                                    type="range" 
                                    min="50" 
                                    max={originalSize} 
                                    step="10"
                                    value={targetSize}
                                    onChange={(e) => setTargetSize(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#02D67D]"
                                />
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>High Compression (Low Quality)</span>
                                    <span>Low Compression (High Quality)</span>
                                </div>

                                <button 
                                    onClick={compressPdf}
                                    className="w-full py-4 mt-4 bg-[#02D67D] hover:bg-[#02b86b] text-black font-bold text-lg rounded-xl transition-all shadow-[0_0_20px_rgba(2,214,125,0.4)] flex items-center justify-center gap-3 hover:cursor-pointer"
                                >
                                    <FaCompressArrowsAlt /> Compress PDF
                                </button>
                            </div>
                        )}

                        {/* Progress Bar */}
                        {isProcessing && (
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-gray-300">
                                    <span>Processing Pages...</span>
                                    <span>{progress}%</span>
                                </div>
                                <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
                                    <div 
                                        className="bg-[#02D67D] h-2.5 rounded-full transition-all duration-300" 
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        {/* Success / Download Area */}
                        {compressedPdf && (
                            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 text-center animate-in fade-in zoom-in duration-300">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4 shadow-lg text-black text-2xl">
                                    <FaDownload />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Compression Complete!</h3>
                                <p className="text-gray-300 mb-6">
                                    New Size: <span className="text-[#02D67D] font-mono">{(compressedPdf.size / 1024).toFixed(0)} KB</span>
                                    <span className="text-gray-500 text-sm ml-2">
                                        (Saved {((originalSize - (compressedPdf.size / 1024)) / originalSize * 100).toFixed(0)}%)
                                    </span>
                                </p>
                                
                                <button 
                                    onClick={downloadFile}
                                    className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
                                >
                                    Download Compressed PDF
                                </button>
                                <button 
                                    onClick={() => { setCompressedPdf(null); setProgress(0); }}
                                    className="mt-4 text-sm text-gray-500 hover:text-white underline"
                                >
                                    Compress Another File
                                </button>
                            </div>
                        )}

                    </div>
                )}
            </div>
        </div>
        </div>
    );
};

export default PdfCompressorContent;