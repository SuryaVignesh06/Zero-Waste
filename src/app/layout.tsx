import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zero-Waste — Food Rescue & Affordable Groceries",
  description:
    "AI-powered food rescue and affordable grocery ecosystem. Connect surplus food with people who need it.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#f5f1ed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased`}
        style={{
          background: "#f5f1ed",
          color: "#1a1a1a",
          fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
          margin: 0,
          padding: 0,
          height: "100%",
          overflow: "hidden",
        }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
