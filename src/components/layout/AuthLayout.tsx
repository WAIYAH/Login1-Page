import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

/**
 * Full-screen layout with gradient background, glass-morphism card, and dark-mode toggle.
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 p-4 sm:p-6 lg:p-8">
      {/* Decorative blobs */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-400/30 dark:bg-indigo-600/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-400/30 dark:bg-purple-600/20 blur-3xl"
        aria-hidden="true"
      />

      {/* Dark-mode toggle */}
      <button
        onClick={() => setDark((d) => !d)}
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        className="absolute top-4 right-4 z-20 rounded-full p-2.5 text-gray-600 dark:text-gray-300 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md hover:bg-white/80 dark:hover:bg-gray-700/80 border border-gray-200 dark:border-gray-700 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-colors"
      >
        {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>

      {/* Glass card */}
      <main className="relative z-10 w-full max-w-md rounded-2xl border border-white/20 dark:border-white/[0.08] bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl shadow-2xl p-6 sm:p-8">
        {children}
      </main>

      {/* Footer */}
      <p className="absolute bottom-4 text-xs text-gray-400 dark:text-gray-600">
        &copy; {new Date().getFullYear()} Login1-Page. All rights reserved.
      </p>
    </div>
  );
}
