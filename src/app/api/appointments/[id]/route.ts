import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Appointment from "@/models/Appointment";

const VALID_STATUSES = [
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
] as const;

// ── PATCH (Update Status) ──
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid appointment status." },
        { status: 400 }
      );
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return NextResponse.json(
        { success: false, message: "Appointment not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Appointment status updated successfully.",
      data: appointment,
    });
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong while updating." },
      { status: 500 }
    );
  }
}

// ── PUT (Full Update of Appointment Details) ──
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      {
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        address: body.address,
        concern: body.concern,
        status: body.status,
      },
      { new: true, runValidators: true }
    );

    if (!updatedAppointment) {
      return NextResponse.json(
        { success: false, message: "Appointment not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Appointment updated successfully.",
      data: updatedAppointment,
    });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong while updating." },
      { status: 500 }
    );
  }
}

// ── DELETE (Remove Appointment) ──
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const deletedAppointment = await Appointment.findByIdAndDelete(id);

    if (!deletedAppointment) {
      return NextResponse.json(
        { success: false, message: "Appointment not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Appointment deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong while deleting." },
      { status: 500 }
    );
  }
}