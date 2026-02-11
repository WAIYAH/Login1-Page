import AuthLayout from "./components/layout/AuthLayout";
import Auth from "./components/auth/Auth";
import ErrorBoundary from "./components/ErrorBoundary";

/**
 * Root application component.
 */
export default function App() {
  return (
    <ErrorBoundary>
      <AuthLayout>
        <Auth />
      </AuthLayout>
    </ErrorBoundary>
  );
}
