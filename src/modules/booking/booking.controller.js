import * as service from "./booking.service.js";

export const getSlots = async (req, res) => {
  const data = await service.getSlots(req.query.doctorId, req.query.date);
  res.json(data);
};

export const createBooking = async (req, res) => {
  const data = await service.createBooking({
    patientId: req.user.id,
    doctorId: req.body.doctorId,
    time: req.body.time,
  });

  res.json(data);
};

export const cancelBooking = async (req, res) => {
  const data = await service.cancelBooking(req.params.id, req.user.id);
  res.json(data);
};

export const dashboard = async (req, res) => {
  const data = await service.doctorDashboard(req.params.id, req.query.date);
  res.json(data);
};