import { body, param } from "express-validator";

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

export const updateTaskValidator = [
  param("taskId").notEmpty().withMessage("Task id is required"),
  body("title")
    .optional()
    .isString()
    .withMessage("Task title must be a string")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Task title min length is 1"),
  body("rank").optional().isString().withMessage("Task rank must be a string")
];

export const deleteTaskValidator = [
  param("taskId").notEmpty().withMessage("Task id is required")
];
