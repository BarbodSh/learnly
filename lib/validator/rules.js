import mongoose from "mongoose";

export const rules = {
  required: {
    validate: (value) =>
      value !== undefined && value !== null && String(value).trim() !== "",
    message: (name) => `${name} is required`,
  },
  min: {
    validate: (value, length) => value?.length >= length,
    message: (name, length) =>
      `${name} must be at least ${length} characters long.`,
  },

  max: {
    validate: (value, length) => value?.length <= length,
    message: (name, length) =>
      `${name} must be a maximum of ${length} characters.`,
  },

  objectId: {
    validate: (value) => mongoose.Types.ObjectId.isValid(value),
    message: "This field must be a valid ObjectId.",
  },

  email: {
    validate: (value) =>
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
    message: "This email is not valid.",
  },

  password: {
    validate: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/.test(value),
    message:
      "This password must be at least 8 characters and include uppercase, lowercase, and a number.",
  },

  onlyLetters: {
    validate: (value) => /^[a-zA-Z]+$/.test(value),
    message: "this field accepts letter only.",
  },

  onlyNumbers: {
    validate: (value) => /^\d+$/.test(value),
    message: "This field accepts number only.",
  },
};
