import { rules } from "./rules";

export const validateCourse = (data) => {
  if (!rules.min.validate(data.title, 5)) {
    return rules.min.message("Title", 5);
  }
  if (!rules.max.validate(data.title, 30)) {
    return rules.max.message("Title", 30);
  }
  if (!rules.min.validate(data.description, 20)) {
    return rules.min.message("Description", 20);
  }
  if (!rules.max.validate(data.description, 500)) {
    return rules.max.message("Description", 500);
  }
  if (!rules.onlyNumbers.validate(data.price)) {
    return rules.onlyNumbers.message;
  }
  if (!rules.required.validate(data.isFree)) {
    return rules.required.message("IsFree");
  }
  if (!rules.required.validate(data.coverImage)) {
    return rules.required.message("CoverImage");
  }
  if (!rules.required.validate(data.support)) {
    return rules.required.message("Support");
  }
  if (!rules.required.validate(data.category)) {
    return rules.required.message("Category");
  }
  if (!rules.required.validate(data.teacher)) {
    return rules.required.message("Teacher");
  }

  return true;
};
