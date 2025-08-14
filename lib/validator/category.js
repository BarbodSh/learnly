import { rules } from "./rules";

// server
export const categoryValidation = (title) => {
  if (!rules.min.validate(title, 5)) {
    return false;
  }
  return true;
};

// cleint
export const categoryTitleValidation = (title) => {
  if (!rules.min.validate(title, 5)) {
    return rules.min.message("Title", 5);
  }
  return true;
};
