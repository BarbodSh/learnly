export const createNotification = async (title, description, userId) => {
  const res = await fetch("/api/notification", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, userId, description }),
  });
  return res;
};
export const removeLesson = async (id) => {
  const res = await fetch(`/api/lesson/${id}`, {
    method: "DELETE",
  });
  return res;
};

export const removeNotification = async (id) => {
  const res = await fetch(`/api/notification/${id}`, {
    method: "DELETE",
  });
  return res;
};

export const removeUserNotification = async (userId, id) => {
  const res = await fetch(`/api/notification/user/${id}?userId=${userId}`, {
    method: "DELETE",
  });
  return res;
};
