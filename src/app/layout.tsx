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
  title: "Miflo — football games for you and your friends",
  description:
    "Football games for you and your friends. Free on iPhone, no sign-up.",
  openGraph: {
    title: "Miflo — football games for you and your friends",
    description:
      "Football games for you and your friends. Free on iPhone, no sign-up.",
    url: "https://miflo.dk",
    siteName: "Miflo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miflo — football games for you and your friends",
    description:
      "Football games for you and your friends. Free on iPhone, no sign-up.",
  },
};

// Matches the dark end of the gradient, so mobile browser chrome blends into
// the top of the page rather than banding against it.
export const viewport: Viewport = {
  themeColor: "#17123f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${satoshi.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <RootShell>{children}</RootShell>
      </body>
    </html>
  );
}
