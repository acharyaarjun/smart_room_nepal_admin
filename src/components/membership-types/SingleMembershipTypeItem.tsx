"use client";
import { MembershipType } from "@/types/membership-type";
import { useState } from "react";
import { Modal } from "@/components/modal";
import { toast } from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import { AddMembershipTypeModal } from "@/components/membership-types";

const SingleMembershipTypeItem = ({
  item,
  index,
  refresh,
  openDeleteModal,
  updateItemInList,
}: {
  item: MembershipType;
  index: number;
  refresh: () => void;
  openDeleteModal: (category: MembershipType) => void;
  updateItemInList: (updatedItem: MembershipType, id: number) => void;
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [singleItem, setSingleItem] = useState<MembershipType | undefined>(
    undefined
  );

  const openModal = async () => {
    try {
      setSingleItem(item);
      setShowModal(true);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Category could not be fetched"
      );
    }
  };

  const closeModal = () => setShowModal(false);

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
          {item.name}
        </td>
        <td scope="row" className="pr-6 py-4  text-gray-700 dark:text-gray-300">
          <div className="min-w-60">{item.description}</div>
        </td>
        <td
          scope="row"
          className="pr-6 py-4  whitespace-nowrap text-gray-700 dark:text-gray-300"
        >
          {item.limit} Rooms
        </td>
        <td
          scope="row"
          className="pr-6 py-4  whitespace-nowrap text-gray-700 dark:text-gray-300"
        >
          Rs. {item.price}
        </td>
        <td className="pr-6 py-4  whitespace-nowrap text-gray-700 dark:text-gray-300 ">
          <div className="flex gap-2 items-center">
            <button
              title="Edit"
              type="button"
              className="cursor-pointer bg-primary p-2 text-white rounded-sm"
              onClick={openModal}
            >
              <FaEdit />
            </button>
            <button
              type="button"
              title="Delete"
              onClick={() => openDeleteModal(item)}
              className="cursor-pointer bg-danger dark:bg-red-500 p-2 text-white rounded-sm"
            >
              <BiTrash />
            </button>
          </div>
          <Modal isOpen={showModal}>
            <AddMembershipTypeModal
              closeModal={closeModal}
              membershipType={singleItem}
              refresh={refresh}
              updateItemInList={updateItemInList}
            />
          </Modal>
        </td>
      </tr>
    </>
  );
};

export default SingleMembershipTypeItem;
