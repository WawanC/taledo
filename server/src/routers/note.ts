import { Router } from "express";
import * as noteController from "../controllers/note";
import { createNoteValidator } from "../validators/note";
import isValid from "../middlewares/is-valid";
import isAuth from "../middlewares/is-auth";

const noteRouter = Router();

noteRouter.post(
  "/",
  isAuth,
  createNoteValidator,
  isValid,
  noteController.createNote
);

export default noteRouter;
