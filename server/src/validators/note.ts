import { body, param } from "express-validator";

export const createNoteValidator = [
  body("content")
    .notEmpty()
    .withMessage("Valid note content is required")
    .isString()
    .withMessage("Valid note content is required")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Valid note content is required")
];

export const getNoteValidator = [
  param("noteId").notEmpty().withMessage("Valid note id is required")
];
