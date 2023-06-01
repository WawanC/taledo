import { RequestHandler } from "express";
import passport, { AuthenticateCallback } from "passport";

const isAuth: RequestHandler = (req, res, next) => {
  const authCallback: AuthenticateCallback = (err, user, info) => {
    if (err) return next(err);

    if (info) return res.status(401).json(info);

    if (!user)
      return res.status(401).json({
        type: "UNAUTHORIZED",
        message: "Unauthorized Access"
      });

    req.user = user;
    next();
  };
  passport.authenticate("local", authCallback)(req, res, next);
};

export default isAuth;
