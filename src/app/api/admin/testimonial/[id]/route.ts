import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Feedback, { IFeedback } from "@/models/Feedback";
import cloudinary from "@/lib/cloudinary";

const VALID_RATINGS = [1, 2, 3, 4, 5];

/**
 * PATCH
 * Update Testimonial (Supports JSON & Multipart Form Data)
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

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

    let name: string | undefined;
    let condition: string | undefined;
    let review: string | undefined;
    let rating: number | undefined;
    let isPublished: boolean | undefined;
    let newImage = testimonial.image; // Keep existing image by default

    const contentType = request.headers.get("content-type") || "";

    // 1. HANDLE MULTIPART FORM DATA (If editing with file upload)
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      name = formData.get("name")?.toString().trim();
      condition = formData.get("condition")?.toString().trim();
      review = formData.get("review")?.toString().trim();
      
      const rawRating = formData.get("rating");
      rating = rawRating !== null ? Number(rawRating) : undefined;
      
      const rawPublished = formData.get("isPublished");
      if (rawPublished !== null) {
        isPublished = rawPublished === "true";
      }

      const imageFile = formData.get("image");

      // If a new image file is provided, upload it to Cloudinary
      if (imageFile && imageFile instanceof File && imageFile.size > 0) {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadResult = await new Promise<any>((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "physiocare/testimonials",
                resource_type: "image",
              },
              (error, result) => {
                if (error) return reject(error);
                resolve(result);
              }
            )
            .end(buffer);
        });

        newImage = {
          url: uploadResult.secure_url,
          publicId: uploadResult.public_id,
        };

        // Delete old image from Cloudinary if it exists and has a different publicId
        if (testimonial.image?.publicId && testimonial.image.publicId !== newImage.publicId) {
          await cloudinary.uploader.destroy(testimonial.image.publicId);
        }
      }
    } 
    // 2. HANDLE JSON PAYLOAD (Standard API updates)
    else {
      const body = await request.json();
      name = body.name?.trim();
      condition = body.condition?.trim();
      review = body.review?.trim();
      rating = body.rating !== undefined ? Number(body.rating) : undefined;
      isPublished = body.isPublished;

      if (body.image) {
        if (!body.image.url || !body.image.publicId) {
          return NextResponse.json(
            { success: false, message: "Invalid image data." },
            { status: 400 }
          );
        }
        newImage = {
          url: body.image.url,
          publicId: body.image.publicId,
        };

        if (testimonial.image?.publicId && testimonial.image.publicId !== newImage.publicId) {
          await cloudinary.uploader.destroy(testimonial.image.publicId);
        }
      }
    }

    // Validate rating if provided
    if (rating !== undefined && !VALID_RATINGS.includes(rating)) {
      return NextResponse.json(
        {
          success: false,
          message: "Rating must be between 1 and 5.",
        },
        { status: 400 }
      );
    }

    // Build update payload dynamically
    const updateData: Partial<IFeedback> = {};
    if (name !== undefined) updateData.name = name;
    if (condition !== undefined) updateData.condition = condition;
    if (review !== undefined) updateData.review = review;
    if (rating !== undefined) updateData.rating = rating;
    if (isPublished !== undefined) updateData.isPublished = isPublished;
    if (newImage !== undefined) updateData.image = newImage;

    Object.assign(testimonial, updateData);
    await testimonial.save();

    return NextResponse.json(
      {
        success: true,
        message: "Testimonial updated successfully.",
        data: testimonial,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /api/admin/testimonial/[id]", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update testimonial.",
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

    // Delete image from Cloudinary
    if (testimonial.image?.publicId) {
      await cloudinary.uploader.destroy(testimonial.image.publicId);
    }

    // Delete testimonial from database
    await testimonial.deleteOne();

    return NextResponse.json(
      {
        success: true,
        message: "Testimonial deleted successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/admin/testimonial/[id]", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete testimonial.",
      },
      { status: 500 }
    );
  }
}