"use client";
import {
  FormInputElement,
  IconComponent,
  SingleLineLoading,
} from "@/components/common";
import { Amenity } from "@/types/amenity";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useAmenity } from "@/components/amenity";
import { IconsModal } from "@/components/modal";
import { BiPencil } from "react-icons/bi";

type Props = {
  closeModal: () => void;
  amenity?: Amenity;
  refresh?: () => void;
  updateItemInList: (updatedItem: Amenity, id: number) => void;
};

export default function AddAmenityModal({
  closeModal,
  amenity,
  refresh,
  updateItemInList,
}: Props) {
  const {
    name,
    icon,
    nameError,
    iconError,
    isLoading,
    validateName,
    handleChange,
    changeIcon,
    onSubmit,
  } = useAmenity({
    closeModal,
    amenity,
    refresh: refresh,
    updateItemInList,
  });

  const [showIconModal, setShowIconModal] = useState<boolean>(false);

  const openIconModal = () => {
    setShowIconModal(true);
  };

  const closeIconModal = () => {
    setShowIconModal(false);
  };

  return (
    <>
      <div className="relative z-[50]   p-2 w-full max-w-5xl">
        <div className="bg-white dark:bg-dark rounded-lg shadow-3xl">
          <div className="flex items-center justify-between p-4 md:px-5 md:py-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {amenity ? "Update" : "Add"} Amenity
            </h3>
            <button
              title="close"
              type="button"
              className="cursor-pointer text-gray-500 dark:text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
              onClick={closeModal}
            >
              <IoClose />
            </button>
          </div>
          {/* Modal body */}
          <div className="p-4 md:p-5 w-full">
            <form className="" onSubmit={onSubmit}>
              <div className="flex flex-col md:flex-row gap-3 my-2">
                <div>
                  <p className="mb-[9px] inline-block text-[15px] font-medium leading-[1] tracking-[0] text-gray-600 dark:text-gray-400">
                    Icon
                    <span className="text-danger">*</span>
                  </p>
                  <div
                    className="flex items-center justify-between relative group hover:cursor-pointer"
                    onClick={openIconModal}
                  >
                    <div
                      className={`h-60 md:h-36 w-full md:w-36 bg-transparent rounded-[5px] border-[1px] border-solid  px-[15px] text-[14px] dark:text-gray-400 text-gray-600 outline-none shadow-sm flex items-center justify-center ${
                        iconError
                          ? "border-danger"
                          : "border-gray-300 dark:border-gray-600"
                      } `}
                    >
                      <IconComponent icon={icon} size="size-20" />
                    </div>
                    <div className="absolute right-0 bottom-0 w-6 h-6 flex items-center justify-center bg-green-300 rounded-tl-sm group-hover:bg-green-400">
                      <BiPencil className="text-white size-4" />
                    </div>
                  </div>
                  {iconError && (
                    <span className="mt-1 w-full text-[12px]  italic text-danger">
                      {iconError}
                    </span>
                  )}
                </div>
                <FormInputElement
                  title="Name"
                  value={name ?? ""}
                  name="name"
                  error={nameError}
                  onBlur={validateName}
                  onChange={handleChange}
                  placeholder="Enter name"
                  isRequired={true}
                />
              </div>
              <div className="flex justify-end">
                {isLoading ? (
                  <div className="py-1.5 px-3 bg-primary text-[14px]  text-white rounded-md my-4">
                    <SingleLineLoading color="text-white" />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="py-1.5 px-3 bg-primary text-[14px]  text-white rounded-md my-4 cursor-pointer"
                  >
                    {amenity ? "Update" : "Add"} Amenity
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      {showIconModal && (
        <IconsModal
          onClose={closeIconModal}
          activeIcon={icon}
          changeActiveIcon={changeIcon}
        />
      )}
    </>
  );
}
