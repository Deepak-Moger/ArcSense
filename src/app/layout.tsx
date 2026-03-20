import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-secondary",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ArcSense — AI-Native News Experience",
  description: "Business news reimagined with 5 AI-powered features. Personalized newsrooms, interactive briefings, AI video studio, story arc tracking, and vernacular translation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full font-sans text-foreground" suppressHydrationWarning>
        <Navbar />
        <div className="flex pt-[4.5rem]">
          <Sidebar />
          <main className="flex-1 lg:ml-64 min-h-[calc(100vh-4.5rem)]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
