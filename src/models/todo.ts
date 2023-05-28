import { Schema, model } from "mongoose";

interface ITodo {
  title: string;
  isCompleted: boolean;
}

const todoSchema = new Schema<ITodo>({
  title: { type: String, required: true },
  isCompleted: { type: Boolean, required: true }
});

const todoModel = model<ITodo>("Todo", todoSchema, "todos");

export default todoModel;
