"use client";

import React, { useEffect, useState } from "react";

import { applyTheme, getSavedTheme } from "@/lib/frontend/navbar/navbar";
import MobileNavbarPanel from "./mobileNavbarPanel";
import PCNavbarPanel from "./pcNavbarPanel";

function NavbarPanel({ username }) {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const savedTheme = getSavedTheme();
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <nav className="rounded-lg mt-20">
      <div className="container">
        <PCNavbarPanel
          toggleTheme={toggleTheme}
          theme={theme}
          username={username}
        />
        <MobileNavbarPanel
          toggleTheme={toggleTheme}
          theme={theme}
          username={username}
        />
      </div>
    </nav>
  );
}

export default NavbarPanel;
