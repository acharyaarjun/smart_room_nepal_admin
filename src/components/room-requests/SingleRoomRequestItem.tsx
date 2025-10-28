"use client";
import { Request } from "@/types/request";
import { useState } from "react";
import { Modal } from "@/components/modal";
import { FaEye } from "react-icons/fa";
import { ViewRoomRequestModal } from "@/components/room-requests";

const SingleRoomRequestItem = ({
  item,
  index,
}: {
  item: Request;
  index: number;
}) => {
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [singleItem, setSingleItem] = useState<Request | undefined>(undefined);

  const openViewModal = () => {
    setSingleItem(item);
    setShowViewModal(true);
  };

  const closeViewModal = () => setShowViewModal(false);

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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "text-green-600 dark:text-green-400";
      case "pending":
        return "text-yellow-600 dark:text-yellow-400";
      case "rejected":
        return "text-red-600 dark:text-red-400";
      case "canceled":
        return "text-gray-600 dark:text-gray-400";
      case "ongoing":
        return "text-blue-600 dark:text-blue-400";
      case "completed":
        return "text-purple-600 dark:text-purple-400";
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
          {item.token}
        </td>
        <td
          scope="row"
          className="pr-6 py-4  whitespace-nowrap text-gray-700 dark:text-gray-300"
        >
          {item.room?.name || "N/A"}
        </td>
        <td
          scope="row"
          className="pr-6 py-4  whitespace-nowrap text-gray-700 dark:text-gray-300"
        >
          {item.user?.fullName || "N/A"}
        </td>
        <td
          scope="row"
          className="pr-6 py-4  whitespace-nowrap text-gray-700 dark:text-gray-300"
        >
          {formatCurrency(item.price)}
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
          {formatDate(item.createdAt)}
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
          </div>
          <Modal isOpen={showViewModal}>
            <ViewRoomRequestModal
              closeModal={closeViewModal}
              request={singleItem}
            />
          </Modal>
        </td>
      </tr>
    </>
  );
};

export default SingleRoomRequestItem;
