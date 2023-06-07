import { RequestHandler } from "express";
import passport, { AuthenticateCallback } from "passport";

const passportAuthLocal: RequestHandler = (req, res, next) => {
  const authCallback: AuthenticateCallback = (err, user, info: any) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(400).json({
        type: "AUTH_FAILED",
        message: info.message
      });
    }

    req.logIn(user, (err) => {
      next();
    });
  };
  passport.authenticate("local", authCallback)(req, res, next);
};

export default passportAuthLocal;
