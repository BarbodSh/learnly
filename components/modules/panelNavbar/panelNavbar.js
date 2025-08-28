"use client";

import React, { useEffect, useState } from "react";

import { applyTheme, getSavedTheme } from "@/frontend/navbar/navbar";
import MobileNavbarPanel from "./mobileNavbarPanel";
import PCNavbarPanel from "./pcNavbarPanel";
import { removeUserNotification } from "@/frontend/utils/notification";

function NavbarPanel({ username, notification, userId }) {
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
          notification={notification}
          userId={userId}
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
