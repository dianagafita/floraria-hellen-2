export default function sitemap() {
  const baseUrl = "https://www.hellenproparty.ro";

  // Static pages
  const staticPages = [
    "",
    "/buchete",
    "/aranjamente",
    "/evenimente",
    "/evenimente/nunta",
    "/evenimente/botez",
    "/ocazii-speciale",
    "/speciale/plante",
    "/speciale/flori-criogenate",
    "/speciale/funerare-bisericesti",
    "/about",
    "/contact",
    "/delivery",
    "/terms-and-conditions",
    "/confidentiality",
    "/cookies",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  return staticPages;
}

