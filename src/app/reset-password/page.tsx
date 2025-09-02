import { ResetPassword } from "@/components/auth";
import { Spinner } from "@/components/common";
import React, { Suspense } from "react";

export default function page() {
  return (
    <Suspense
      fallback={
        <div className="flex jusitfy-center items-center h-screen w-screen">
          <Spinner />
        </div>
      }
    >
      <ResetPassword />
    </Suspense>
  );
}
