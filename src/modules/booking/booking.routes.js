import express from "express";
import * as service from "./booking.service.js";
import { auth } from "../../middlewares/auth.middleware.js";
import { catchAsync } from "../../utils/catchAsync.js";

const router = express.Router();

router.get("/slots", catchAsync(async (req, res) => {
  const data = await service.getSlots(req.query.doctorId, req.query.date);
  res.json(data);
}));

router.post("/", auth, catchAsync(async (req, res) => {
  const data = await service.createBooking({
    patientId: req.user.id,
    doctorId: req.body.doctorId,
    time: req.body.time
  });
  res.json(data);
}));

router.patch("/:id/confirm", auth, catchAsync(async (req, res) => {
  if (req.user.role !== "doctor") {
    return res.status(403).json({ message: "Forbidden" });
  }

  const data = await service.confirmBooking(req.params.id);
  res.json(data);
}));

router.patch("/:id/cancel", auth, catchAsync(async (req, res) => {
  const data = await service.cancelBooking(req.params.id, req.user.id);
  res.json(data);
}));

export default router;