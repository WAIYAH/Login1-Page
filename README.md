# React + Vite Authentication UI

A production-ready authentication page with **Login** and **Register** forms, built with React 18, TypeScript, Vite, and Tailwind CSS v4.

## Features

- **Dual-mode forms** — seamless tab toggle between Sign In and Create Account
- **Social authentication** — Google & GitHub buttons with branded icons
- **Legal consent flow** — required Terms of Service / Privacy Policy acceptance with modal popups
- **Real-time validation** — React Hook Form + Zod schemas
- **Password strength indicator** — visual bars + requirements checklist
- **Password visibility toggle** — show/hide on every password field
- **Dark mode** — respects system preference, toggleable with a button
- **Glassmorphism UI** — backdrop-blur card on gradient background
- **Fully responsive** — mobile-first, works on all breakpoints
- **Accessible** — ARIA labels, keyboard navigation, focus-visible rings
- **Error boundary** — graceful crash recovery
- **Loading / success / error states** — mock async API calls

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 7 |
| Styling | Tailwind CSS v4 |
| Forms | React Hook Form |
| Validation | Zod v4 |
| Animations | Framer Motion |
| Icons | Lucide React |

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── Auth.tsx            # Tab container
│   │   ├── LoginForm.tsx       # Login form
│   │   ├── RegisterForm.tsx    # Register form + consent
│   │   └── SocialButtons.tsx   # Google / GitHub buttons
│   ├── layout/
│   │   └── AuthLayout.tsx      # Glass card + dark-mode toggle
│   ├── ui/
│   │   ├── InputField.tsx      # Reusable input with validation
│   │   ├── LegalModal.tsx      # Accessible modal for legal text
│   │   └── PasswordStrength.tsx# Strength bars + checklist
│   └── ErrorBoundary.tsx       # Error boundary
├── hooks/
│   ├── useAuth.ts              # Mock login/register/social API
│   └── usePasswordStrength.ts  # Password scoring hook
├── schemas/
│   ├── loginSchema.ts          # Zod login schema
│   └── registerSchema.ts       # Zod register schema
├── types/
│   └── auth.types.ts           # Shared TypeScript types
├── App.tsx
├── main.tsx
└── index.css                   # Tailwind entry + theme tokens
```

## Mock Credentials

For the login form you can use:

| Field | Value |
|---|---|
| Email | `test@example.com` |
| Password | `Password123` |

## Design System

- **Primary gradient**: `from-indigo-600 to-purple-600`
- **Glass effect**: `backdrop-blur-xl bg-white/70 dark:bg-gray-900/60`
- **Font**: Inter (loaded from Google Fonts)
- **Border radius**: `rounded-2xl` (card), `rounded-lg` (buttons/inputs)

## License

MIT
