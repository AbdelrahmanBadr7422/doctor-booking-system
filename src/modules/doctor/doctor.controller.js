import * as service from "./doctor.service.js";

export const createDoctor = async (req, res) => {
  const doc = await service.createDoctor(req.user.id, req.body);
  res.json(doc);
};

export const getDoctors = async (req, res) => {
  const docs = await service.getDoctors();
  res.json(docs);
};