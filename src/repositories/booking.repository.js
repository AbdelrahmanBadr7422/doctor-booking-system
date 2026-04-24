import { Booking } from "../models/booking.model.js";

export const findBooking = (filter) => {
  Booking.findOne(filter);
}

export const createBooking = (data) => {
  Booking.create(data);
}

export const updateBooking = (id, data) => {
  Booking.findByIdAndUpdate(id, data, { new: true });
}

export const findBookings = (filter) => {
  Booking.find(filter);
}