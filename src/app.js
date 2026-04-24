import express from "express";

import authRoutes from "./modules/auth/auth.routes.js";
import doctorRoutes from "./modules/doctor/doctor.routes.js";
import bookingRoutes from "./modules/booking/booking.routes.js";

import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "doctor-booking-system"
  });
});
app.use("/auth", authRoutes);
app.use("/doctors", doctorRoutes);
app.use("/bookings", bookingRoutes);

app.use(errorHandler);

export default app;