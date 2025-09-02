import { Accreditations } from "@/components/accreditations";
import { RequireAuthProvider } from "@/providers";
import React from "react";

export default function page() {
  return (
    <RequireAuthProvider roles={["super-admin", "admin"]}>
      <Accreditations />
    </RequireAuthProvider>
  );
}
