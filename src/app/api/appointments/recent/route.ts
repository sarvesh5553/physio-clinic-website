import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Appointment from "@/models/Appointment";

export async function GET() {
  try {
    await connectDB();

    const last24Hours = new Date();
    last24Hours.setHours(last24Hours.getHours() - 24);

    const appointments = await Appointment.find({
      createdAt: {
        $gte: last24Hours,
      },
    }).sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch recent appointments",
      },
      { status: 500 }
    );
  }
}