const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      { protocol: "https", hostname: "orchidrepublic.com", pathname: "/**" },
    ],
  },
  api: {
    bodyParser: {
      sizeLimit: "20mb",
    },
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2000mb",
    },
  },
};

export default nextConfig;
