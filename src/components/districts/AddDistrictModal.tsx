import {
  FormDefaultTextareaElement,
  FormImageElement,
  FormInputElement,
  SingleLineLoading,
} from "@/components/common";
import { District } from "@/types/district";
import React from "react";
import { IoClose } from "react-icons/io5";
import { useDistrict } from "@/components/districts";

type Props = {
  closeModal: () => void;
  district?: District;
  refresh?: () => void;
  updateItemInList: (updatedItem: District, id: number) => void;
};

export default function AddDistrictModal({
  closeModal,
  district,
  updateItemInList,
  refresh,
}: Props) {
  const {
    name,
    image,
    description,
    nameError,
    imageError,
    descriptionError,
    isLoading,
    validateName,
    validateDescription,
    handleChange,
    fileInputRef,
    chooseImage,
    handleImageChangeClick,
    onSubmit,
  } = useDistrict({
    closeModal: closeModal,
    district,
    updateItemInList,
    refresh: refresh,
  });

  return (
    <div className="relative z-[50]   p-2 w-full max-w-5xl">
      <div className="bg-white dark:bg-dark rounded-lg shadow-3xl">
        <div className="flex items-center justify-between p-4 md:px-5 md:py-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {district ? "Update" : "Add"} District
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
            <FormImageElement
              fileInputRef={fileInputRef}
              image={image}
              mediaError={imageError}
              chooseImage={chooseImage}
              handleImageChangeClick={handleImageChangeClick}
            />
            <div className="flex flex-col gap-3 my-2">
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
              <FormDefaultTextareaElement
                title="Description"
                name="description"
                value={description || ""}
                placeholder="Enter description"
                onChange={handleChange}
                error={descriptionError}
                isRequired={false}
                onBlur={validateDescription}
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
                  {district ? "Update" : "Add"} District
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
