import { body } from "express-validator";

export const createTaskValidator = [
  body("title")
    .notEmpty()
    .withMessage("Task title is required")
    .isString()
    .withMessage("Task title must be a string")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Task title min length is 1"),
  body("section")
    .notEmpty()
    .withMessage("Task section is required")
    .isString()
    .withMessage("Task section must be a string")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Task section min length is 1")
];
