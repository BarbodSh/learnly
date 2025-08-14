import { showErrorSwal } from "./helper";

export const allStatus = (res) => {
  switch (res.status) {
    case 400:
      return showErrorSwal("data is not valid");

    case 404:
      return showErrorSwal("data is not found");

    case 500:
      return showErrorSwal("server error");

    default:
      return showErrorSwal("unexpected error");
  }
};
