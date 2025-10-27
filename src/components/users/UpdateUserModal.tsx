"use client";
import { UserResponse } from "@/types/user";
import { IoClose } from "react-icons/io5";
import useUser from "./use-user";
import { FormSelectElement, SingleLineLoading } from "@/components/common";
import UserStatus from "@/enums/userStatus";

interface UpdateUserModalProps {
  closeModal: () => void;
  user: UserResponse | undefined;
  refresh?: () => void;
  updateItemInList: (updatedItem: UserResponse, id: number) => void;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  closeModal,
  user,
  refresh,
  updateItemInList,
}) => {
  const {
    status,
    isEnabled,
    statusError,
    isLoading,
    validateStatus,
    handleChange,
    handleIsEnabledChange,
    onSubmit,
  } = useUser({
    closeModal,
    user,
    refresh,
    updateItemInList,
  });

  if (!user) return null;

  const statusOptions = Object.values(UserStatus).map((status) => ({
    value: status,
    label: status.charAt(0).toUpperCase() + status.slice(1),
  }));

  return (
    <div className="relative z-[50] p-2 w-full max-w-5xl">
      <div className="bg-white dark:bg-dark rounded-lg shadow-3xl">
        <div className="flex items-center justify-between p-4 md:px-5 md:py-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Update User
          </h3>
          <button
            title="close"
            type="button"
            className="cursor-pointer text-gray-500 dark:text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={closeModal}
          >
            <IoClose />
          </button>
        </div>
        {/* Modal body */}
        <div className="p-4 md:p-5 w-full">
          <form onSubmit={onSubmit}>
            {/* User Info (Read-only) */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Updating user:{" "}
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {user.fullName}
                </span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Email:{" "}
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {user.email}
                </span>
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-3 my-2">
              {/* Status Field */}
              <FormSelectElement
                title="Status"
                name="status"
                value={status}
                onChange={handleChange}
                onBlur={validateStatus}
                error={statusError}
                options={statusOptions}
                isRequired
              />

              {/* Is Enabled Field */}
              <div className="mb-[10px] w-full">
                <label className="mb-[9px] inline-block text-[15px] font-medium leading-[1] tracking-[0] text-gray-600 dark:text-gray-400">
                  Account Enabled
                  <span className="text-danger">*</span>
                </label>
                <div className="flex items-center space-x-4 h-[46px]">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="isEnabled"
                      value="true"
                      checked={isEnabled}
                      onChange={handleIsEnabledChange}
                      className="mr-2 cursor-pointer w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="text-gray-700 dark:text-gray-300 text-[14px]">
                      Enabled
                    </span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="isEnabled"
                      value="false"
                      checked={!isEnabled}
                      onChange={handleIsEnabledChange}
                      className="mr-2 cursor-pointer w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="text-gray-700 dark:text-gray-300 text-[14px]">
                      Disabled
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              {isLoading ? (
                <div className="py-1.5 px-3 bg-primary text-[14px] text-white rounded-md my-4">
                  <SingleLineLoading color="text-white" />
                </div>
              ) : (
                <button
                  type="submit"
                  className="py-1.5 px-3 bg-primary text-[14px] text-white rounded-md my-4 cursor-pointer"
                >
                  Update User
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserModal;
