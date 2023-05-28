import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRouter from "./routes/todo";

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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
