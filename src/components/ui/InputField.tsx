import { type InputHTMLAttributes, forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Visible label text */
  label: string;
  /** Validation error message */
  error?: string;
  /** Unique field id (also used for aria-describedby) */
  id: string;
  /** Render a password-visibility toggle */
  isPassword?: boolean;
}

/**
 * Reusable form input with label, error display, and optional password toggle.
 * Uses `forwardRef` so React Hook Form can attach its ref.
 */
const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, id, isPassword = false, className = "", ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const errorId = `${id}-error`;

    const inputType = isPassword
      ? showPassword
        ? "text"
        : "password"
      : rest.type ?? "text";

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>

        <div className="relative">
          <input
            ref={ref}
            id={id}
            type={inputType}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={`
              w-full rounded-lg border px-4 py-2.5 text-sm
              bg-white/60 dark:bg-gray-800/60
              border-gray-300 dark:border-gray-600
              text-gray-900 dark:text-gray-100
              placeholder:text-gray-400 dark:placeholder:text-gray-500
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
              focus-visible:ring-2 focus-visible:ring-indigo-500
              transition-colors duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              ${isPassword ? "pr-11" : ""}
              ${error ? "border-red-500 focus:ring-red-500" : ""}
              ${className}
            `}
            {...rest}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4.5 w-4.5" />
              ) : (
                <Eye className="h-4.5 w-4.5" />
              )}
            </button>
          )}
        </div>

        {error && (
          <p id={errorId} role="alert" className="text-xs text-red-500 mt-1">
            {error}
          </p>
        )}
      </div>
    );
  },
);

InputField.displayName = "InputField";

export default InputField;
