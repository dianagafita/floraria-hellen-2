const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "orchidrepublic.com"],
  },
  api: {
    bodyParser: {
      sizeLimit: "20mb",
    },
  },
};

export default nextConfig;
