"use client";
import { Review } from "@/types/review";
import { useState } from "react";
import { Modal } from "@/components/modal";
import { FaEye, FaStar } from "react-icons/fa";
import { ViewReviewModal } from "@/components/reviews";

const SingleReviewItem = ({ item, index }: { item: Review; index: number }) => {
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [singleItem, setSingleItem] = useState<Review | undefined>(undefined);

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

  const truncateMessage = (message: string, maxLength: number = 50) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + "...";
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1 items-center">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={
              i < rating
                ? "text-yellow-500"
                : "text-gray-300 dark:text-gray-600"
            }
            size={14}
          />
        ))}
        <span className="ml-1">({rating})</span>
      </div>
    );
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
          {item.roomRequest?.room?.name || "N/A"}
        </td>
        <td
          scope="row"
          className="pr-6 py-4  whitespace-nowrap text-gray-700 dark:text-gray-300"
        >
          {item.roomRequest?.user?.fullName || "N/A"}
        </td>
        <td
          scope="row"
          className="pr-6 py-4  whitespace-nowrap text-gray-700 dark:text-gray-300"
        >
          {renderStars(item.rating)}
        </td>
        <td
          scope="row"
          className="pr-6 py-4  max-w-xs text-gray-700 dark:text-gray-300"
        >
          {truncateMessage(item.message)}
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
            <ViewReviewModal closeModal={closeViewModal} review={singleItem} />
          </Modal>
        </td>
      </tr>
    </>
  );
};

export default SingleReviewItem;
