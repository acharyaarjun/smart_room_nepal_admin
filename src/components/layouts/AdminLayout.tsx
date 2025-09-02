"use client";
import React, { useState } from "react";
import { Header } from "@/components/common/header";
import { Sidebar } from "@/components/common/sidebar";
import { Footer } from "@/components/common/footer";
// import { RequireAuthProvider } from "@/providers";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openFullSidebar, setOpenFullSidebar] = useState<boolean>(true);
  const handleOpenfullSidebar = () => {
    setOpenFullSidebar(!openFullSidebar);
  };

  return (
    <div className="flex w-full max-w-screen">
      <div className="hidden md:inline-block top-0 left-0 fixed">
        <Sidebar
          openFullSidebar={openFullSidebar}
          handleOpenfullSidebar={handleOpenfullSidebar}
        />
      </div>
      <div
        className={`w-full transition-all duration-300 ease-in-out
    ${
      openFullSidebar
        ? "md:w-[calc(100%-265px)] md:ml-[265px] "
        : "md:w-[calc(100%-85px)] md:ml-[85px]"
    }
  `}
      >
        <Header
          openFullSidebar={openFullSidebar}
          handleOpenfullSidebar={handleOpenfullSidebar}
        />
        {children}
        <Footer />
      </div>
    </div>
  );
}
