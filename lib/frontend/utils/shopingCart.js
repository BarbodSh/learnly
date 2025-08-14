export const useDiscunt = async (discunt) => {
  const res = await fetch("/api/discunt/use", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      dicuntCode: discunt,
    }),
  });
  return res;
};

export const order = async ({ user, course, amount }) => {
  const res = await fetch("/api/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user,
      course,
      amount,
    }),
  });
  return res;
};
