import React from "react";

export default function Footer() {
  const date = new Date().getFullYear();
  return (
    <div className="h-8 px-4 sm:px-6 md:px-8 w-full">
      <p className="text-[14px] text-graycolor">
        {date} - &copy;{" "}
        <span className=" text-hardgray dark:text-lightgray">
          All Rights Reserved
        </span>
      </p>
    </div>
  );
}
