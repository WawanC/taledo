import passport from "passport";
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";

const verify: VerifyFunction = (username, password, done) => {
  if (username === "test" && password === "123456")
    return done(null, { id: "1" });
  return done(null, false);
};

const localStrategy = new LocalStrategy(verify);

const initializePassportLocal = () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: Express.User, done) => {
    done(null, user);
  });

  passport.use(localStrategy);
};

export default initializePassportLocal;
