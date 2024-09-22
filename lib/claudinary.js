// import { v2 as cloudinary } from "cloudinary";

// if (!process.env.CLOUDINARY_CLOUD_NAME) {
//   throw new Error("CLOUDINARY_CLOUD_NAME is not set");
// }

// if (!process.env.CLOUDINARY_API_KEY) {
//   throw new Error("CLOUDINARY_API_KEY is not set");
// }

// if (!process.env.CLOUDINARY_API_SECRET) {
//   throw new Error("CLOUDINARY_API_SECRET is not set");
// }

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export async function uploadImages(images, flowerType, type) {
//   const urls = [];
//   for (const image of images) {
//     const imageData = await image.arrayBuffer();
//     const mime = image.type;
//     const encoding = "base64";
//     const base64Data = Buffer.from(imageData).toString("base64");
//     const fileUri = `data:${mime};${encoding},${base64Data}`;

//     const result = await cloudinary.uploader.upload(fileUri, {
//       folder: `floraria_hellen/${
//         type === "event" ? "evenimente" : "flori"
//       }/${flowerType}`,
//     });

//     urls.push(result.secure_url);
//   }
//   return urls;
// }

// export async function deleteImages(imageUrls) {
//   const publicIds = imageUrls.map((url) => {
//     const parts = url.split("/");
//     const fileName = parts[parts.length - 1].split(".")[0]; // Extract the file name without the extension
//     return fileName;
//   });

//   try {
//     await cloudinary.api.delete_resources(publicIds);
//   } catch (error) {
//     throw new Error("Failed to delete images from Cloudinary.");
//   }
// }
import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImages(images, flowerType, type) {
  const urls = [];

  for (const image of images) {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: `floraria_hellen/${
            type === "event" ? "evenimente" : "flori"
          }/${flowerType}`,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      // Convert the file to a stream
      image.stream().pipe(uploadStream);
    });

    urls.push(result.secure_url);
  }

  return urls;
}
