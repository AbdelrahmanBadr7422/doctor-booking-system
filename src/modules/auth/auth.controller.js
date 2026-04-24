import * as service from "./auth.service.js";

export const register = async (req, res) => {
  const user = await service.register(req.body);
  res.json(user);
};

export const login = async (req, res) => {
  const token = await service.login(req.body.email, req.body.password);
  res.json({ token });
};