import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRouter from "./routes/todo";
import mongoose from "mongoose";

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

const bootstrap = async () => {
  try {
    if (!process.env.MONGO_URL) throw new Error("No Mongo URL provided");
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, async () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

bootstrap();
