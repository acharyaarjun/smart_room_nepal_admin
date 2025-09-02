import { Dashboard } from "@/components/dashboard";
import { RequireAuthProvider } from "@/providers";
import React from "react";

export default function page() {
  return (
    <RequireAuthProvider roles={["super-admin", "admin"]}>
      <Dashboard />
    </RequireAuthProvider>
  );
}
