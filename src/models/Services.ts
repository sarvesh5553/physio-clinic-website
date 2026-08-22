import mongoose, { Document, Model, Schema } from "mongoose";

export interface IService extends Document {
  title: string;
  description: string;

  type: "condition" | "service";

  icon?: string;

  image: {
    url: string;
    publicId: string;
  };

  order: number;

  isPublished: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    type: {
      type: String,
      enum: ["condition", "service"],
      required: true,
    },

    icon: {
      type: String,
      default: "",
    },

    image: {
      url: {
        type: String,
        default: "",
      },

      publicId: {
        type: String,
        default: "",
      },
    },

    order: {
      type: Number,
      default: 0,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Service: Model<IService> =
  mongoose.models.Service ||
  mongoose.model<IService>("Service", ServiceSchema);

export default Service;