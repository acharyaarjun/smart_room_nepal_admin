"use client";

import { BiError } from "react-icons/bi";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-dark text-center px-4">
      <BiError className="text-6xl text-red-500 dark:text-red-400 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
        {process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong!"}
      </h2>
      <p className="text-gray-500 dark:text-gray-300 mb-6">
        Please try refreshing the page.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors duration-300"
      >
        Try Again
      </button>
    </div>
  );
}
