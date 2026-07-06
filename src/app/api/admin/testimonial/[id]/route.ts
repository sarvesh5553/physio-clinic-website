import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Feedback, { IFeedback } from "@/models/Feedback";
import cloudinary from "@/lib/cloudinary";

const VALID_RATINGS = [1, 2, 3, 4, 5];

/**
 * PATCH
 * Update Testimonial
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    // Validate image if provided
    if (
      body.image &&
      (!body.image.url || !body.image.publicId)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid image data.",
        },
        { status: 400 }
      );
    }

    const updateData: Partial<IFeedback> = {
      name: body.name?.trim(),
      condition: body.condition?.trim(),
      review: body.review?.trim(),
      image: body.image
        ? {
            url: body.image.url,
            publicId: body.image.publicId,
          }
        : undefined,
      rating:
        body.rating !== undefined
          ? Number(body.rating)
          : undefined,
      isPublished: body.isPublished,
    };

    // Remove undefined fields
    Object.keys(updateData).forEach((key) => {
      if (
        updateData[key as keyof typeof updateData] === undefined
      ) {
        delete updateData[key as keyof typeof updateData];
      }
    });

    // Validate rating
    if (
      updateData.rating !== undefined &&
      !VALID_RATINGS.includes(updateData.rating)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Rating must be between 1 and 5.",
        },
        { status: 400 }
      );
    }

    const testimonial = await Feedback.findById(id);

    if (!testimonial) {
      return NextResponse.json(
        {
          success: false,
          message: "Testimonial not found.",
        },
        { status: 404 }
      );
    }

    // Delete old image if a new one is uploaded
    if (
      updateData.image &&
      testimonial.image?.publicId &&
      testimonial.image.publicId !==
        updateData.image.publicId
    ) {
      await cloudinary.uploader.destroy(
        testimonial.image.publicId
      );
    }

    Object.assign(testimonial, updateData);

    await testimonial.save();

    return NextResponse.json(
      {
        success: true,
        message:
          "Testimonial updated successfully.",
        data: testimonial,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "PATCH /api/admin/testimonial/[id]",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update testimonial.",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE
 * Delete Testimonial
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const testimonial =
      await Feedback.findById(id);

    if (!testimonial) {
      return NextResponse.json(
        {
          success: false,
          message: "Testimonial not found.",
        },
        { status: 404 }
      );
    }

    // Delete image from Cloudinary
    if (testimonial.image?.publicId) {
      await cloudinary.uploader.destroy(
        testimonial.image.publicId
      );
    }

    // Delete testimonial
    await testimonial.deleteOne();

    return NextResponse.json(
      {
        success: true,
        message:
          "Testimonial deleted successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "DELETE /api/admin/testimonial/[id]",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete testimonial.",
      },
      { status: 500 }
    );
  }
}