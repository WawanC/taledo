import { RequestHandler } from "express";

export const register: RequestHandler = async (req, res, next) => {
  try {
    return res.status(200).json({
      message: "User register success"
    });
  } catch (error) {
    next(error);
  }
};

export const getMe: RequestHandler = async (req, res, next) => {
  try {
    return res.status(200).json({
      message: "Get me success",
      user: req.user || null
    });
  } catch (error) {
    next(error);
  }
};
