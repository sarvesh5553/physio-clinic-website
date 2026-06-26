import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAppointment extends Document {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  concern: string;

  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";

  appointmentDate?: Date;
  appointmentTime?: string;

  adminNotes?: string;

  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    concern: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },

    appointmentDate: {
      type: Date,
      default: null,
    },

    appointmentTime: {
      type: String,
      default: "",
    },

    adminNotes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment: Model<IAppointment> =
  mongoose.models.Appointment ||
  mongoose.model<IAppointment>("Appointment", AppointmentSchema);

export default Appointment;