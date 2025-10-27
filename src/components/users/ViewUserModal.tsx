"use client";
import { UserResponse } from "@/types/user";
import { IoClose } from "react-icons/io5";
import Image from "next/image";

interface ViewUserModalProps {
  closeModal: () => void;
  user: UserResponse | undefined;
}

const ViewUserModal: React.FC<ViewUserModalProps> = ({ closeModal, user }) => {
  if (!user) return null;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="relative z-[50] p-2 w-full max-w-5xl">
      <div className="bg-white dark:bg-dark rounded-lg shadow-3xl max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 md:px-5 md:py-4 border-b rounded-t dark:border-gray-600 sticky top-0 bg-white dark:bg-dark z-10">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            User Details
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
          <div className="space-y-6">
            {/* Avatar Section */}
            {user.userProfile?.avatar && (
              <div className="flex justify-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700">
                  <Image
                    src={user.userProfile.avatar.url}
                    alt={user.fullName}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Full Name
                </label>
                <p className="text-gray-800 dark:text-gray-200 mt-1">
                  {user.fullName}
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Username
                </label>
                <p className="text-gray-800 dark:text-gray-200 mt-1">
                  {user.username}
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Email
                </label>
                <p className="text-gray-800 dark:text-gray-200 mt-1">
                  {user.email}
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Phone
                </label>
                <p className="text-gray-800 dark:text-gray-200 mt-1">
                  {user.userProfile?.phone || "N/A"}
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Role
                </label>
                <p className="text-gray-800 dark:text-gray-200 mt-1 capitalize">
                  {user.role}
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Gender
                </label>
                <p className="text-gray-800 dark:text-gray-200 mt-1 capitalize">
                  {user.userProfile?.gender || "N/A"}
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Date of Birth
                </label>
                <p className="text-gray-800 dark:text-gray-200 mt-1">
                  {formatDate(user.userProfile?.dob)}
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Occupation Status
                </label>
                <p className="text-gray-800 dark:text-gray-200 mt-1 capitalize">
                  {user.userProfile?.occupationStatus || "N/A"}
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Marital Status
                </label>
                <p className="text-gray-800 dark:text-gray-200 mt-1 capitalize">
                  {user.userProfile?.maritalStatus || "N/A"}
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Login Method
                </label>
                <p className="text-gray-800 dark:text-gray-200 mt-1 capitalize">
                  {user.loginMethod}
                </p>
              </div>
            </div>

            {/* Status Information */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                Status Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Account Status
                  </label>
                  <p className="text-gray-800 dark:text-gray-200 mt-1 capitalize">
                    {user.userProfile?.status || "N/A"}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Enabled
                  </label>
                  <p className="text-gray-800 dark:text-gray-200 mt-1">
                    {user.isEnabled ? "Yes" : "No"}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Email Verified
                  </label>
                  <p className="text-gray-800 dark:text-gray-200 mt-1">
                    {user.isEmailVerified ? "Yes" : "No"}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Phone Verified
                  </label>
                  <p className="text-gray-800 dark:text-gray-200 mt-1">
                    {user.userProfile?.isPhoneVerified ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>

            {/* Document Section */}
            {user.userProfile?.document && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Document
                </h3>
                <a
                  href={user.userProfile.document.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View Document
                </a>
              </div>
            )}

            {/* Timestamps */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                Account Timestamps
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Created At
                  </label>
                  <p className="text-gray-800 dark:text-gray-200 mt-1">
                    {formatDate(user.createdAt)}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Updated At
                  </label>
                  <p className="text-gray-800 dark:text-gray-200 mt-1">
                    {formatDate(user.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserModal;
