import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRouter from "./routes/todo";
import mongoose from "mongoose";
import { globalErrorHandlers } from "./utils/error-handler";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  return res.json({
    message: "Welcome to Taledo server"
  });
});

app.use(todoRouter);

app.use(globalErrorHandlers);

const bootstrap = async () => {
  try {
    if (!process.env.MONGO_URL || !process.env.DB_NAME)
      throw new Error("No Mongo URL or DB Name provided");
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: process.env.DB_NAME
    });
    app.listen(port, async () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

bootstrap();
