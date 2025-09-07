"use client";
import Image from "next/image";
import profilePic from "@/assets/images/others/blank-profile.jpg";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useLogin } from "@/hooks";
import { useState } from "react";
// import { FiUser, FiSettings } from "react-icons/fi";

export default function ProfileMenuCard() {
  const user = useSelector((state: RootState) => state.auth.user);

  const { handleLogout, isLoading } = useLogin();

  const handleLogoutClick = () => {
    handleLogout();
  };

  const [imageError, setImageError] = useState<boolean>(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="absolute top-16 right-6 border border-gray-300 bg-white dark:bg-dark dark:border-gray-700 rounded-md shadow-md min-w-72">
      <div className="flex flex-col text-center gap-2 items-center border-b border-b-gray-300 dark:border-graycolor p-4">
        <div className="border-[1px] h-[80px] w-[80px] bg-white dark:bg-dark border-primary/40 rounded-full flex justify-center items-center cursor-pointer overflow-hidden">
          {user && user.userProfile.avatar && !imageError ? (
            <Image
              height={250}
              width={250}
              alt={user.fullName}
              src={user.userProfile.avatar.url}
              className="object-contain h-[80px] w-[80px]"
              onError={handleImageError}
              priority={true}
              quality={100}
            />
          ) : (
            <Image
              width={250}
              height={250}
              alt={"Admin User"}
              src={profilePic}
              className="object-contain h-[80px] w-[80px]"
              priority={true}
              quality={100}
            />
          )}
        </div>

        <div className="flex flex-col">
          <h3 className="font-medium leading-3 mt-1 text-[15px]">
            {user ? user.fullName : "Admin User"}
          </h3>
          <span className="text-[12px] text-graycolor">
            {user ? user.email : "admin@admin.com"}
          </span>
        </div>
      </div>
      <div className="p-2">
        {/* Updated ul with li */}
        {/* <ul className="text-[14px] font-[400] text-gray-600 dark:text-gray-300 list-none p-0 m-0">
          <li className="py-3 flex items-center gap-3 hover:bg-primary/10 px-3 rounded-md cursor-pointer">
            <div className="flex justify-center items-center bg-primary/10 h-[40px] w-[40px] rounded-md">
              <FiUser className="text-primary" />
            </div>
            <div>
              <span className="block font-medium">Profile</span>
              <span className="block text-[12px] text-gray-500">
                View and update your profile
              </span>
            </div>
          </li>
          <li className="py-3 flex items-center gap-3 hover:bg-primary/10 px-3 rounded-md cursor-pointer">
            <div className="flex justify-center items-center bg-primary/10 h-[40px] w-[40px] rounded-md">
              <FiSettings className="text-primary" />
            </div>
            <div>
              <span className="block font-medium">Settings</span>
              <span className="block text-[12px] text-gray-500">
                Adjust your account settings
              </span>
            </div>
          </li>
        </ul> */}
        <button
          className="w-full bg-primary py-2 mt-4 text-white rounded-lg text-[14px] font-[600] cursor-pointer"
          onClick={handleLogoutClick}
        >
          {isLoading ? "Signing Out..." : "Sign Out"}
        </button>
      </div>
    </div>
  );
}
