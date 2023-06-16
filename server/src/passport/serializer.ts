import { PrismaClient } from "@prisma/client";
import passport from "passport";

const prisma = new PrismaClient();

const initializePassport = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: { id: true, username: true, google: true }
    });
    if (!user) {
      return done(null, null);
    }
    done(null, user);
  });
};

export default initializePassport;
