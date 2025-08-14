export const addToWishList = async (userID, _id) => {
  const res = await fetch("/api/wishList", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: userID,
      course: _id,
    }),
  });
  return res;
};

export const removeFromWishlist = async (_id, userID) => {
  const res = await fetch(`/api/wishList/${_id}?user=${userID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};
