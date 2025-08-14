// app/layout.js یا app/layout.tsx
import "./globals.css";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "learnly academy",
  description: "test note",
  icons: "/images/lego.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  const theme = localStorage.getItem("theme");
                  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                  if (theme === "dark" || (!theme && prefersDark)) {
                    document.documentElement.classList.add("dark");
                  } else {
                    document.documentElement.classList.remove("dark");
                  }
                } catch (_) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-gray-200 dark:bg-primary-dark ease-in-out">
        {children}
        <ToastContainer position="top-right" autoClose={3000} theme="light" />
      </body>
    </html>
  );
}
