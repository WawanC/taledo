import { RequestHandler } from "express";

const isAuth: RequestHandler = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      type: "UNAUTHORIZED",
      message: "Unauthorized Access"
    });
  }
  next();
};

export default isAuth;
