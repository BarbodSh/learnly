"use client";

import React, { useEffect, useState } from "react";

import { applyTheme, getSavedTheme } from "@/lib/frontend/navbar/navbar";
import PcNavbar from "./pcNavbar";
import MobileNavbar from "./mobileNavbar";
import { getMe } from "@/lib/frontend/utils/helper";

function Navbar({ slug }) {
  const [theme, setTheme] = useState("");
  const [stickyNavabr, setStickyNavbar] = useState(false);
  const [category, setCategory] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLocading] = useState(true);

  useEffect(() => {}, []);

  useEffect(() => {
    getMe(setUser, setIsLocading);
    const fetchCategory = async () => {
      const res = await fetch("/api/category");
      const data = await res.json();
      setCategory(data.category);
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    const navbarBecameSticky = () => {
      if (window.scrollY > 5) {
        setStickyNavbar(true);
      } else {
        setStickyNavbar(false);
      }
    };
    navbarBecameSticky();
    const savedTheme = getSavedTheme();
    setTheme(savedTheme);
    applyTheme(savedTheme);

    window.addEventListener("scroll", navbarBecameSticky);
    return () => window.removeEventListener("scroll", navbarBecameSticky);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <nav
      className={`sticky top-0 z-30 transition-all duration-300 ease-in-out ${
        stickyNavabr ? "bg-white shadow-lg dark:bg-dark" : "bg-transparent"
      }`}
    >
      <div className="container">
        <PcNavbar
          slug={slug}
          category={category}
          toggleTheme={toggleTheme}
          theme={theme}
          user={user}
          stickyNavbar={stickyNavabr}
          isLoading={isLoading}
        />
        <MobileNavbar
          category={category}
          toggleTheme={toggleTheme}
          theme={theme}
          isLogin={user}
        />
      </div>
    </nav>
  );
}

export default Navbar;
