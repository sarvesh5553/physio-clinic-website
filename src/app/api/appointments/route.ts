import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import { sendAppointmentNotificationEmail } from "@/helper/sendVerificationEmail";

// Forces Next.js App Router to execute live DB queries and skip static caching
export const dynamic = "force-dynamic";

/**
 * GET
 * Fetch all appointments
 */
export async function GET() {
  try {
    await connectDB();

    const appointments = await Appointment.find()
      .sort({ createdAt: -1, _id: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        data: appointments,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
        },
      }
    );
  } catch (error: any) {
    console.error("❌ GET /api/appointments Error:", error);

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
 * Create new appointment & Send Resend Notification to Hospital Owner
 */
export async function POST(request: Request) {
  try {
    await connectDB();

    // 1. Safe JSON parsing
    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid JSON request payload.",
        },
        { status: 400 }
      );
    }

    // 2. Validate required fields
    if (
      !body.fullName?.trim() ||
      !body.email?.trim() ||
      !body.phone?.trim() ||
      !body.address?.trim() ||
      !body.concern?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 }
      );
    }

    // 3. Save Appointment to Database
    const appointment = await Appointment.create({
      fullName: body.fullName.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      address: body.address.trim(),
      concern: body.concern.trim(),
      status: "Pending",
    });

    // 4. Send Email Notification via Resend
    // Wrapped in a separate try/catch so an email error won't roll back the DB entry
    try {
      // Formats the current date and time cleanly if not explicitly passed in body
      const bookingDate = body.appointmentDate || new Date().toLocaleDateString("en-US", {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      
      const bookingTime = body.appointmentTime || new Date().toLocaleTimeString("en-US", {
        hour: '2-digit',
        minute: '2-digit'
      });

      await sendAppointmentNotificationEmail({
        patientName: appointment.fullName,
        patientEmail: appointment.email,
        patientPhone: appointment.phone,
        appointmentDate: bookingDate,
        appointmentTime: bookingTime,
        serviceOrCondition: appointment.concern,
        notes: `Address: ${appointment.address}`,
      });
    } catch (emailErr) {
      console.error("⚠️ Email sending failed, but appointment was created:", emailErr);
    }

    // 5. Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Appointment created successfully.",
        data: appointment,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ POST /api/appointments Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to create appointment.",
        error:
          process.env.NODE_ENV === "development"
            ? error?.stack
            : undefined,
      },
      { status: 500 }
    );
  }
}