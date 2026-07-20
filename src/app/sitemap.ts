import type { MetadataRoute } from "next";

const BASE = "https://miflo.dk";

// Public, indexable routes only.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: BASE, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/faq`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/contact`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    // Off the nav, but kept indexable: the shipped app links here
    // (MifloApp `src/core/config.ts` → FEEDBACK_URL).
    { url: `${BASE}/feedback`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
