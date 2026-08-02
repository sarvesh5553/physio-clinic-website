import mongoose, {
  Schema,
  Document,
  Model,
} from "mongoose";

export interface IFeedback extends Document {
  name: string;
  condition: string;
  review: string;
  image?: {
    url?: string;
    publicId?: string;
  };
  rating: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FeedbackSchema = new Schema<IFeedback>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    condition: {
      type: String,
      required: true,
      trim: true,
    },

    review: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: {
        url: {
          type: String,
          required: false,
        },
        publicId: {
          type: String,
          required: false,
        },
      },
      required: false,
      _id: false,
    },

    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
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

const Feedback: Model<IFeedback> =
  mongoose.models.Feedback ||
  mongoose.model<IFeedback>(
    "Feedback",
    FeedbackSchema
  );

export default Feedback;