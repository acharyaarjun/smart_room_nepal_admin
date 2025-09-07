import Image from "next/image";
import React from "react";
import { BiPencil } from "react-icons/bi";

interface Props {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  image: string;
  mediaError: string | null;
  chooseImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageChangeClick: () => void;
}

export default function FormImageElement({
  fileInputRef,
  image,
  mediaError,
  chooseImage,
  handleImageChangeClick,
}: Props) {
  return (
    <div className="flex flex-col justify-center gap-3 my-2">
      <div className="flex justify-center items-center w-auto">
        <div className="relative">
          <input
            title="Choose Image"
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={chooseImage}
          />
          <Image
            src={image}
            height={200}
            width={200}
            className={`object-cover h-[175px] w-[175px] bg-gray-200 dark:bg-transparent rounded-sm border-[1px] border-solid ${
              mediaError
                ? "border-danger"
                : "border-[#eee] dark:border-gray-500"
            }`}
            alt="User Image"
          />
          <div
            className="absolute bottom-0 right-0 bg-primary/30 text-white rounded-sm p-2 cursor-pointer hover:bg-primary/50"
            onClick={handleImageChangeClick}
          >
            <BiPencil />
          </div>
        </div>
      </div>
      {mediaError && (
        <span className="w-full text-center text-[12px] font-normal italic leading-[1] tracking-[0] text-danger">
          {mediaError}
        </span>
      )}
    </div>
  );
}
