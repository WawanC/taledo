import { PrismaClient } from "@prisma/client";
import passport from "passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";
import bcrypt from "bcrypt";
import { Request } from "express";

const prisma = new PrismaClient();

const verify = async (
  req: Request,
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyCallback
) => {
  if (!profile.name) {
    return done(null, undefined, { message: "User not found" });
  }

  const username = profile.name.givenName;

  const user = await prisma.user.findFirst({ where: { username: username } });

  if (user) {
    return req.logIn({ id: user.id, username: user.username }, () => {
      done(null, { id: user.id, username: user.username });
    });
  }

  const hashedPassword = await bcrypt.hash(profile.id, 12);

  const newUser = await prisma.user.create({
    data: { username: profile.name.givenName, password: hashedPassword }
  });

  req.logIn({ id: newUser.id, username: newUser.username }, () => {
    done(null, { id: newUser.id, username: newUser.username });
  });
};

const googleStrategy = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`,
    passReqToCallback: true
  },
  verify
);

const initializePassportGoogle = () => {
  passport.use(googleStrategy);
};

export default initializePassportGoogle;
