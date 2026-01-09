import { Metadata } from "next";
import QRCodeContent from "./content";

export const metadata: Metadata = {
  title: "QR Code Generator",
};

export default function QRCodePage() {
  return <QRCodeContent />;
}