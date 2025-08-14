export const createLesson = async (title, course, isFree) => {
  const res = await fetch("/api/lesson", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, courseID: course, isFree }),
  });
  return res;
};
export const removeLesson = async (id) => {
  const res = await fetch(`/api/lesson/${id}`, {
    method: "DELETE",
  });
  return res;
};
