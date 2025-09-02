"use client";
import { useAccreditation } from "@/hooks";
import { Accreditation } from "@/types/accreditation";
import Image from "next/image";
import React from "react";
import { BiPencil } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import {
  FormInputElement,
  FormSelectElement,
  SingleLineLoading,
} from "@/components/common";
import { ImageSelectionModal } from "@/components/modal";

type Props = {
  closeModal: () => void;
  accreditation?: Accreditation;
  refresh?: () => void;
};

export default function AddAccreditationModal({
  closeModal,
  accreditation,
  refresh,
}: Props) {
  const {
    title,
    order,
    isActive,
    image,
    titleError,
    isActiveError,
    orderError,
    mediaError,
    isLoading,
    handleChange,
    validateTitle,
    validateOrder,
    validateIsActive,
    onSubmit,
    selectImage,
    mediaModal,
    openMediaModal,
    closeMediaModal,
  } = useAccreditation({
    closeModal: closeModal,
    accreditation: accreditation,
    refresh: refresh,
  });

  const isActiveOptions = [
    { value: "true", label: "Active" },
    { value: "false", label: "Hidden" },
  ];

  return (
    <>
      <div className="relative z-[50]   p-2 w-full max-w-5xl mt-100">
        <div className="bg-white dark:bg-darkbg rounded-lg shadow-3xl">
          <div className="flex items-center justify-between p-4 md:px-5 md:py-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {accreditation ? "Update" : "Add"} Accrediation
            </h3>
            <button
              title="close"
              type="button"
              className="text-gray-500 dark:text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
              onClick={closeModal}
            >
              <IoClose />
            </button>
          </div>
          {/* Modal body */}
          <div className="p-4 md:p-5 w-full">
            <form className="" onSubmit={onSubmit}>
              <div className="flex flex-col jusitfy-center gap-3 my-2">
                <div className="flex justify-center items-center w-auto">
                  <div className="relative">
                    <Image
                      src={image}
                      height={200}
                      width={200}
                      className={`object-cover h-[175px] w-[175px] rounded-sm border-[1px] border-solid ${
                        mediaError
                          ? "border-danger"
                          : "border-[#eee] dark:border-gray-500"
                      }`}
                      alt="User Image"
                    />
                    <div
                      className="absolute bottom-0 right-0 bg-primary/30 text-white rounded-sm p-2 cursor-pointer hover:bg-primary/50"
                      onClick={openMediaModal}
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
              <div className="flex flex-col gap-3 my-2">
                <FormInputElement
                  title="Title"
                  value={title ?? ""}
                  name="title"
                  error={titleError}
                  onBlur={validateTitle}
                  onChange={handleChange}
                  placeholder="Title"
                  isRequired={true}
                />
                <FormInputElement
                  title="Order"
                  value={order ?? ""}
                  name="order"
                  type="number"
                  error={orderError}
                  onBlur={validateOrder}
                  onChange={handleChange}
                  placeholder="Order"
                  isRequired={true}
                />

                <FormSelectElement
                  title="Status"
                  name="isActive"
                  value={isActive?.toString() ?? ""}
                  options={isActiveOptions}
                  onChange={handleChange}
                  onBlur={validateIsActive}
                  error={isActiveError}
                  isRequired={false}
                />
              </div>
              <div className="flex justify-end">
                {isLoading ? (
                  <div className="py-1.5 px-3 bg-bluecolor text-[14px] font-normal text-white rounded-md my-4">
                    <SingleLineLoading />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="py-1.5 px-3 bg-bluecolor text-[14px] font-normal text-white rounded-md my-4"
                  >
                    {accreditation ? "Update" : "Add"} Accrediation
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {mediaModal && (
        <ImageSelectionModal onClose={closeMediaModal} onSelect={selectImage} />
      )}
    </>
  );
}
