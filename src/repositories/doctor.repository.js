import { Doctor } from "../models/doctor.model.js";

export const createDoctor = (data) => {
  Doctor.create(data);
}

export const findDoctorById = (id) => {
  Doctor.findById(id);
}

export const findDoctors = (filter) => {
  Doctor.find(filter);
}
