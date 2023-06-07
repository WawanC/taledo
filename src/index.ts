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

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: true
  })
);
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    proxy: true,
    saveUninitialized: false,
    cookie: {
      sameSite: "none",
      secure: true,
      maxAge: 5 * 60 * 1000
    }
  })
);

initializePassportLocal();
initializePassportGoogle();
app.use(passport.session({ pauseStream: true }));

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  return res.json({
    message: "Welcome to Taledo server"
  });
});

app.use("/todos", todoRouter);
app.use("/auth", authRouter);

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
            key: fs.readFileSync("certs/localdev-key.pem"),
            cert: fs.readFileSync("certs/localdev.pem")
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
