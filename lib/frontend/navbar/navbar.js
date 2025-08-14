export const getSavedTheme = () => {
  const theme = localStorage.getItem("theme");
  return theme === "dark" ? "dark" : "light";
};

export const applyTheme = (theme) => {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  } else {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  }

  localStorage.setItem("theme", theme);
};
