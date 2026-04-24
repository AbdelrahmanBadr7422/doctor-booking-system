import { Audit } from "../models/audit.model.js";

export const createLog = (data) => {
  Audit.create(data);
}