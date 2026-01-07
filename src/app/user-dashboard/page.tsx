import type { Metadata } from "next";
import UserDashboardContent from "./content";

export const metadata: Metadata = {
  title: "User Dashboard - OmniTools",
};

export default function UserDashboardPage() {
  return <UserDashboardContent />;
}
