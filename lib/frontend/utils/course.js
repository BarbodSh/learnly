const createCourse = async (formData) => {
  const res = await fetch("/api/course", {
    method: "POST",
    body: formData,
  });
  return res;
};

const removeCourse = async (id) => {
  const res = await fetch(`/api/course/${id}`, {
    method: "DELETE",
  });
  return res;
};

const getCourse = async (setCourses, setIsLoading) => {
  setIsLoading(true);
  const res = await fetch("/api/course");
  const data = await res.json();
  setCourses(data.courses);
  setIsLoading(false);
};

const getCourseOfCategory = async (categoryId, setCourses, setIsLoading) => {
  setIsLoading(true);
  const res = await fetch("/api/course");
  const data = await res.json();
  const filteredByCategory = data.courses.filter(
    (course) => course.category === categoryId
  );
  setCourses(filteredByCategory);
  setIsLoading(false);
};

export { createCourse, removeCourse, getCourse, getCourseOfCategory };
