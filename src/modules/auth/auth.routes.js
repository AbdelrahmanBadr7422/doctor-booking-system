import express from "express";
import * as service from "./auth.service.js";
import { catchAsync } from "../../utils/catchAsync.js";

const router = express.Router();

router.post("/register", catchAsync(async (req, res) => {
  const user = await service.register(req.body);
  res.json(user);
}));

router.post("/login", catchAsync(async (req, res) => {
  const token = await service.login(req.body.email, req.body.password);
  res.json({ token });
}));

export default router;