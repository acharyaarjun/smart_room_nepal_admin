"use client";

import { BiGhost } from "react-icons/bi";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-dark text-center px-4">
      <BiGhost className="text-7xl text-gray-500 dark:text-gray-300 mb-4 animate-bounce" />
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
        404 - Page Not Found
      </h2>
      <p className="text-gray-500 dark:text-gray-300 mb-6">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or has been
        moved.
      </p>
      <button
        onClick={() => router.push("/")}
        className="px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors duration-300"
      >
        Go to Homepage
      </button>
    </div>
  );
}
