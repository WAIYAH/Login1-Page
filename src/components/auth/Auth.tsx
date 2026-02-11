import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import type { AuthTab } from "../../types/auth.types";

const tabs: { value: AuthTab; label: string }[] = [
  { value: "login", label: "Sign in" },
  { value: "register", label: "Create account" },
];

/**
 * Main auth container that switches between Login and Register forms.
 */
export default function Auth() {
  const [activeTab, setActiveTab] = useState<AuthTab>("login");

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Logo / Heading */}
      <div className="text-center mb-8">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
          <svg
            className="h-7 w-7 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3zM6 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3zM2 20c0-3.314 4.03-6 9-6s9 2.686 9 6"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back
        </h1>
        <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
          {activeTab === "login"
            ? "Sign in to your account to continue"
            : "Create a new account to get started"}
        </p>
      </div>

      {/* Tabs */}
      <div
        className="mb-6 flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1"
        role="tablist"
        aria-label="Authentication method"
      >
        {tabs.map((tab) => (
          <button
            key={tab.value}
            role="tab"
            aria-selected={activeTab === tab.value}
            aria-controls={`${tab.value}-panel`}
            onClick={() => setActiveTab(tab.value)}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              activeTab === tab.value
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form panels */}
      <div
        id={`${activeTab}-panel`}
        role="tabpanel"
        aria-labelledby={activeTab}
      >
        <AnimatePresence mode="wait">
          {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
        </AnimatePresence>
      </div>
    </div>
  );
}
