"use client";
import { IconData } from "@/data/icon";
import { IoClose } from "react-icons/io5";
import { IconComponent } from "@/components/common";
import { useState } from "react";

type ModalProps = {
  onClose: () => void;
  activeIcon?: string;
  changeActiveIcon: (icon: string) => void;
};

export default function IconsModal({
  onClose,
  activeIcon,
  changeActiveIcon,
}: ModalProps) {
  const [newIcon, setNewIcon] = useState<string>(activeIcon || "");

  const confirmChange = () => {
    if (newIcon !== activeIcon) {
      changeActiveIcon(newIcon);
      onClose();
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex justify-center items-start md:items-center w-screen h-screen bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-dark shadow-lg w-screen md:w-[80vw] lg:w-[70vw] h-screen md:h-[90vh] relative flex flex-col rounded-md overflow-hidden">
        {/* Header */}
        <div className="px-6 py-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-600 shadow-sm sticky top-0 bg-white dark:bg-dark z-10">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Select Icon
          </h2>
          <button
            title="close"
            type="button"
            onClick={onClose}
            className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition p-1"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {Object.entries(IconData).map(([key]) => (
              <div
                className="h-[80px] w-[80px] sm:h-[90px] sm:w-[90px] flex items-center justify-center shadow-lg border border-gray-300 dark:border-gray-700 rounded-md cursor-pointer group"
                key={key}
                onClick={() => setNewIcon(key)}
              >
                <IconComponent
                  icon={key}
                  size="size-6 sm:size-8"
                  className={`${
                    newIcon === key && "text-primary"
                  } group-hover:text-primary`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white dark:bg-dark border-t border-gray-200 dark:border-gray-600 px-6 py-3 flex justify-end z-10">
          {newIcon !== activeIcon ? (
            <button
              type="button"
              onClick={confirmChange}
              className="bg-primary text-white px-5 text-sm py-2 rounded-md hover:bg-primary/90 transition"
            >
              Confirm
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="bg-danger text-white px-5 text-sm py-2 rounded-md hover:bg-danger/90 transition"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
