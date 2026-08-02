import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Feedback from "@/models/Feedback";
import cloudinary from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

/**
 * GET
 * Fetch all testimonials (Admin)
 */
export async function GET() {
  try {
    await connectDB();

    const testimonials = await Feedback.find()
      .sort({ createdAt: -1, _id: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        message: "Testimonials fetched successfully.",
        data: testimonials,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("GET /api/admin/testimonial Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch testimonials.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * POST
 * Create Testimonial with FormData (Admin)
 */
export async function POST(request: Request) {
  try {
    // 1. SAFELY PARSE MULTIPART FORM DATA
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid form payload. Expected multipart form-data.",
        },
        { status: 400 }
      );
    }

    // 2. EXTRACT FIELDS FROM FORMDATA
    const name = formData.get("name")?.toString().trim();
    const condition = formData.get("condition")?.toString().trim();
    const review = formData.get("review")?.toString().trim();
    const rating = Number(formData.get("rating")) || 5;
    const isPublished = formData.get("isPublished") === "true";
    const imageFile = formData.get("image");

    // 3. VALIDATE REQUIRED FIELDS
    if (!name || !condition || !review) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, condition, and review are required.",
        },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        {
          success: false,
          message: "Rating must be between 1 and 5.",
        },
        { status: 400 }
      );
    }

    // 4. HANDLE CLOUDINARY UPLOAD IF IMAGE IS PROVIDED
    let imageData = null;
    if (imageFile && imageFile instanceof File && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

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

      imageData = {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      };
    }

    // 5. DATABASE CREATION DATA OBJECT
    await connectDB();

    const testimonialData: any = {
      name,
      condition,
      review,
      rating,
      isPublished,
    };

    if (imageData) {
      testimonialData.image = imageData;
    }

    const testimonial = await Feedback.create(testimonialData);

    return NextResponse.json(
      {
        success: true,
        message: "Testimonial created successfully.",
        data: testimonial,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/admin/testimonial Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create testimonial.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}