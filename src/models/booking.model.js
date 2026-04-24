import mongoose from "mongoose";

const schema = new mongoose.Schema({
  patientId: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  doctorId: {
    type: mongoose.Types.ObjectId,
    ref: "Doctor"
  },
  time: Date,
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
});

schema.index({ doctorId: 1, time: 1 }, { unique: true });

export const Booking = mongoose.model("Booking", schema);