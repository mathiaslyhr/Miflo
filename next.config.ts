import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Apple fetches this exact extensionless path for Universal Links
      // (miflo.dk/join/<code> → Miflo app). The App Router ignores dot-prefixed
      // folders, so the JSON lives at /aasa and is rewritten into place.
      {
        source: "/.well-known/apple-app-site-association",
        destination: "/aasa",
      },
    ];
  },
};

export default nextConfig;
