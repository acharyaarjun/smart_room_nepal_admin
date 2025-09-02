"use client";

import React, { useState, useEffect, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiDotsVertical } from "react-icons/hi";
import { Sidebar } from "@/components/common/sidebar";
import { ProfileMenuCard } from "@/components/common/header";
import { ThemeToggler } from "@/utils";

import Image from "next/image";

export default function Header(
  { openFullSidebar, handleOpenfullSidebar } = {
    openFullSidebar: true,
    handleOpenfullSidebar: () => {},
  }
) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownButtonRef = useRef<HTMLButtonElement>(null);

  const closeSidebar = () => setOpenSidebar(false);
  const toggleProfileMenu = () => setOpenProfile((prev) => !prev);
  const toggleMobileDropdown = () => setOpenMobileDropdown((prev) => !prev);

  // Add shadow to the header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close profile menu and sidebar on scroll or window resize
  useEffect(() => {
    const handleCloseOnScrollOrResize = () => {
      setOpenProfile(false);
      setOpenSidebar(false);
      setOpenMobileDropdown(false); // Close mobile dropdown too
    };

    window.addEventListener("resize", handleCloseOnScrollOrResize);

    return () => {
      window.removeEventListener("resize", handleCloseOnScrollOrResize);
    };
  }, []);

  // Close profile menu on clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !profileRef.current?.contains(event.target as Node) &&
        !profileMenuRef.current?.contains(event.target as Node)
      ) {
        setOpenProfile(false);
      }
    };

    if (openProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openProfile]);

  // Close mobile dropdown on clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !mobileDropdownRef.current?.contains(event.target as Node) &&
        !mobileDropdownButtonRef.current?.contains(event.target as Node)
      ) {
        setOpenMobileDropdown(false);
      }
    };

    if (openMobileDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMobileDropdown]);

  return (
    <>
      <header
        className={`w-full h-20 flex items-center sticky dark:border-b-[1px] border-transparent top-0 z-[998] transition-shadow ${
          isScrolled
            ? "shadow-sm dark:border-b-[1px] dark:border-gray-700 bg-white dark:bg-darkbg"
            : ""
        }`}
      >
        <div className="px-6 w-full flex justify-between items-center">
          {/* Desktop buttons */}
          <div className="items-center justify-start gap-2 flex-wrap hidden lg:flex"></div>

          {/* Mobile dropdown */}
          <div className="relative lg:hidden">
            <button
              ref={mobileDropdownButtonRef}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={toggleMobileDropdown}
            >
              <HiDotsVertical className="text-[20px] text-primary" />
            </button>
          </div>

          <div className="gap-6 items-center flex md:hidden">
            <GiHamburgerMenu
              onClick={() => setOpenSidebar(true)}
              className="text-[20px] text-primary font-semibold cursor-pointer"
            />
            <div className="h-[40px] w-[40px] overflow-hidden flex justify-center items-center">
              <Image
                src={"/logo.png"}
                alt="logo"
                height={400}
                width={400}
                className="object-contain h-[40px] w-[40px] rounded-md"
              />
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <ThemeToggler />
            <div
              ref={profileRef}
              className="dark:bg-darkbg border-primary/30 flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-md border-[1px] bg-white"
              onClick={toggleProfileMenu}
            >
              <Image
                width={250}
                height={250}
                alt="Admin User"
                src={"/logo.png"}
                className="h-[25px] w-[25px] rounded-lg object-contain"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
        {openProfile && (
          <div ref={profileMenuRef}>
            <ProfileMenuCard />
          </div>
        )}
      </header>
      {openSidebar && (
        <>
          <div className="flex fixed top-0 left-0 md:hidden dark:bg-darkbg bg-white z-[999] h-full">
            <Sidebar
              openFullSidebar={openFullSidebar}
              handleOpenfullSidebar={handleOpenfullSidebar}
              isMobile={true}
            />
          </div>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeSidebar}
          ></div>
        </>
      )}
    </>
  );
}
