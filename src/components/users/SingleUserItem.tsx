"use client";
import { UserResponse } from "@/types/user";
import { useState } from "react";
import { Modal } from "@/components/modal";
import { FaEdit, FaEye } from "react-icons/fa";
import { UpdateUserModal, ViewUserModal } from "@/components/users";

const SingleUserItem = ({
  item,
  index,
  refresh,
  updateItemInList,
}: {
  item: UserResponse;
  index: number;
  refresh: () => void;
  updateItemInList: (updatedItem: UserResponse, id: number) => void;
}) => {
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [singleItem, setSingleItem] = useState<UserResponse | undefined>(
    undefined
  );

  const openViewModal = () => {
    setSingleItem(item);
    setShowViewModal(true);
  };

  const closeViewModal = () => setShowViewModal(false);

  const openEditModal = () => {
    setSingleItem(item);
    setShowEditModal(true);
  };

  const closeEditModal = () => setShowEditModal(false);

  const getStatusColor = (status: string | undefined) => {
    if (!status) return "text-gray-600 dark:text-gray-400";
    switch (status.toLowerCase()) {
      case "active":
        return "text-green-600 dark:text-green-400";
      case "pending":
        return "text-yellow-600 dark:text-yellow-400";
      case "suspended":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <>
      <tr
        key={item.id}
        className="border-b border-dashed border-gray-300 dark:border-gray-700 font-medium "
      >
        <td
          scope="row"
          className="pr-6 py-4  whitespace-nowrap text-gray-700 dark:text-gray-300 "
        >
          {index + 1}
        </td>
        <td
          scope="row"
          className="pr-6 py-4  whitespace-nowrap text-gray-700 dark:text-gray-300"
        >
          {item.fullName}
        </td>
        <td
          scope="row"
          className="pr-6 py-4  whitespace-nowrap text-gray-700 dark:text-gray-300"
        >
          {item.email}
        </td>
        <td
          scope="row"
          className="pr-6 py-4  whitespace-nowrap text-gray-700 dark:text-gray-300"
        >
          <span className="capitalize">{item.role}</span>
        </td>
        <td
          scope="row"
          className="pr-6 py-4  whitespace-nowrap text-gray-700 dark:text-gray-300"
        >
          <span
            className={`capitalize font-semibold ${getStatusColor(
              item.userProfile?.status
            )}`}
          >
            {item.userProfile?.status || "N/A"}
          </span>
        </td>
        <td
          scope="row"
          className="pr-6 py-4  whitespace-nowrap text-gray-700 dark:text-gray-300"
        >
          <span
            className={`px-2 py-1 rounded text-xs ${
              item.isEnabled
                ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
            }`}
          >
            {item.isEnabled ? "Yes" : "No"}
          </span>
        </td>
        <td className="pr-6 py-4  whitespace-nowrap text-gray-700 dark:text-gray-300 ">
          <div className="flex gap-2 items-center">
            <button
              title="View"
              type="button"
              className="cursor-pointer bg-blue-500 dark:bg-blue-600 p-2 text-white rounded-sm"
              onClick={openViewModal}
            >
              <FaEye />
            </button>
            <button
              title="Edit"
              type="button"
              className="cursor-pointer bg-primary p-2 text-white rounded-sm"
              onClick={openEditModal}
            >
              <FaEdit />
            </button>
          </div>
          <Modal isOpen={showViewModal}>
            <ViewUserModal closeModal={closeViewModal} user={singleItem} />
          </Modal>

          <Modal isOpen={showEditModal}>
            <UpdateUserModal
              closeModal={closeEditModal}
              user={singleItem}
              refresh={refresh}
              updateItemInList={updateItemInList}
            />
          </Modal>
        </td>
      </tr>
    </>
  );
};

export default SingleUserItem;
