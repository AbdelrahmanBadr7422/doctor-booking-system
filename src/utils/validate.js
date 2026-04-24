export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return next(new Error(error.details[0].message));
  next();
};