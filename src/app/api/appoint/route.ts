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
    } catch (error) {
      console.error(error);

      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch appointments",
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
    } catch (error) {
      console.error(error);

      return NextResponse.json(
        {
          success: false,
          message: "Failed to create appointment",
        },
        { status: 500 }
      );
    }
  }