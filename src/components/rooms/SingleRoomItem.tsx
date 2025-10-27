"use client";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Room } from "@/types/room";
import { ViewRoomModal, UpdateRoomModal } from "@/components/rooms";
import Image from "next/image";

const SingleRoomItem = ({
  item,
  index,
  updateItemInList,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  refresh,
}: {
  item: Room;
  index: number;
  updateItemInList: (updatedItem: Room, id: number) => void;
  refresh: () => void;
}) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const openViewModal = () => setIsViewModalOpen(true);
  const closeViewModal = () => setIsViewModalOpen(false);

  const openUpdateModal = () => setIsUpdateModalOpen(true);
  const closeUpdateModal = () => setIsUpdateModalOpen(false);

  const getStatusColor = (status?: string) => {
    if (!status) return "bg-gray-500/20 text-gray-600 dark:text-gray-400";

    switch (status.toLowerCase()) {
      case "pending":
        return "bg-warning/20 text-warning";
      case "approved":
        return "bg-success/20 text-success";
      case "maintenance":
        return "bg-orange-500/20 text-orange-500";
      case "disabled":
        return "bg-danger/20 text-danger";
      default:
        return "bg-gray-500/20 text-gray-600 dark:text-gray-400";
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <tr className="border-b  dark:border-gray-700 border-dashed">
        <th
          scope="row"
          className="pr-6 py-4 font-medium whitespace-nowrap text-gray-700 dark:text-gray-300"
        >
          {index + 1}
        </th>
        <td className="pr-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
          {item.image?.url ? (
            <Image
              src={item.image.url}
              alt={item.name}
              width={60}
              height={60}
              className="rounded-lg object-cover w-[60px] h-[60px]"
            />
          ) : (
            <div className="w-[60px] h-[60px] bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-xs">
              No Image
            </div>
          )}
        </td>
        <td className="pr-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
          <div>
            <div className="font-medium">{item.name}</div>
            {item.isFeatured && (
              <span className="text-xs bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 px-2 py-0.5 rounded-full mt-1 inline-block">
                Featured
              </span>
            )}
          </div>
        </td>
        <td className="pr-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
          {item.user?.fullName || "N/A"}
        </td>
        <td className="pr-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
          {item.district?.name || "N/A"}
        </td>
        <td className="pr-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
          {item.roomType
            ?.replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()) || "N/A"}
        </td>
        <td className="pr-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
          {formatPrice(item.price)}
        </td>
        <td className="pr-6 py-4 whitespace-nowrap">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
              item.roomStatus
            )}`}
          >
            {item.roomStatus
              ?.replace(/_/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase()) || "N/A"}
          </span>
        </td>

        <td className="pr-6 py-4 whitespace-nowrap">
          <div className="flex gap-2 items-center">
            <button
              title="View"
              type="button"
              onClick={openViewModal}
              className="cursor-pointer bg-success p-2 text-white rounded-sm"
            >
              <MdOutlineRemoveRedEye size={16} />
            </button>
            <button
              title="Edit"
              type="button"
              onClick={openUpdateModal}
              className="cursor-pointer bg-primary p-2 text-white rounded-sm"
            >
              <FaRegEdit size={16} />
            </button>
          </div>
          {isViewModalOpen && (
            <ViewRoomModal
              item={item}
              isOpen={isViewModalOpen}
              onClose={closeViewModal}
            />
          )}

          {isUpdateModalOpen && (
            <UpdateRoomModal
              item={item}
              isOpen={isUpdateModalOpen}
              onClose={closeUpdateModal}
              updateItemInList={updateItemInList}
            />
          )}
        </td>
      </tr>
    </>
  );
};

export default SingleRoomItem;
