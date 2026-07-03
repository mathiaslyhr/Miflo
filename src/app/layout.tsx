import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { RootShell } from "@/components/RootShell";

const satoshi = localFont({
  src: [
    { path: "../fonts/Satoshi-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/Satoshi-Medium.otf", weight: "500", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://miflo.dk"),
  title: "Miflo — football games to play with your mates",
  description:
    "Miflo is a fast multiplayer football party game for iOS. Join a room with a code and play Football Quiz, Odd One Out, and Missing XI together. No sign-up.",
  openGraph: {
    title: "Miflo — football games to play with your mates",
    description:
      "Fast multiplayer football games for iOS. Join with a code and play together.",
    url: "https://miflo.dk",
    siteName: "Miflo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miflo — football games to play with your mates",
    description:
      "Fast multiplayer football games for iOS. Join with a code and play together.",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f2fc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${satoshi.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white">
        <RootShell>{children}</RootShell>
      </body>
    </html>
  );
}
