import type { Metadata } from "next";
import ContactContent from "./content";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return <ContactContent />;
}
