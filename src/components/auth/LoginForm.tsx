import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

import InputField from "../ui/InputField";
import SocialButtons from "./SocialButtons";
import { loginSchema, type LoginSchema } from "../../schemas/loginSchema";
import { useAuth } from "../../hooks/useAuth";

/**
 * Login form with email/password, remember-me, forgot-password, and social auth.
 */
export default function LoginForm() {
  const { login, socialAuth, isLoading, error, successMessage } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      await login(data.email, data.password);
    } catch {
      /* error is surfaced via the hook */
    }
  };

  return (
    <motion.div
      key="login"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.25 }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-5"
        aria-label="Login form"
      >
        {/* Status messages */}
        {error && (
          <div
            role="alert"
            className="rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 px-4 py-2.5 text-sm text-red-700 dark:text-red-300"
          >
            {error}
          </div>
        )}
        {successMessage && (
          <div
            role="status"
            className="rounded-lg bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 px-4 py-2.5 text-sm text-emerald-700 dark:text-emerald-300"
          >
            {successMessage}
          </div>
        )}

        {/* Email */}
        <InputField
          id="login-email"
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        {/* Password */}
        <InputField
          id="login-password"
          label="Password"
          isPassword
          autoComplete="current-password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register("password")}
        />

        {/* Remember me & Forgot password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 bg-white dark:bg-gray-800"
              {...register("rememberMe")}
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Remember me
            </span>
          </label>

          <button
            type="button"
            className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isLoading ? "Signing in…" : "Sign in"}
        </button>

        {/* Social */}
        <SocialButtons
          onGoogle={() => socialAuth("google")}
          onGithub={() => socialAuth("github")}
          isLoading={isLoading}
        />
      </form>
    </motion.div>
  );
}
