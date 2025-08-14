import { rules } from "./rules";
export const validateTicket = ({ title, user, description, priority }) => {
  if (!rules.min.validate(title, 5)) {
    return rules.min.message("Title", 5);
  }
  if (!rules.max.validate(title, 50)) {
    return rules.max.message("Title", 50);
  }
  if (!rules.required.validate(user)) {
    return "please login";
  }
  if (!rules.min.validate(description, 20)) {
    return rules.min.message("Description", 20);
  }
  if (!rules.max.validate(description, 500)) {
    return rules.max.message("Description", 500);
  }
  if (!rules.required.validate(priority)) {
    return rules.required.message("Priority");
  }
  return true;
};

export const validateResponseTicket = ({ responder, textresponse, id }) => {
  if (!rules.required.validate(responder)) {
    return "please login";
  }
  if (!rules.min.validate(textresponse, 10)) {
    return rules.min.message("Text", 10);
  }
  if (!rules.max.validate(textresponse, 500)) {
    return rules.max.message("Text", 500);
  }
  if (!rules.required.validate(id)) {
    return "this ticket is not valid";
  }
  return true;
};
