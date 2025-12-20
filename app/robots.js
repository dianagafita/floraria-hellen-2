export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/checkout/", "/payment-success/"],
      },
    ],
    sitemap: "https://www.hellenproparty.ro/sitemap.xml",
  };
}

