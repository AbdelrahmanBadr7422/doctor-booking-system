import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("patient", "doctor").required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});