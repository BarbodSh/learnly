export const createTicket = async (newTicket) => {
  const res = await fetch("/api/ticket", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTicket),
  });
  return res;
};

export const sendResponseTicket = async (newResponseTicket) => {
  const res = await fetch("/api/ticket/answer", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newResponseTicket),
  });
  return res;
};
