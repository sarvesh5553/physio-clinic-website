// import mongoose, { Schema, models, model } from "mongoose";

// const TestimonialSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     condition: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     review: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     rating: {
//       type: Number,
//       required: true,
//       default: 5,
//       min: 1,
//       max: 5,
//     },

//     image: {
//       url: {
//         type: String,
//       },

//       publicId: {
//         type: String,
//         required: true,
//       },
//     },

//     isPublished: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default models.Testimonial ||
//   model("Testimonial", TestimonialSchema);