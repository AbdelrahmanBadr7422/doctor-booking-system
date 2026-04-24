import express from "express";
import * as controller from "./doctor.controller.js";
import { auth } from "../../middlewares/auth.middleware.js";
import { catchAsync } from "../../utils/catchAsync.js";

const router = express.Router();

router.post("/", auth, catchAsync(controller.createDoctor));
router.get("/", catchAsync(controller.getDoctors));

export default router;