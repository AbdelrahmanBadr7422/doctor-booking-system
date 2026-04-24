import { Audit } from "../models/audit.model.js";

export const createLog = (data) => {
  return Audit.create(data);
};