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

  try {
    const publicId = `products/${productId}/${Date.now()}`;
    const uploadURL = cloudinary.utils.sign_request(
      {
        resource_type: "auto",
        public_id: publicId,
        type: "upload",
      },
      process.env.CLOUDINARY_API_SECRET
    );

    return NextResponse.json({ url: uploadURL });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate upload URL." },
      { status: 500 }
    );
  }
}
