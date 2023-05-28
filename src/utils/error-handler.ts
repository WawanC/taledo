import { ErrorRequestHandler } from "express";

export const globalErrorHandlers: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  console.log(error);
  return res.status(500).json({
    type: "SYSTEM_ERROR",
    message: "Internal server error"
  });
};
