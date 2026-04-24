import * as doctorRepo from "../../repositories/doctor.repository.js";
import * as userRepo from "../../repositories/user.repository.js";

export const createDoctor = async (userId, data) => {
  const user = await userRepo.findUserById(userId);

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  if (user.role !== "doctor") {
    throw new ApiError("Only doctors allowed", 403);
  }

  return doctorRepo.createDoctor({
    userId,
    ...data,
  });
};

export const getDoctors = (filter) => {
  doctorRepo.findDoctors(filter);
}