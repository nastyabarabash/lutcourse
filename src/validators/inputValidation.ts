import { body } from "express-validator"

export const emailValidator = body("email")
  .isEmail().withMessage("Invalid email format")
  .normalizeEmail()
  .trim()
  .escape()

export const usernameValidator = body("username")
  .isLength({ min: 3, max: 25 })
  .withMessage("Username must be between 3 and 25 characters")
  .trim()
  .escape()

export const passwordRegisterValidator = body("password")
  .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
  .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
  .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
  .matches(/[0-9]/).withMessage("Password must contain at least one number")
  .matches(/[#!&?]/).withMessage("Password must contain at least one special character (# ! & ?)")
  .trim()

export const passwordLoginValidator = body("password")
  .notEmpty().withMessage("Password is required")
  .trim()