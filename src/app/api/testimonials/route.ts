import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Feedback from "@/models/Feedback";

/**
 * GET
 * Fetch all published testimonials
 */
export async function GET() {
  try {
    await connectDB();

    const testimonials = await Feedback.find({
      isPublished: true,
    })
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
    console.error("GET /api/testimonials Error:", error);

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
