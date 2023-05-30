import { body, param } from "express-validator";

export const createTodoValidator = [
  body("title")
    .notEmpty()
    .withMessage("Todo title is required")
    .isString()
    .withMessage("Todo title must be a string")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Todo title min length is 1")
];

export const createSubTodoValidator = [
  param("todoId")
    .notEmpty()
    .withMessage("Todo id is required")
    .isMongoId()
    .withMessage("Todo id must be a valid id"),
  body("title")
    .notEmpty()
    .withMessage("Todo title is required")
    .isString()
    .withMessage("Todo title must be a string")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Todo title min length is 1")
];

export const updateTodoValidator = [
  param("todoId")
    .notEmpty()
    .withMessage("Todo id is required")
    .isMongoId()
    .withMessage("Todo id must be a valid id"),
  body("title")
    .optional()
    .isString()
    .withMessage("Todo title must be a string")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Todo title min length is 1"),
  body("isCompleted")
    .optional()
    .isBoolean({ strict: true })
    .withMessage("Todo completed status must be a boolean")
];

export const deleteTodoValidator = [
  param("todoId")
    .notEmpty()
    .withMessage("Todo id is required")
    .isMongoId()
    .withMessage("Todo id must be a valid id")
];
