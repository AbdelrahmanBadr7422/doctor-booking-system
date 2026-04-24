import { Booking } from "../models/booking.model.js";

export const findBooking = (filter) => {
  return Booking.findOne(filter);
};

export const createBooking = (data) => {
  return Booking.create(data);
};

export const updateBooking = (id, data) => {
  return Booking.findByIdAndUpdate(id, data, { new: true });
};

export const findBookings = (filter) => {
  return Booking.find(filter);
};