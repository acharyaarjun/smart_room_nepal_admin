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
    <div className="fixed inset-0 bg-black/60 z-[999] flex justify-center items-start md:items-center overflow-y-auto w-screen h-screen">
      <div className="bg-white dark:bg-gray-800 shadow-lg overflow-y-auto w-screen md:w-[80vw] lg:w-[70vw] h-screen md:h-[80vh] relative">
        <div className="px-6 header w-full flex justify-between py-3 border-b-[2px] border-gray-200 dark:border-gray-600 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Select Icon
          </h2>
          <button
            title="close"
            type="button"
            onClick={onClose}
            className="absolute top-2 z-[2] right-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition p-1"
          >
            <IoClose size={24} />
          </button>
        </div>
        <div className="w-full my-2">
          <div className="px-6 flex flex-wrap items-center justify-center gap-5 ">
            {Object.entries(IconData).map(([key]) => (
              <div
                className="h-[80px] w-[80px] sm:h-[90px] sm:w-[90px] flex items-center justify-center shadow-lg  rounded-md cursor-pointer group"
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
        {newIcon !== activeIcon ? (
          <button
            type="button"
            onClick={confirmChange}
            className="absolute bottom-4 right-4 bg-primary text-white px-5 text-sm py-2 cursor-pointer rounded-md hover:bg-primary/90 transition"
          >
            Confirm
          </button>
        ) : (
          <button
            type="button"
            onClick={onClose}
            className="absolute bottom-4 right-4 bg-danger text-white px-5 text-sm py-2 cursor-pointer rounded-md hover:bg-danger/90 transition"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}
