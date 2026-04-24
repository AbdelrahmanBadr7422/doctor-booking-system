import mongoose from "mongoose";

const schema = new mongoose.Schema({
  action: String,
  userId: mongoose.Types.ObjectId,
  metadata: Object,
});

export const Audit = mongoose.model("Audit", schema);