import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Appointment from "@/models/Appointment";

const VALID_STATUSES = [
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
] as const;

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    const { status } = body;

    // Validate status
    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid appointment status.",
        },
        { status: 400 }
      );
    }

    // Update appointment
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    // Appointment not found
    if (!appointment) {
      return NextResponse.json(
        {
          success: false,
          message: "Appointment not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Appointment status updated successfully.",
        data: appointment,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /api/appointments/[id] Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while updating the appointment.",
      },
      { status: 500 }
    );
  }
}