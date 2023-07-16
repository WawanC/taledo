import { Router } from "express";
import * as noteController from "../controllers/note";
import { createNoteValidator, getNoteValidator } from "../validators/note";
import isValid from "../middlewares/is-valid";
import isAuth from "../middlewares/is-auth";

const noteRouter = Router();

noteRouter.get("/", isAuth, noteController.getNotes);
noteRouter.get(
  "/:noteId",
  isAuth,
  getNoteValidator,
  isValid,
  noteController.getNote
);

noteRouter.post(
  "/",
  isAuth,
  createNoteValidator,
  isValid,
  noteController.createNote
);

export default noteRouter;
