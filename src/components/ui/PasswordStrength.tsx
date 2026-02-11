import { usePasswordStrength } from "../../hooks/usePasswordStrength";

interface PasswordStrengthProps {
  password: string;
}

const barColors = {
  weak: "bg-red-500",
  medium: "bg-amber-500",
  strong: "bg-emerald-500",
} as const;

const labelColors = {
  weak: "text-red-500",
  medium: "text-amber-500",
  strong: "text-emerald-500",
} as const;

/**
 * Visual password-strength indicator with progress bars and a requirements checklist.
 */
export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const { level, score, checks } = usePasswordStrength(password);

  if (!password) return null;

  const requirements = [
    { met: checks.minLength, text: "At least 8 characters" },
    { met: checks.hasUppercase, text: "One uppercase letter" },
    { met: checks.hasLowercase, text: "One lowercase letter" },
    { met: checks.hasNumber, text: "One number" },
    { met: checks.hasSpecial, text: "One special character" },
  ];

  return (
    <div className="space-y-2" aria-label="Password strength">
      {/* Strength bars */}
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              i <= score ? barColors[level] : "bg-gray-200 dark:bg-gray-700"
            }`}
          />
        ))}
      </div>

      {/* Label */}
      <p className={`text-xs font-medium capitalize ${labelColors[level]}`}>
        {level} password
      </p>

      {/* Requirements checklist */}
      <ul className="space-y-0.5">
        {requirements.map((req) => (
          <li
            key={req.text}
            className={`flex items-center gap-1.5 text-xs transition-colors duration-200 ${
              req.met
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-gray-400 dark:text-gray-500"
            }`}
          >
            <span aria-hidden="true">{req.met ? "✓" : "○"}</span>
            {req.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
