"use client";
import { Membership } from "@/types/membership";
import { useState } from "react";
import { Modal } from "@/components/modal";
import { FaEdit, FaEye } from "react-icons/fa";
import {
  UpdateMembershipModal,
  ViewMembershipModal,
} from "@/components/memberships";

const SingleMembershipItem = ({
  item,
  index,
  refresh,
  updateItemInList,
}: {
  item: Membership;
  index: number;
  refresh: () => void;
  updateItemInList: (updatedItem: Membership, id: number) => void;
}) => {
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [singleItem, setSingleItem] = useState<Membership | undefined>(
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
      case "completed":
        return "text-green-600 dark:text-green-400";
      case "pending":
        return "text-yellow-600 dark:text-yellow-400";
      case "failed":
        return "text-red-600 dark:text-red-400";
      case "refunded":
        return "text-blue-600 dark:text-blue-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return `NPR ${amount.toLocaleString()}`;
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
          {item.transactionId}
        </td>
        <td
          scope="row"
          className="pr-6 py-4  whitespace-nowrap text-gray-700 dark:text-gray-300"
        >
          {item.membershipType?.name || "N/A"}
        </td>
        <td
          scope="row"
          className="pr-6 py-4  whitespace-nowrap text-gray-700 dark:text-gray-300"
        >
          {formatCurrency(item.amount)}
        </td>
        <td
          scope="row"
          className="pr-6 py-4  whitespace-nowrap text-gray-700 dark:text-gray-300"
        >
          <span className="capitalize">{item.paymentMethod}</span>
        </td>
        <td
          scope="row"
          className="pr-6 py-4  whitespace-nowrap text-gray-700 dark:text-gray-300"
        >
          <span
            className={`capitalize font-semibold ${getStatusColor(
              item.status
            )}`}
          >
            {item.status}
          </span>
        </td>
        <td
          scope="row"
          className="pr-6 py-4  whitespace-nowrap text-gray-700 dark:text-gray-300"
        >
          {formatDate(item.paymentDate)}
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
            <ViewMembershipModal
              closeModal={closeViewModal}
              membership={singleItem}
            />
          </Modal>

          <Modal isOpen={showEditModal}>
            <UpdateMembershipModal
              closeModal={closeEditModal}
              membership={singleItem}
              refresh={refresh}
              updateItemInList={updateItemInList}
            />
          </Modal>
        </td>
      </tr>
    </>
  );
};

export default SingleMembershipItem;
