<div align="center">

# 🔐 Login1-Page

**A production-ready authentication UI with dual-mode forms, social login, and a lightweight static alternative.**

Built with React · TypeScript · Vite · Tailwind CSS

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](#license)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vite.dev)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Live Preview](#live-preview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Production Build](#production-build)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
  - [React App (Advanced)](#react-app-advanced)
  - [Static Pages (Lightweight)](#static-pages-lightweight)
- [Component Reference](#component-reference)
- [Form Validation](#form-validation)
- [Mock API & Credentials](#mock-api--credentials)
- [Design System](#design-system)
- [Responsive Breakpoints](#responsive-breakpoints)
- [Accessibility](#accessibility)
- [Customisation](#customisation)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Login1-Page provides **two approaches** to authentication UI in a single repository:

| Approach | Location | Stack | Build Required |
|---|---|---|---|
| **React App** | `src/` → served at `/` | React 19 + TS + Vite + Tailwind v4 | Yes |
| **Static Pages** | `pages/` | Pure HTML + Tailwind CDN + Vanilla JS | No |

The **React app** is a feature-rich, production-grade implementation with animated tab switching, Zod validation, password strength meters, glassmorphism UI, dark mode, and accessibility throughout.

The **static pages** are a zero-dependency alternative — two HTML files that work anywhere, perfect for quick prototypes or static hosts.

---

## Live Preview

Start the dev server and visit:

| Page | URL |
|---|---|
| React Auth App | `http://localhost:5173/` |
| Static Welcome Page | `http://localhost:5173/pages/index.html` |
| Static Login Page | `http://localhost:5173/pages/auth.html?mode=login` |
| Static Register Page | `http://localhost:5173/pages/auth.html?mode=register` |

---

## Features

### React App (`src/`)

| Feature | Description |
|---|---|
| 🔄 Dual-Mode Forms | Animated tab toggle between Sign In and Create Account |
| 🔑 Social Authentication | Google & GitHub buttons with branded SVG icons |
| 📜 Legal Consent Flow | Required Terms of Service / Privacy Policy checkboxes with modal popups |
| ✅ Real-Time Validation | React Hook Form + Zod schemas with instant error feedback |
| 💪 Password Strength | 5-bar visual indicator + requirements checklist (length, uppercase, lowercase, number, special) |
| 👁️ Password Toggle | Show/hide toggle on every password field |
| 🌙 Dark Mode | Respects system preference; toggleable via button; persisted in localStorage |
| 🧊 Glassmorphism UI | Frosted-glass card with `backdrop-blur-xl` over gradient background |
| 🎬 Animations | Smooth form transitions powered by Framer Motion |
| 📱 Fully Responsive | Mobile-first design across `sm`, `md`, `lg` breakpoints |
| ♿ Accessible | ARIA labels, roles, `aria-invalid`, `aria-describedby`, keyboard navigation, `focus-visible` rings |
| 🛡️ Error Boundary | Class-based error boundary catches render crashes with a recovery UI |
| ⏳ Loading States | Spinner overlays on mock async API calls with success/error banners |
| 📝 Remember Me | Checkbox on the login form |
| 🔗 Forgot Password | Placeholder link on the login form |

### Static Pages (`pages/`)

| Feature | Description |
|---|---|
| 🏠 Welcome Page | Centred hero section with app branding and CTA buttons |
| 🔐 Dual-Mode Auth | Single `auth.html` renders Login or Register based on `?mode=` URL parameter |
| 🔑 Social Buttons | Google & GitHub buttons with branded icons |
| ☑️ Terms Consent | Checkbox required before registration |
| 📱 Responsive | Clean mobile layout with Tailwind CDN |
| 🪶 Zero Dependencies | No build step, no frameworks — just HTML, CSS, JS |

---

## Tech Stack

### React App

| Layer | Technology | Version |
|---|---|---|
| Framework | React | 19.x |
| Language | TypeScript | 5.9 |
| Build Tool | Vite | 7.x |
| Styling | Tailwind CSS | 4.x |
| Forms | React Hook Form | 7.x |
| Validation | Zod | 4.x |
| Animations | Framer Motion | 12.x |
| Icons | Lucide React | 0.563+ |
| Font | Inter | Google Fonts |

### Static Pages

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | Tailwind CSS (CDN) |
| Logic | Vanilla JavaScript |
| Font | Inter (Google Fonts) |

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 9+ (ships with Node)
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/WAIYAH/Login1-Page.git
cd Login1-Page

# Install dependencies
npm install
```

### Development

```bash
# Start the Vite dev server with HMR
npm run dev
```

The React app is served at **http://localhost:5173/** and the static pages are available under `/pages/`.

### Production Build

```bash
# Type-check and build for production
npm run build

# Preview the production build locally
npm run preview
```

The production output is written to the `dist/` directory.

> **Tip:** The static pages in `pages/` require no build step. You can open them directly in a browser or deploy them to any static host as-is.

---

## Project Structure

```
Login1-Page/
│
├── index.html                    # Vite entry HTML (React app)
├── vite.config.ts                # Vite + React + Tailwind plugins
├── tsconfig.json                 # TypeScript project references
├── tsconfig.app.json             # App-level TypeScript config
├── package.json                  # Dependencies and scripts
│
├── public/                       # Static assets (copied to dist/)
│
├── pages/                        # ── Static HTML Pages ──
│   ├── index.html                # Welcome / landing page
│   └── auth.html                 # Login & register (URL param driven)
│
└── src/                          # ── React Application ──
    ├── main.tsx                  # React DOM entry point
    ├── App.tsx                   # Root component (ErrorBoundary → Layout → Auth)
    ├── index.css                 # Tailwind v4 import + custom theme tokens
    ├── vite-env.d.ts             # Vite client type declarations
    │
    ├── types/
    │   └── auth.types.ts         # Shared TypeScript interfaces
    │
    ├── schemas/
    │   ├── loginSchema.ts        # Zod schema for login form
    │   └── registerSchema.ts     # Zod schema for register form
    │
    ├── hooks/
    │   ├── useAuth.ts            # Mock API calls (login, register, social)
    │   └── usePasswordStrength.ts# Password scoring (weak / medium / strong)
    │
    └── components/
        ├── ErrorBoundary.tsx     # React error boundary with fallback UI
        │
        ├── layout/
        │   └── AuthLayout.tsx    # Full-screen gradient + glass card + dark toggle
        │
        ├── auth/
        │   ├── Auth.tsx          # Tab container (login ↔ register)
        │   ├── LoginForm.tsx     # Email, password, remember me, forgot password
        │   ├── RegisterForm.tsx  # Name, email, password, confirm, consent + modals
        │   └── SocialButtons.tsx # Google & GitHub OAuth buttons
        │
        └── ui/
            ├── InputField.tsx    # Reusable input (label, error, password toggle)
            ├── LegalModal.tsx    # Accessible animated modal for legal text
            └── PasswordStrength.tsx  # Strength bars + requirements checklist
```

---

## Architecture

### React App (Advanced)

```
App.tsx
 └─ ErrorBoundary
     └─ AuthLayout          ← gradient bg, glass card, dark-mode toggle
         └─ Auth             ← tab state (login | register)
             ├─ LoginForm    ← react-hook-form + zodResolver
             │   └─ SocialButtons
             └─ RegisterForm ← react-hook-form + zodResolver
                 ├─ PasswordStrength
                 ├─ LegalModal (Terms)
                 ├─ LegalModal (Privacy)
                 └─ SocialButtons
```

**Data flow:**

1. `useAuth` hook manages loading / error / success state and exposes `login()`, `register()`, and `socialAuth()` — all backed by mock `setTimeout` APIs.
2. `react-hook-form` with `@hookform/resolvers/zod` handles form state, validation, and error display.
3. `usePasswordStrength` is a pure scoring hook that memoises results via `useMemo`.
4. `AuthLayout` reads/writes the `theme` key in `localStorage` and toggles the `dark` class on `<html>`.

### Static Pages (Lightweight)

```
pages/index.html           ← Welcome page
 ├─ "Log In"  → auth.html?mode=login
 └─ "Sign Up" → auth.html?mode=register

pages/auth.html            ← Auth page
 ├─ reads ?mode= from URL
 ├─ shows login OR register form
 ├─ toggle links switch ?mode=
 └─ social buttons (Google, GitHub)
```

No build step. No frameworks. URL parameters drive which form is displayed via a short `<script>` block.

---

## Component Reference

### `AuthLayout`
Full-viewport wrapper with gradient background, decorative blurred blobs, a glassmorphism card container, dark-mode toggle button, and copyright footer.

### `Auth`
Manages the active tab (`login` | `register`) and renders an `AnimatePresence` wrapper so Framer Motion can animate form transitions.

### `LoginForm`
Fields: email, password, remember-me checkbox. Includes a "Forgot password?" link and social buttons. Validates with `loginSchema`.

### `RegisterForm`
Fields: name, email, password (with strength meter), confirm password, and a consent checkbox. The submit button is disabled until consent is checked. Includes two `LegalModal` instances (Terms of Service, Privacy Policy). Validates with `registerSchema`.

### `SocialButtons`
Two side-by-side buttons with branded Google and GitHub SVG icons. Accepts `onGoogle`, `onGithub`, and `isLoading` props.

### `InputField`
A `forwardRef` input supporting labels, error messages, `aria-invalid`/`aria-describedby`, and an optional password-visibility toggle (eye/eye-off icons).

### `PasswordStrength`
Displays five animated bars coloured by strength level (weak → red, medium → amber, strong → green) and a checklist of five requirements.

### `LegalModal`
Accessible modal overlay with Framer Motion enter/exit animations, focus trapping (close button auto-focused), Escape-key dismissal, backdrop click close, and scroll-locked body.

### `ErrorBoundary`
Class-based error boundary that catches render errors and shows a fallback with an error message and a "Reload page" button.

---

## Form Validation

### Login Schema

| Field | Type | Rules |
|---|---|---|
| `email` | `string` | Required, valid email format |
| `password` | `string` | Required (min 1 character) |
| `rememberMe` | `boolean` | Optional |

### Register Schema

| Field | Type | Rules |
|---|---|---|
| `name` | `string` | Min 2 characters |
| `email` | `string` | Valid email format |
| `password` | `string` | Min 8 chars, ≥1 uppercase, ≥1 number |
| `confirmPassword` | `string` | Must match `password` |
| `consent` | `literal(true)` | Must be `true` |

Schemas are defined with **Zod v4** and connected to React Hook Form via `@hookform/resolvers/zod`. Validation runs on every change and on submit.

---

## Mock API & Credentials

The `useAuth` hook provides three mock async functions:

| Function | Delay | Behaviour |
|---|---|---|
| `login(email, password)` | 1 000 ms | Succeeds if email = `test@example.com` and password = `Password123`; otherwise throws |
| `register(data)` | 1 500 ms | Always succeeds, returns `userId: "123"` |
| `socialAuth(provider)` | 800 ms | Always succeeds, returns the provider name |

**Test credentials for login:**

```
Email:    test@example.com
Password: Password123
```

---

## Design System

| Token | Value |
|---|---|
| **Primary Gradient** | `from-indigo-600 to-purple-600` |
| **Glass Card** | `backdrop-blur-xl bg-white/70 dark:bg-gray-900/60 border-white/20` |
| **Background** | `bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100` |
| **Dark Background** | `from-gray-950 via-gray-900 to-indigo-950` |
| **Font Family** | Inter (400, 500, 600, 700) via Google Fonts |
| **Card Radius** | `rounded-2xl` |
| **Button / Input Radius** | `rounded-lg` |
| **Focus Ring** | `focus-visible:ring-2 focus-visible:ring-indigo-500` |
| **Error Colour** | `text-red-500`, `border-red-500` |
| **Success Colour** | `text-emerald-600` / `text-emerald-400` (dark) |

---

## Responsive Breakpoints

| Breakpoint | Width | Layout Behaviour |
|---|---|---|
| Base (mobile) | `< 640px` | Full-width card, tighter padding (`p-4`) |
| `sm` | `≥ 640px` | Card padding increases (`sm:p-6`) |
| `md` | `≥ 768px` | Comfortable spacing |
| `lg` | `≥ 1024px` | Max-width card centered, generous padding (`lg:p-8`) |

---

## Accessibility

- **Semantic HTML**: `<main>`, `<form>`, `<label>`, `<button>` used correctly throughout
- **ARIA Roles**: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `role="dialog"`, `role="alert"`, `role="status"`
- **ARIA Attributes**: `aria-selected`, `aria-controls`, `aria-modal`, `aria-labelledby`, `aria-invalid`, `aria-describedby`, `aria-label`
- **Keyboard Navigation**: All interactive elements are tabbable; Escape closes modals; Enter submits forms
- **Focus Management**: Modal auto-focuses its close button; `focus-visible` rings on every interactive element
- **Error Announcements**: Validation errors use `role="alert"` for screen-reader announcement
- **Colour Contrast**: Text and background combinations meet WCAG AA standards
- **Reduced Motion**: Framer Motion respects the `prefers-reduced-motion` media query

---

## Customisation

### Changing the colour scheme

Edit the gradient classes in [src/components/layout/AuthLayout.tsx](src/components/layout/AuthLayout.tsx) and the button classes in [src/components/auth/LoginForm.tsx](src/components/auth/LoginForm.tsx) / [src/components/auth/RegisterForm.tsx](src/components/auth/RegisterForm.tsx). Search for `indigo` and `purple` to find all instances.

### Connecting real APIs

Replace the mock functions in [src/hooks/useAuth.ts](src/hooks/useAuth.ts) with actual `fetch` / `axios` calls to your backend. The hook already manages loading, error, and success states.

### Adjusting validation rules

Edit the Zod schemas in [src/schemas/loginSchema.ts](src/schemas/loginSchema.ts) and [src/schemas/registerSchema.ts](src/schemas/registerSchema.ts). Changes are automatically reflected in form validation.

### Updating legal text

The Terms of Service and Privacy Policy content lives inline in [src/components/auth/RegisterForm.tsx](src/components/auth/RegisterForm.tsx) inside the `<LegalModal>` children. Replace the placeholder paragraphs with your actual legal text.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-change`
3. Commit your changes: `git commit -m "Add my change"`
4. Push to the branch: `git push origin feature/my-change`
5. Open a Pull Request

Please ensure your code passes `npm run build` with zero errors before submitting.

---

## License

This project is licensed under the **MIT License** — you are free to use, modify, and distribute it for personal and commercial projects.

---

<div align="center">

Made with ❤️ by [WAIYAH](https://github.com/WAIYAH)

⭐ Star this repo if you found it useful!

</div>
