import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Appointment from "@/models/Appointment";

export async function GET() {
  try {
    await connectDB();

    const total = await Appointment.countDocuments();

    const pending = await Appointment.countDocuments({
      status: "Pending",
    });

    const completed = await Appointment.countDocuments({
      status: "Completed",
    });

    const cancelled = await Appointment.countDocuments({
      status: "Cancelled",
    });

    const success =
      total === 0
        ? 0
        : Math.round((completed / total) * 100);

    return NextResponse.json({
      success: true,
      data: {
        total,
        pending,
        completed,
        cancelled,
        success,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch dashboard statistics.",
      },
      { status: 500 }
    );
  }
}