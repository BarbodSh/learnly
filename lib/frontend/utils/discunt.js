export const createDiscunt = async (newDiscunt) => {
  const res = await fetch("/api/discunt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDiscunt),
  });
  return res;
};

export const removeDiscunt = async (id) => {
  const res = await fetch(`/api/discunt/${id}`, {
    method: "DELETE",
  });
  return res;
};
