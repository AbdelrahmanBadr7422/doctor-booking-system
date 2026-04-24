import * as bookingRepo from "../../repositories/booking.repository.js";
import * as doctorRepo from "../../repositories/doctor.repository.js";
import { generateSlots } from "../../utils/generateSlots.js";
import { ApiError } from "../../utils/ApiError.js";

export const getSlots = async (doctorId, date) => {
  const doctor = await doctorRepo.findDoctorById(doctorId);

  if (!doctor) {
    throw new ApiError("Doctor not found", 404);
  }

  const slots = generateSlots(doctor, date);

  const bookings = await bookingRepo.findBookings({
    doctorId,
    status: "confirmed",
  });

  const booked = bookings.map((b) => b.time.toISOString());

  return slots.filter((s) => !booked.includes(s.toISOString()));
};

export const createBooking = async (data) => {
  const time = new Date(data.time);

  const exists = await bookingRepo.findBooking({
    doctorId: data.doctorId,
    time: time,
    status: "confirmed",
  });

  if (exists) {
    throw new ApiError("Slot already booked", 400);
  }

  return bookingRepo.createBooking({
    ...data,
    time,
    status: "confirmed",
  });
};

export const confirmBooking = (id) =>
  bookingRepo.updateBooking(id, { status: "confirmed" });

export const cancelBooking = async (id, userId) => {
  const booking = await bookingRepo.findBooking({ _id: id });

  if (booking.patientId.toString() !== userId) {
    throw new ApiError("Unauthorized");
  }

  return bookingRepo.updateBooking(id, { status: "cancelled" });
};