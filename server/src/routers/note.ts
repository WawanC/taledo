import { Router } from "express";
import * as noteController from "../controllers/note";
import {
  createNoteValidator,
  deleteNoteValidator,
  getNoteValidator,
  updateNoteValidator
} from "../validators/note";
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

noteRouter.delete(
  "/:noteId",
  isAuth,
  deleteNoteValidator,
  isValid,
  noteController.deleteNote
);

noteRouter.put(
  "/:noteId",
  isAuth,
  updateNoteValidator,
  isValid,
  noteController.updateNote
);

export default noteRouter;
