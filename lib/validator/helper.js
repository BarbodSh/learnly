import { rules } from "./rules";

export const validateID = (id) => {
  if (!rules.objectId.validate(id)) {
    return false;
  }
  return true;
};
