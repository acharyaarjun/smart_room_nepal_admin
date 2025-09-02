"use client";
import Link from "next/link";
import React from "react";

export default function Dashboard() {
  return (
    <div className="w-full min-h-[calc(100vh-112px)] max-h-full">
      <div className="px-6 w-full flex justify-between items-center">
        <div className="my-5">
          <h3 className="text-[17.5px] leading-5 text-gray-800 dark:text-gray-200 font-semibold">
            Dashboard
          </h3>
          <Link
            href="/dashboard"
            className="text-[14px] text-gray-800 dark:text-gray-200 font-medium"
          >
            Home
          </Link>{" "}
          <span className="text-[14px] text-gray-700 dark:text-gray-300">
            -
          </span>{" "}
          <span className="text-[14px] text-gray-700 dark:text-gray-300 font-medium">
            Dashboard
          </span>
        </div>
      </div>
      <div className="px-6 mb-4 w-full h-full">dashboard</div>
    </div>
  );
}
