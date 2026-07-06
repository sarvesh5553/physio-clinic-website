import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "No file uploaded.",
        },
        {
          status: 400,
        }
      );
    }

    // Convert File -> Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "physiocare/testimonials",
            resource_type: "image",
          },
          (error, result) => {
            if (error) return reject(error);

            resolve(result);
          }
        )
        .end(buffer);
    });

    return NextResponse.json(
      {
        success: true,
        image: {
          url: uploadResult.secure_url,
          publicId: uploadResult.public_id,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Upload Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Image upload failed.",
      },
      {
        status: 500,
      }
    );
  }
}