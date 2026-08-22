import { v2 as cloudinary } from "cloudinary";

// Fallback to NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME if CLOUDINARY_CLOUD_NAME isn't set
const cloudName =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
  process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

// Configure Cloudinary safely without crashing the module
if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
} else {
  console.warn(
    "⚠️ Warning: Cloudinary environment variables are missing in .env.local"
  );
}

export default cloudinary;