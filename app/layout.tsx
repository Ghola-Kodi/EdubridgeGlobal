import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "EdBridge Global Limited | Education Consultancy",
  description: "Expert education consultancy – curriculum training, school placement, career guidance, university placement abroad.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
