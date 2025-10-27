"use client";
import { Media } from "@/types/media";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GoX } from "react-icons/go";

interface Props {
  media: Media;
  closeLightbox: () => void;
}

const Lightbox = ({ media, closeLightbox }: Props) => {
  const [open, setOpen] = useState<boolean>(true);

  // Disable background scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(closeLightbox, 300); // wait for animation
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-300 bg-black/20 dark:bg-white/20 `}
      onClick={handleClose}
    >
      <div
        className={`relative mx-4 flex max-h-[90vh] max-w-[90vw] w-full items-center justify-center transform transition-all duration-300 ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Media */}
        <div className="relative flex items-center justify-center rounded-lg h-full max-h-[90vh] w-auto object-contain">
          {/* Close Button */}
          <button
            title="Close"
            type="button"
            className="absolute -right-3 -top-3 z-[1000] rounded-full bg-primary p-2 shadow-lg transition hover:rotate-90"
            onClick={handleClose}
          >
            <GoX className="text-2xl text-white" />
          </button>
          {media.mimeType.includes("image") ? (
            <Image
              src={media.url}
              alt={media.mimeType}
              className="rounded-lg h-full max-h-[90vh] w-auto object-contain"
              width={1200}
              height={800}
            />
          ) : (
            <video
              src={media.url}
              controls
              crossOrigin="anonymous"
              className="max-h-[90vh] w-full rounded-lg"
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Lightbox;
