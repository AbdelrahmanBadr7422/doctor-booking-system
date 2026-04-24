import * as doctorRepo from "../../repositories/doctor.repository.js";
import * as userRepo from "../../repositories/user.repository.js";

export const createDoctor = async (userId, data) => {
  const user = await userRepo.findUserById(userId);

  if (!user || user.role !== "doctor") {
    throw new Error("Only doctors allowed");
  }

  return doctorRepo.createDoctor({ userId, ...data });
};

export const getDoctors = (filter) =>
  doctorRepo.findDoctors(filter);