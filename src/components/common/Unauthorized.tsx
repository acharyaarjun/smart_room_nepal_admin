"use client";
import { RootState } from "@/redux/store";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function Unauthorized() {
  const { user } = useSelector((state: RootState) => state.auth);

  let href = "";
  if (user && user.role === "admin") {
    href = "/dashboard";
  } else {
    href = "/";
  }

  return (
    <div className="flex min-h-screen min-w-screen flex-col items-center justify-center p-4 dark:bg-dark">
      <div className="w-full max-w-[500px] rounded-lg  p-8 text-center shadow-lg bg-white dark:bg-slate-900">
        <h1 className="mb-4 text-4xl font-bold text-primary">
          401 - Unauthorized
        </h1>
        <p className="mb-10 text-gray-700 dark:text-gray-500">
          You are not authorized to access this page. Please go back to the home
        </p>
        <Link
          className="btn w-full cursor-pointer bg-primary px-4 py-2 rounded-lg "
          href={href}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
