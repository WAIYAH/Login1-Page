import { useState, useCallback } from "react";
import type { AuthResponse } from "../types/auth.types";

/**
 * Mock API helpers and shared auth state hook.
 */

const mockLogin = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (email === "test@example.com" && password === "Password123") {
    return { success: true, token: "mock-jwt-token" };
  }
  throw new Error("Invalid credentials");
};

const mockRegister = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { success: true, userId: "123", token: undefined, ...data };
};

const mockSocialAuth = async (
  provider: "google" | "github",
): Promise<AuthResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { success: true, provider };
};

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccessMessage(null);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const res = await mockLogin(email, password);
      setSuccessMessage("Logged in successfully!");
      return res;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(
    async (data: { name: string; email: string; password: string }) => {
      setIsLoading(true);
      setError(null);
      setSuccessMessage(null);
      try {
        const res = await mockRegister(data);
        setSuccessMessage("Account created successfully!");
        return res;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Registration failed";
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const socialAuth = useCallback(async (provider: "google" | "github") => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const res = await mockSocialAuth(provider);
      setSuccessMessage(`Signed in with ${provider}!`);
      return res;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Social authentication failed";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    successMessage,
    clearMessages,
    login,
    register,
    socialAuth,
  };
}
