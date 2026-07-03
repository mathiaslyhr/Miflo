import type { MetadataRoute } from "next";

const BASE = "https://miflo.dk";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /components is an unlisted design reference — keep it out of search.
      disallow: "/components",
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
