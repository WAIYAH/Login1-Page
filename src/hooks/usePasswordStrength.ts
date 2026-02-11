import { useMemo } from "react";
import type { PasswordStrengthLevel } from "../types/auth.types";

interface PasswordStrengthResult {
  level: PasswordStrengthLevel;
  score: number; // 0-4
  checks: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecial: boolean;
  };
}

/**
 * Evaluates password strength and returns a score, level, and individual checks.
 */
export function usePasswordStrength(password: string): PasswordStrengthResult {
  return useMemo(() => {
    const checks = {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[^A-Za-z0-9]/.test(password),
    };

    const score = Object.values(checks).filter(Boolean).length;

    let level: PasswordStrengthLevel = "weak";
    if (score >= 4) level = "strong";
    else if (score >= 3) level = "medium";

    return { level, score, checks };
  }, [password]);
}
