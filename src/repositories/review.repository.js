import { Review } from "../models/review.model.js";

export const createReview = (data) => {
  Review.create(data);
}

export const findReviewsByDoctor = (doctorId) => {
  Review.find({ doctorId });
}