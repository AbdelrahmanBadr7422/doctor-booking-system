import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepo from "../../repositories/user.repository.js";
import { env } from "../../config/env.js";

export const register = async (data) => {
  const hashed = await bcrypt.hash(data.password, 10);
  return userRepo.createUser({ ...data, password: hashed });
};

export const login = async (email, password) => {
  const user = await userRepo.findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Invalid credentials");
  }

  return jwt.sign({ id: user._id, role: user.role }, env.jwtSecret);
};