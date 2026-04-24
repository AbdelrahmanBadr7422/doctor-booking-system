import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  specialization: String,
  workingDays: [String],
  workingHours: {
    start: String,
    end: String
  },
  breaks: [
    {
      start: String,
      end: String
    }
  ],
  offDates: [String],
  sessionDuration: Number,
});

export const Doctor = mongoose.model("Doctor", schema);