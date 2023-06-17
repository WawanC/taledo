import { ErrorRequestHandler } from "express";

export const globalErrorHandlers: ErrorRequestHandler = (
  error: Error,
  req,
  res,
  next
) => {
  console.log(error.message);
  if (error.message === "conflict-oauth") {
    return res.redirect("/account?error=conflict");
  }
  return res.status(500).json({
    type: "SYSTEM_ERROR",
    message: "Internal server error"
  });
};
