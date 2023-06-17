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
  // Authorize and linking user account
  if (req.user) {
    const isAlready = await prisma.user.findFirst({
      where: { google: profile._json.email }
    });

    if (isAlready) {
      return done(new Error("conflict-oauth"), undefined, null);
    }

    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if (!user) {
      return done(null, undefined, { message: "User not found" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        google: profile._json.email
      }
    });

    return req.logIn(
      {
        id: updatedUser.id,
        username: updatedUser.username,
        google: updatedUser.google
      },
      () => {
        done(null, {
          id: updatedUser.id,
          username: updatedUser.username,
          google: updatedUser.google
        });
      }
    );
  }

  // Authentication for new user
  if (!profile.name) {
    return done(null, undefined, { message: "User not found" });
  }

  const email = profile._json.email;

  const user = await prisma.user.findFirst({ where: { google: email } });

  if (user) {
    return req.logIn(
      { id: user.id, username: user.username, google: email },
      () => {
        done(null, { id: user.id, username: user.username, google: email });
      }
    );
  }

  const hashedPassword = await bcrypt.hash(profile.id, 12);

  const newUser = await prisma.user.create({
    data: {
      username: profile.name.givenName,
      password: hashedPassword,
      google: email
    }
  });

  req.logIn(
    { id: newUser.id, username: newUser.username, google: newUser.google },
    () => {
      done(null, {
        id: newUser.id,
        username: newUser.username,
        google: newUser.google
      });
    }
  );
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
