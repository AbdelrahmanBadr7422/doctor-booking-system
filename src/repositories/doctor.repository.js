import { Doctor } from "../models/doctor.model.js";

export const createDoctor = (data) => {
  return Doctor.create(data);
};

export const findDoctorById = (id) => {
  return Doctor.findById(id);
};

export const findDoctors = (filter = {}) => {
  return Doctor.find(filter);
};