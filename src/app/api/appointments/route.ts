import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Appointment from "@/models/Appointment";

/**
 * GET
 * Fetch all appointments
 */
export async function GET() {
  try {
    await connectDB();

    const appointments = await Appointment.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(
      {
        success: true,
        data: appointments,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ GET /api/appointments Error:");
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to fetch appointments",
        error:
          process.env.NODE_ENV === "development"
            ? error?.stack
            : undefined,
      },
      { status: 500 }
    );
  }
}

/**
 * POST
 * Create new appointment
 */
export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    if (
      !body.fullName ||
      !body.email ||
      !body.phone ||
      !body.address ||
      !body.concern
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    const appointment = await Appointment.create({
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      address: body.address,
      concern: body.concern,
      status: "Pending",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Appointment created successfully",
        data: appointment,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ POST /api/appointments Error:");
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to create appointment",
        error:
          process.env.NODE_ENV === "development"
            ? error?.stack
            : undefined,
      },
      { status: 500 }
    );
  }
}