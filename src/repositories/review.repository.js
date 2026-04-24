import { Review } from "../models/review.model.js";

export const createReview = (data) => {
  return Review.create(data);
};

export const findReviewsByDoctor = (doctorId) => {
  return Review.find({ doctorId });
};