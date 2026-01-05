import type { Metadata } from "next";
import ToolsContent from "./content";

export const metadata: Metadata = {
  title: "Tools",
};

export default function ToolsPage() {
  return <ToolsContent />;
}