"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GoX } from "react-icons/go";

const LightBox = ({
  mimeType,
  url,
  closeBox,
}: {
  mimeType: string;
  url: string;
  closeBox: () => void;
}) => {
  const [open, setOpen] = useState<boolean>(true);
  // if lightbox is open, set body height to screen height
  useEffect(() => {
    if (open) {
      document.body.style.height = "100vh";
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.height = "auto";
      document.body.style.overflowY = "auto";
    }

    // Clean up function to reset the styles when the component is unmounted
    return () => {
      document.body.style.height = "auto";
      document.body.style.overflowY = "auto";
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-300 ${
        open ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`max-w-screen relative h-full max-h-screen w-full transform transition-transform duration-300 ${
          open ? "scale-100" : "scale-95"
        }`}
      >
        {/* Close Button */}
        <button
          title="Close Button"
          type="button"
          className="absolute right-4 top-4 z-[999] rounded-full bg-white p-2 transition-colors hover:bg-gray-200"
          onClick={() => {
            setOpen(false);
            setTimeout(closeBox, 300); // Allow the animation to complete before closing
          }}
        >
          <GoX className="text-2xl text-black" />
        </button>

        {/* Image */}
        <div className="flex h-full w-full items-center justify-center">
          {mimeType.includes("image") ? (
            <Image
              src={url}
              alt={mimeType}
              className="rounded-lg"
              fill
              sizes="100vw"
              style={{
                objectFit: "contain",
              }}
            />
          ) : (
            <video
              src={url}
              controls
              crossOrigin="anonymous"
              className="h-full w-full rounded-lg object-contain"
            ></video>
          )}
        </div>
      </div>
    </div>
  );
};
export default LightBox;
