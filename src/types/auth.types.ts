/** Shared TypeScript interfaces for the authentication module. */

export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  consent: boolean;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  userId?: string;
  provider?: "google" | "github";
}

export type AuthTab = "login" | "register";

export type PasswordStrengthLevel = "weak" | "medium" | "strong";
