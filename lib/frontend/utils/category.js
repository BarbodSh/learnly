const createCategory = async (title) => {
  const res = await fetch("/api/category", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
    }),
  });
  return res;
};

const removeCategory = async (id) => {
  const res = await fetch(`/api/category/${id}`, {
    method: "DELETE",
  });
  return res;
};

const updateCategory = async (id, updateTitle) => {
  const res = await fetch(`/api/category/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: updateTitle }),
  });
  return res;
};

export { createCategory, removeCategory, updateCategory };
