import joi from "joi";

export const registerValidation = joi.object({
  name: joi.string().required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "any.required": "Name is required",
  }),
  email: joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "string.empty": "Email cannot be empty",
    "any.required": "Email is required",
  }),
  password: joi.string().min(6).required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
  confirmPassword: joi.string().valid(joi.ref("password")).required().messages({
    "any.only": "Confirm Password must match Password",
    "any.required": "Confirm Password is required",
  }),
});

export const loginValidation = joi.object({
  email: joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.email": "Email must be a valid email address",
    "string.empty": "Email cannot be empty",
    "any.required": "Email is required",
  }),
  password: joi.string().required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
});
