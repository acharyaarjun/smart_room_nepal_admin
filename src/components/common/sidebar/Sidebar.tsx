"use client";
import "@/styles/sidebar.css";
import React, { useEffect } from "react";
import Link from "next/link";
import { LuArrowLeftToLine, LuArrowRightToLine } from "react-icons/lu";
import { SidebarLink } from "@/components/common/sidebar";
import { MenuData } from "@/data/menu";
import Image from "next/image";

interface Props {
  openFullSidebar: boolean;
  handleOpenfullSidebar: () => void;
  isMobile?: boolean;
}

export default function Sidebar({
  openFullSidebar,
  handleOpenfullSidebar,
  isMobile,
}: Props) {
  useEffect(() => {
    if (!isMobile || !openFullSidebar) return;

    const handleClose = () => {
      handleOpenfullSidebar();
    };

    window.addEventListener("scroll", handleClose);
    window.addEventListener("resize", handleClose);

    return () => {
      window.removeEventListener("scroll", handleClose);
      window.removeEventListener("resize", handleClose);
    };
  }, [isMobile, openFullSidebar, handleOpenfullSidebar]);
  return (
    <div
      className={`sidebar sticky top-0 z-[999] dark:bg-darkbg min-h-screen h-full border-r-[1px] border-r-slate-300 dark:border-r-slate-700 ${
        openFullSidebar ? "sidebar-expanded" : "sidebar-collapsed"
      } `}
    >
      <div className="relative flex h-20 w-full items-center justify-center border-b border-dashed border-gray-300 dark:border-b-slate-600 ">
        <div className="pt-2 pb-1 px-3 flex w-[100%] h-full items-center justify-center ">
          <Link
            href="/dashboard"
            className={`${
              openFullSidebar ? "h-[50px]" : "h-[50px]"
            }  overflow-hidden`}
          >
            <Image
              src={"/logo.png"}
              alt="logo-nrn"
              height={50}
              width={50}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </Link>
        </div>
        <div
          onClick={handleOpenfullSidebar}
          className="p-1.5 bg-white/80 dark:bg-gray-700 w-fit text-gray-400 rounded-md right-0 z-[99999999999999] absolute shadow-md dark:shadow-xl cursor-pointer"
        >
          {openFullSidebar ? <LuArrowLeftToLine /> : <LuArrowRightToLine />}
        </div>
      </div>

      <div className="my-2 px-3 h-[calc(100vh-112px)] overflow-y-auto">
        <div className="flex flex-col my-4">
          {MenuData.map((menu) => {
            return (
              <SidebarLink
                key={menu.id}
                menu={menu}
                fullbar={openFullSidebar}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
