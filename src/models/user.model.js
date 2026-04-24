import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  role: {
    type: String,
    enum: ["patient", "doctor"]
  },
});

export const User = mongoose.model("User", schema);