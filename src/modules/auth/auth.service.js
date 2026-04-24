import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepo from "../../repositories/user.repository.js";
import { env } from "../../config/env.js";
import { ApiError } from "../../utils/ApiError.js";

export const register = async (data) => {
  const hashed = await bcrypt.hash(data.password, 10);
  return userRepo.createUser({ ...data, password: hashed });
};

export const login = async (email, password) => {
  const user = await userRepo.findUserByEmail(email);

  if (!user) {
    throw new ApiError("Invalid credentials", 401);
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new ApiError("Invalid credentials", 401);
  }

  return jwt.sign(
    {
      id: user._id.toString(),
      role: user.role,
    },
    env.jwtSecret,
    { expiresIn: "1d" }
  );
};