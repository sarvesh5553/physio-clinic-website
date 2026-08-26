import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/admin-login/",
        "/api/",
      ],
    },

    sitemap:
      "https://www.drbhagyashrisphysio.com/sitemap.xml",
  };
}