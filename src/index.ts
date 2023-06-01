import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRouter from "./routers/todo";
import { globalErrorHandlers } from "./utils/error-handler";
import authRouter from "./routers/auth";
import session from "express-session";
import initializePassportLocal from "./passport/local-strategy";
import passport from "passport";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: "rahasia",
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.session());

initializePassportLocal();

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
    app.listen(port, async () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

bootstrap();
