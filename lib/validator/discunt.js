import { rules } from "./rules";

export const validateDiscunt = ({ code, percent, maxUse }) => {
  if (!rules.min.validate(code, 5)) {
    return rules.min.message("Code", 5);
  }
  if (!rules.max.validate(code, 50)) {
    return rules.max.message("Code", 50);
  }
  if (!rules.onlyNumbers.validate(percent)) {
    return rules.onlyNumbers.message;
  }
  if (!rules.onlyNumbers.validate(maxUse)) {
    return rules.onlyNumbers.message;
  }
  return true;
};

export const validateCode = (code) => {
  if (!rules.min.validate(code, 5)) {
    return rules.min.message("Code", 5);
  }
  return true;
};
