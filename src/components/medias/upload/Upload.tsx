import React from "react";
import Link from "next/link";
import { FileUpload } from "@/components/common";

export default function Upload() {
  return (
    <div className="">
      <div className="px-6 w-full flex justify-between items-center">
        <div className="my-5">
          <h3 className="font-semibold text-[17.5px] leading-5">Medias</h3>
          <Link href="/dashboard" className="text-[14px] text-graycolor">
            Home
          </Link>{" "}
          <span className="text-[14px] text-graycolor">-</span>{" "}
          <span className="text-[14px] text-graycolor">Medias</span>
        </div>
      </div>
      <FileUpload />
    </div>
  );
}
