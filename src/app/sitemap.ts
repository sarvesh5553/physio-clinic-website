import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    "https://www.drbhagyashrisphysio.com";

  return [
    {
      url: baseUrl,
      lastModified: "2026-08-26",
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}