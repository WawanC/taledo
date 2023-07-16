import { Router } from "express";
import * as noteController from "../controllers/note";

const noteRouter = Router();

noteRouter.post("/", noteController.createNote);

export default noteRouter;
