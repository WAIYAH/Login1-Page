import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary that catches render errors and displays a fallback UI.
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 p-6">
          <div className="max-w-md text-center space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Something went wrong
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {this.state.error?.message ?? "An unexpected error occurred."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
