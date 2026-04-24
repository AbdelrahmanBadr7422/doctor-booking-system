import Joi from "joi";

export const createBookingSchema = Joi.object({
  doctorId: Joi.string().required(),
  time: Joi.date().required(),
});