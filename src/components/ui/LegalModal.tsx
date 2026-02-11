import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface LegalModalProps {
  /** Whether the modal is visible */
  open: boolean;
  /** Callback when the user closes the modal */
  onClose: () => void;
  /** Modal title */
  title: string;
  /** Body contents — placeholder legal text */
  children: React.ReactNode;
}

/**
 * Accessible modal used for Terms of Service / Privacy Policy content.
 * Traps focus while open and closes on Escape or backdrop click.
 */
export default function LegalModal({
  open,
  onClose,
  title,
  children,
}: LegalModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  /* Focus the close button when the modal opens */
  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-modal-title"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-2xl bg-white dark:bg-gray-900 shadow-2xl p-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2
                id="legal-modal-title"
                className="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                {title}
              </h2>
              <button
                ref={closeRef}
                onClick={onClose}
                className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 text-sm leading-relaxed space-y-3">
              {children}
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-colors"
              >
                I understand
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
