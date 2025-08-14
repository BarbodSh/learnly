import { rules } from "./rules";
export const validateSignin = ({ identifier, password }) => {
  if (
    rules.password.validate(password) &&
    (rules.email.validate(identifier) || rules.min.validate(identifier, 5))
  ) {
    return true;
  }
  return false;
};

export const validateIdentifierUser = (identifier) => {
  if (rules.email.validate(identifier) || rules.min.validate(identifier, 5)) {
    return true;
  }
  return "identifier is not valid";
};
export const validatePasswordUser = (password) => {
  if (!rules.password.validate(password)) {
    return rules.password.message;
  }
  return true;
};

export const validateSignUp = ({ name, username, email, password }) => {
  if (!rules.min.validate(name, 3)) {
    return rules.min.message("Name", 3);
  }
  if (!rules.min.validate(username, 5)) {
    return rules.min.message("Userame", 5);
  }
  if (!rules.email.validate(email)) {
    return rules.email.message;
  }
  if (!rules.password.validate(password)) {
    return rules.password.message;
  }
  return true;
};
