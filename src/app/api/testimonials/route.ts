import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Feedback from "@/models/Feedback";

export async function GET() {
  try {
    await connectDB();

    const testimonials = await Feedback.find({
      isPublished: true,
    }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch testimonials",
      },
      { status: 500 }
    );
  }
}