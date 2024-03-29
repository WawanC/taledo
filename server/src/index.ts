import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRouter from "./routers/todo";
import { globalErrorHandlers } from "./utils/error-handler";
import authRouter from "./routers/auth";
import session from "express-session";
import initializePassportLocal from "./passport/local-strategy";
import passport from "passport";
import initializePassportGoogle from "./passport/google-strategy";
import https from "https";
import fs from "fs";
import path from "path";
import initializePassport from "./passport/serializer";
import noteRouter from "./routers/note";
import RedisStore from "connect-redis";
import { createClient } from "redis";
import taskRouter from "./routers/task";

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: true
  })
);
app.use(express.json());

const redisClient = createClient({
  url: process.env.REDIS_URL
});
redisClient.connect();

const redisStore = new RedisStore({ client: redisClient });

app.use(
  session({
    store: redisStore,
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    proxy: true,
    saveUninitialized: false,
    cookie: {
      sameSite: "none",
      secure: true,
      maxAge: 15 * 60 * 1000
    }
  })
);

initializePassport();
initializePassportLocal();
initializePassportGoogle();

app.use(passport.session({ pauseStream: true }));

app.use(express.static(path.join(__dirname, "..", "..", "client", "dist")));

const port = process.env.PORT || 8000;

app.use("/api/todos", todoRouter);
app.use("/api/auth", authRouter);
app.use("/api/notes", noteRouter);
app.use("/api/tasks", taskRouter);

app.use("*", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "..", "client", "dist", "index.html"))
);

app.use(globalErrorHandlers);

const bootstrap = async () => {
  try {
    if (process.env.NODE_ENV === "production") {
      app.listen(port, async () => {
        console.log(`Listening on port ${port}`);
      });
    } else {
      https
        .createServer(
          {
            key: fs.readFileSync(
              path.join(__dirname, "..", "certs", "localdev-key.pem")
            ),
            cert: fs.readFileSync(
              path.join(__dirname, "..", "certs", "localdev.pem")
            )
          },
          app
        )
        .listen(port, () => {
          console.log(`Listening on port ${port}`);
        });
    }
  } catch (error) {
    console.log(error);
  }
};

bootstrap();
