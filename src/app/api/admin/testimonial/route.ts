import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Feedback from "@/models/Feedback";

/**
 * GET
 * Fetch all testimonials (Admin)
 */
export async function GET() {
  try {
    await connectDB();

    const testimonials = await Feedback.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        message: "Testimonials fetched successfully.",
        data: testimonials,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "GET /api/admin/testimonial Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch testimonials.",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * POST
 * Create Testimonial (Admin)
 */
export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const name = body.name?.trim();
    const condition = body.condition?.trim();
    const review = body.review?.trim();
    const rating = Number(body.rating) || 5;
    const image = body.image;

    if (!name || !condition || !review) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name, condition and review are required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !image ||
      !image.url ||
      !image.publicId
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please upload an image.",
        },
        {
          status: 400,
        }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Rating must be between 1 and 5.",
        },
        {
          status: 400,
        }
      );
    }

    const testimonial = await Feedback.create({
      name,
      condition,
      review,
      image: {
        url: image.url,
        publicId: image.publicId,
      },
      rating,
      isPublished:
        body.isPublished ?? true,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Testimonial created successfully.",
        data: testimonial,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "POST /api/admin/testimonial Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create testimonial.",
      },
      {
        status: 500,
      }
    );
  }
}