import { rules } from "./rules";
export const validateNotification = ({ title, userId, description }) => {
  if (!rules.min.validate(title, 5)) {
    return rules.min.message("Title", 5);
  }
  if (!rules.max.validate(title, 30)) {
    return rules.max.message("Title", 30);
  }
  if (!rules.min.validate(description, 10)) {
    return rules.min.message("Description", 10);
  }
  if (!rules.max.validate(description, 300)) {
    return rules.max.message("Description", 300);
  }
  if (!rules.required.validate(userId)) {
    return rules.required.message("User");
  }

  return true;
};
