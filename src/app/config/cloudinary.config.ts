import { v2 as cloudinary } from "cloudinary";
import config from ".";
import { AppError } from "../errors/AppError";

cloudinary.config({
  cloud_name: config.CLUDINARY_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

export const deleteImageFromCloudinary = async (url: string) => {
  try {
    const regex = /\/v\d+\/(.*?)\.(jpg|jpeg|png|gif|webp)$/i;
    const match = url.match(regex);
    if (match && match[1]) {
      const public_id = match[1];
      await cloudinary.uploader.destroy(public_id);
      console.log(`Image Delete Done!!!`);
    }
  } catch (err) {
    throw new AppError(401, "Image Delete Failed !!!");
  }
};

export const cloudinaryUpload = cloudinary;
