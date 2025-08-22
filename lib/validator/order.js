import { rules } from "./rules";
export const validateOrder = ({ user, course, amount }) => {
  if (!rules.required.validate(user)) {
    return rules.required.message("User");
  }
  if (course?.length === 0) {
    return "please buy a something";
  }
  if (!rules.required.validate(amount)) {
    return rules.required.message("Amount");
  }
  return true;
};
