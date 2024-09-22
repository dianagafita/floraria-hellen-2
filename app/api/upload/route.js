import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const { productId } = await req.json();

  // Ensure you authenticate the request here
  // Implement your authentication logic

  try {
    const url = await generatePresignedUrl(productId);
    return NextResponse.json({ url });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate upload URL." },
      { status: 500 }
    );
  }
}

async function generatePresignedUrl(productId) {
  // You might need to create a unique public ID for the file
  const publicId = `products/${productId}/${Date.now()}`;

  // Generate a signed URL for uploading
  return cloudinary.uploader.upload_stream({
    resource_type: "auto",
    public_id: publicId,
    eager: [{ width: 300, height: 300, crop: "fill" }],
  });
}
