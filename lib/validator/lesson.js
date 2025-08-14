import { rules } from "./rules";
export const validateLesson = (title, courseID, isFree) => {
  if (!rules.min.validate(title, 5)) {
    return rules.min.message("Title", 5);
  }
  if (!rules.max.validate(title, 30)) {
    return rules.max.message("Title", 30);
  }
  if (!rules.required.validate(courseID)) {
    return rules.required.message("Course");
  }
  if (!rules.required.validate(isFree)) {
    return rules.required.message("IsFree");
  }
  return true;
};
