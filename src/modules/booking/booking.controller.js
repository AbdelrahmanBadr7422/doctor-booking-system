import * as service from "./booking.service.js";

export const getSlots = async (req, res) => {
  const data = await service.getSlots(req.query.doctorId, req.query.date);
  res.json(data);
};

export const createBooking = async (data) => {
  const exists = await bookingRepo.findBooking({
    doctorId: data.doctorId,
    time: new Date(data.time),
    status: "confirmed",
  });

  if (exists) {
    throw new ApiError("Slot already booked", 400);
  }

  return bookingRepo.createBooking({
    ...data,
    status: "confirmed",
  });
};

export const cancelBooking = async (req, res) => {
  const data = await service.cancelBooking(req.params.id, req.user.id);
  res.json(data);
};

export const dashboard = async (req, res) => {
  const data = await service.doctorDashboard(req.params.id, req.query.date);
  res.json(data);
};