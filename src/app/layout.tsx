import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { metadata as seoMetadata, jsonLd } from "./metadata";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { CursorTrail } from "@/components/cursor/CursorTrail";
import { NoiseOverlay } from "@/components/shared/NoiseOverlay";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = seoMetadata;

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background font-body text-primary antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function() {});
                });
              }
            `,
          }}
        />
        <MotionProvider>
          <ScrollProgress />
          <CustomCursor />
          <CursorTrail />
          <NoiseOverlay />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
