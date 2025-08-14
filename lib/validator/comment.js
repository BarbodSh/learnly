import { rules } from "./rules";

// sercer
export const commentValidate = (score, text) => {
  if (
    !rules.onlyNumbers.validate(score) ||
    !rules.min.validate(text, 10) ||
    !rules.max.validate(text, 300)
  ) {
    return false;
  }
  return true;
};

// both
export const commentTextValidate = (text) => {
  if (!rules.min.validate(text, 10)) {
    return rules.min.message("Text", 10);
  }
  if (!rules.max.validate(text, 300)) {
    return rules.max.message("Text", 300);
  }
  return true;
};
