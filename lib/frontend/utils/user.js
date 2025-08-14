export const login = async (user) => {
  const res = await fetch("/api/auth/signin", {
    method: "POST",
    headers: {
      "Contetnt-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return res;
};

export const reguster = async (newUser) => {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Contetnt-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  return res;
};

export const banUser = async (id, email) => {
  const res = await fetch("/api/user/ban", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, email }),
  });
  return res;
};

export const changeRole = async (id) => {
  const res = await fetch("/api/user/role", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  return res;
};

export const removeUser = async (id) => {
  const res = await fetch(`/api/user/${id}`, {
    method: "DELETE",
  });
  return res;
};

export const updateInformationUser = async (id, newInformation) => {
  const res = await fetch(`/api/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newInformation),
  });
  return res;
};
