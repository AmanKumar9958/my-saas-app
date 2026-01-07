import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import LoaderOverlay from "@/components/LoaderOverlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "OmniTools - %s",
    default: "OmniTools",
  },
  description: "The Swiss Army Knife of the Web",
  icons: {
    icon: "/logo.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased w-full min-h-screen bg-(--bg-color) text-white`}
          suppressHydrationWarning
        >
          <Navbar />
          <LoaderOverlay />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
