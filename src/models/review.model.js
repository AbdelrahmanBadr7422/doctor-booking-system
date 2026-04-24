import mongoose from "mongoose";

const schema = new mongoose.Schema({
  doctorId: mongoose.Types.ObjectId,
  patientId: mongoose.Types.ObjectId,
  rating: Number,
  comment: String,
});

export const Review = mongoose.model("Review", schema);