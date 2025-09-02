"use client";

import { Spinner } from "@/components/common";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Redirect() {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, [router]);

  return (
    <div className="flex jusitfy-center items-center h-screen w-screen">
      <Spinner />
    </div>
  );
}
