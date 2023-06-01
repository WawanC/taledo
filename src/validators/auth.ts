import { body } from "express-validator";

export const registerAuthValidator = [
  body("username")
    .notEmpty()
    .withMessage("User username is required")
    .isString()
    .withMessage("User username must be string")
    .trim()
    .isLength({ min: 6 })
    .withMessage("User username min length is 6 characters long"),
  body("password")
    .notEmpty()
    .withMessage("User password is required")
    .isString()
    .withMessage("User password must be string")
    .isLength({ min: 6 })
    .withMessage("User password min length is 6 characters long")
];
