import { RequestHandler } from "express";
import { validationResult } from "express-validator";

const isValid: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      type: "VALIDATION_FAILED",
      message: errors.array()[0].msg
    });
  }
  next();
};

export default isValid;
