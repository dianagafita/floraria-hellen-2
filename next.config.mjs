const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "orchidrepublic.com"],
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
