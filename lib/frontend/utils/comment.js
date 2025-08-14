const createComment = async (comment) => {
  const res = await fetch("/api/comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  return res;
};

const removeComment = async (id) => {
  const res = await fetch(`/api/comment/${id}`, {
    method: "DELETE",
  });
  return res;
};

const confirmComment = async (id) => {
  const res = await fetch(`/api/comment/${id}`, {
    method: "PUT",
  });
  return res;
};

const sendAnswer = async (newAnswer) => {
  const res = await fetch("/api/comment/answer", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newAnswer),
  });
  return res;
};

export { createComment, removeComment, confirmComment, sendAnswer };
