"use client";
import { Menu } from "@/types/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const SidebarLink = ({ menu, fullbar }: { menu: Menu; fullbar: boolean }) => {
  const pathname = usePathname();
  const checkPath = menu.link.split("/")[1];
  const subMenuStart = menu.subMenu
    ? menu.subMenu.some((subMenu: Menu) => pathname.includes(`${subMenu.link}`))
    : false;
  const [subMenu, setSubMenu] = useState<boolean>(subMenuStart);
  const handleSubMenu = () => {
    setSubMenu(!subMenu);
  };

  return (
    <>
      <div className="relative">
        {menu.subMenu && menu.subMenu.length >= 1 ? (
          <div
            onClick={handleSubMenu}
            className={`flex justify-between items-center text-gray-800 dark:text-gray-400 rounded-md px-4 hover:text-gray-600 dark:hover:text-gray-100 text-[15px] cursor-pointer ${
              pathname.endsWith(`/${checkPath}`) &&
              "bg-primary/20 text-gray-600 dark:text-gray-200"
            } `}
          >
            <div className="flex gap-3 py-[10px] items-center cursor-pointer">
              {menu.icon && <menu.icon className="text-[20px] opacity-80" />}
              {fullbar && (
                <span className="font-semibold overflow-hidden whitespace-nowrap">
                  {menu.name}
                </span>
              )}
            </div>
          </div>
        ) : (
          <Link
            href={menu.link}
            className={`flex justify-between items-center text-gray-800 dark:text-gray-400 rounded-md px-4 hover:text-gray-600 dark:hover:text-gray-100 text-[15px] cursor-pointer ${
              pathname.endsWith(`/${checkPath}`) &&
              "bg-primary/20 text-gray-600 dark:text-gray-200"
            } `}
          >
            <div className="flex gap-3 py-[10px] items-center cursor-pointer">
              {menu.icon && <menu.icon className="text-[20px] opacity-80" />}
              {fullbar && (
                <span className="font-semibold overflow-hidden whitespace-nowrap">
                  {menu.name}
                </span>
              )}
            </div>
          </Link>
        )}
        {menu.subMenu && (
          <div className="h-full cursor-pointer">
            <FaChevronDown
              className={`text-[13px] absolute top-4 right-3 ${
                !fullbar && "hidden"
              }`}
              onClick={handleSubMenu}
            />
          </div>
        )}
      </div>
      {(subMenu || !fullbar) && menu.subMenu && (
        <div className={`${fullbar ? "px-4" : "pl-2"}`}>
          {menu.subMenu.map((subMenu) => (
            <Link key={subMenu.id} href={subMenu.link}>
              <div
                className={`${
                  pathname.endsWith(`${subMenu.link}`) && "bg-gray-500/[.2]"
                } px-4 py-[8px] flex gap-3 items-center cursor-pointer text-gray-800 dark:text-gray-400 rounded-sm hover:text-gray-600 dark:hover:text-gray-100`}
              >
                {subMenu.icon && (
                  <subMenu.icon className="text-xl opacity-60" />
                )}
                {fullbar && (
                  <span className="font-semibold text-[14px] overflow-hidden whitespace-nowrap">
                    {subMenu.name}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default SidebarLink;
