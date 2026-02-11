import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

import InputField from "../ui/InputField";
import PasswordStrength from "../ui/PasswordStrength";
import LegalModal from "../ui/LegalModal";
import SocialButtons from "./SocialButtons";
import {
  registerSchema,
  type RegisterSchema,
} from "../../schemas/registerSchema";
import { useAuth } from "../../hooks/useAuth";

type LegalType = "terms" | "privacy" | null;

/**
 * Registration form with legal consent, password strength, and social auth.
 */
export default function RegisterForm() {
  const { register: registerUser, socialAuth, isLoading, error, successMessage } = useAuth();
  const [activeLegal, setActiveLegal] = useState<LegalType>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      consent: false as unknown as true, // typed as literal true, but defaults false
    },
  });

  const password = watch("password");
  const consentChecked = watch("consent");

  const onSubmit = async (data: RegisterSchema) => {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
    } catch {
      /* error surfaced via hook */
    }
  };

  return (
    <>
      <motion.div
        key="register"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.25 }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
          aria-label="Registration form"
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

          {/* Name */}
          <InputField
            id="register-name"
            label="Full name"
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
            error={errors.name?.message}
            {...register("name")}
          />

          {/* Email */}
          <InputField
            id="register-email"
            label="Email address"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email")}
          />

          {/* Password */}
          <div className="space-y-2">
            <InputField
              id="register-password"
              label="Password"
              isPassword
              autoComplete="new-password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register("password")}
            />
            <PasswordStrength password={password} />
          </div>

          {/* Confirm Password */}
          <InputField
            id="register-confirm-password"
            label="Confirm password"
            isPassword
            autoComplete="new-password"
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          {/* Consent checkbox */}
          <div className="space-y-1">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 bg-white dark:bg-gray-800"
                {...register("consent")}
              />
              <span className="text-sm text-gray-600 dark:text-gray-400 leading-snug">
                I have read and agree to the{" "}
                <button
                  type="button"
                  onClick={() => setActiveLegal("terms")}
                  className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  onClick={() => setActiveLegal("privacy")}
                  className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
                >
                  Privacy Policy
                </button>
              </span>
            </label>
            {errors.consent?.message && (
              <p role="alert" className="text-xs text-red-500 ml-6">
                {errors.consent.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading || !consentChecked}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isLoading ? "Creating account…" : "Create account"}
          </button>

          {/* Social */}
          <SocialButtons
            onGoogle={() => socialAuth("google")}
            onGithub={() => socialAuth("github")}
            isLoading={isLoading}
          />
        </form>
      </motion.div>

      {/* Legal modals */}
      <LegalModal
        open={activeLegal === "terms"}
        onClose={() => setActiveLegal(null)}
        title="Terms of Service"
      >
        <p>
          <strong>1. Acceptance of Terms</strong>
          <br />
          By accessing or using our service, you agree to be bound by these
          Terms of Service and all applicable laws and regulations. If you do
          not agree with any of these terms, you are prohibited from using or
          accessing this site.
        </p>
        <p>
          <strong>2. Use Licence</strong>
          <br />
          Permission is granted to temporarily use the service for personal,
          non-commercial transitory viewing only. This licence shall
          automatically terminate if you violate any of these restrictions.
        </p>
        <p>
          <strong>3. Disclaimer</strong>
          <br />
          The materials and services are provided on an &apos;as is&apos; basis.
          We make no warranties, expressed or implied, and hereby disclaim all
          other warranties including, without limitation, implied warranties or
          conditions of merchantability and fitness for a particular purpose.
        </p>
        <p>
          <strong>4. Limitations</strong>
          <br />
          In no event shall we be liable for any damages arising out of the use
          or inability to use the service, even if we have been notified of the
          possibility of such damage.
        </p>
      </LegalModal>

      <LegalModal
        open={activeLegal === "privacy"}
        onClose={() => setActiveLegal(null)}
        title="Privacy Policy"
      >
        <p>
          <strong>1. Information We Collect</strong>
          <br />
          We collect information you provide directly, such as when you create
          an account, fill out a form, or communicate with us. This may include
          your name, email address, and any other information you choose to
          provide.
        </p>
        <p>
          <strong>2. How We Use Your Information</strong>
          <br />
          We use the information we collect to provide, maintain, and improve
          our services, to send you technical notices and support messages, and
          to respond to your comments and questions.
        </p>
        <p>
          <strong>3. Information Sharing</strong>
          <br />
          We do not share your personal information with third parties except as
          described in this Privacy Policy or with your consent. We may share
          information with service providers who assist us in operating the
          service.
        </p>
        <p>
          <strong>4. Data Security</strong>
          <br />
          We take reasonable measures to help protect information about you from
          loss, theft, misuse and unauthorized access, disclosure, alteration
          and destruction.
        </p>
      </LegalModal>
    </>
  );
}
