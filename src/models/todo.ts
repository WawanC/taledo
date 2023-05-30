import { Schema, Types, model } from "mongoose";

interface ITodo {
  title: string;
  isCompleted: boolean;
  parent: Types.ObjectId | null;
  children: Types.ObjectId[];
}

const todoSchema = new Schema<ITodo>({
  title: { type: String, required: true },
  isCompleted: { type: Boolean, required: true },
  parent: { type: Schema.Types.ObjectId, ref: "Todo" },
  children: { type: [Schema.Types.ObjectId], ref: "Todo" }
});

const todoModel = model<ITodo>("Todo", todoSchema, "todos");

export default todoModel;
