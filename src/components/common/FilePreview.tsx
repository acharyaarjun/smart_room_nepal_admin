"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BsEye } from "react-icons/bs";
import { FilePreviewModal, GetIconFromMimeType } from "@/components/common";

interface FilePreviewProps {
  id?: number;
  url: string;
  mimeType: string;
  height?: string; // Tailwind height classes (e.g., "h-48", "h-full")
  width?: string; // Tailwind width classes (e.g., "w-48", "w-full")
  fileName?: string;
  refresh?: () => void;
  selectImage?: (url: string, id: number) => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({
  id,
  url,
  mimeType,
  height = "h-48",
  width = "w-48",
  fileName = "File",
  refresh,
  selectImage,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      {/* Main Preview */}
      <div
        className={`${height} ${width} border border-gray-200 dark:border-gray-500 rounded-md relative group overflow-hidden bg-gray-50 dark:bg-gray-700`}
        onClick={() => setIsModalOpen(true)}
      >
        {/* File Preview */}
        <div className="w-full h-full flex items-center justify-center">
          {mimeType.startsWith("image") ? (
            <Image
              width={500}
              height={500}
              src={url}
              alt={fileName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-[64px]">
              <GetIconFromMimeType mimeType={mimeType} />
            </div>
          )}
        </div>

        {!mimeType.startsWith("image/") && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs text-center py-[5px] leading-[20px] line-clamp-1">
            {fileName}
          </div>
        )}

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer">
          <BsEye className="text-white text-xl" />
        </div>
      </div>

      {/* Modal for Full View */}
      {isModalOpen && (
        <FilePreviewModal
          id={id}
          url={url}
          mimeType={mimeType}
          fileName={fileName}
          closeModal={() => setIsModalOpen(false)}
          refresh={refresh}
          selectImage={selectImage}
        />
      )}
    </>
  );
};

export default FilePreview;
