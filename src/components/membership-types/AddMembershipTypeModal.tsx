"use client";
import {
  FormInputElement,
  FormDefaultTextareaElement,
  SingleLineLoading,
} from "@/components/common";
import { MembershipType } from "@/types/membership-type";
import React from "react";
import { IoClose } from "react-icons/io5";
import { useMembershipType } from "@/components/membership-types";

type Props = {
  closeModal: () => void;
  membershipType?: MembershipType;
  refresh?: () => void;
  updateItemInList: (updatedItem: MembershipType, id: number) => void;
};

export default function AddMembershipTypeModal({
  closeModal,
  membershipType,
  refresh,
  updateItemInList,
}: Props) {
  const {
    name,
    description,
    limit,
    price,
    features,
    nameError,
    descriptionError,
    limitError,
    priceError,
    featuresError,
    isLoading,
    validateName,
    validateDescription,
    validateLimit,
    validatePrice,
    validateFeatures,
    handleChange,
    onSubmit,
  } = useMembershipType({
    closeModal,
    membershipType,
    refresh: refresh,
    updateItemInList,
  });

  return (
    <>
      <div className="relative z-[50] p-2 w-full max-w-5xl">
        <div className="bg-white dark:bg-dark rounded-lg shadow-3xl">
          <div className="flex items-center justify-between p-4 md:px-5 md:py-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {membershipType ? "Update" : "Add"} Membership Type
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
              <FormInputElement
                title="Name"
                value={name ?? ""}
                name="name"
                error={nameError}
                onBlur={validateName}
                onChange={handleChange}
                placeholder="Enter membership type name"
                isRequired={true}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
                <FormInputElement
                  title="Limit"
                  value={limit?.toString() ?? ""}
                  name="limit"
                  type="number"
                  error={limitError}
                  onBlur={validateLimit}
                  onChange={handleChange}
                  placeholder="Enter limit"
                  isRequired={true}
                />
                <FormInputElement
                  title="Price"
                  value={price?.toString() ?? ""}
                  name="price"
                  type="number"
                  error={priceError}
                  onBlur={validatePrice}
                  onChange={handleChange}
                  placeholder="Enter price"
                  isRequired={true}
                />
              </div>
              <FormDefaultTextareaElement
                title="Features"
                value={features ?? ""}
                name="features"
                error={featuresError}
                onBlur={validateFeatures}
                onChange={handleChange}
                placeholder="Enter features (comma separated)"
                isRequired={true}
              />
              <div className="my-4">
                <FormDefaultTextareaElement
                  title="Description"
                  value={description ?? ""}
                  name="description"
                  error={descriptionError}
                  onBlur={validateDescription}
                  onChange={handleChange}
                  placeholder="Enter description"
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
                    {membershipType ? "Update" : "Add"} Membership Type
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
