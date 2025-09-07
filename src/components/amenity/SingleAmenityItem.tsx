"use client";
import { Amenity } from "@/types/amenity";
import { useState } from "react";
import { Modal } from "@/components/modal";
import { toast } from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import { IconComponent } from "@/components/common";
import { AddAmenityModal } from "@/components/amenity";

const SingleAmenityItem = ({
  item,
  index,
  refresh,
  openDeleteModal,
  updateItemInList,
}: {
  item: Amenity;
  index: number;
  refresh: () => void;
  openDeleteModal: (category: Amenity) => void;
  updateItemInList: (updatedItem: Amenity, id: number) => void;
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [singleItem, setSingleItem] = useState<Amenity | undefined>(undefined);

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
        className="border-b border-dashed border-gray-300 dark:border-gray-700 "
      >
        <td
          scope="row"
          className="pr-6 py-4 font-normal whitespace-nowrap text-gray-700 dark:text-gray-300 "
        >
          {index + 1}
        </td>
        <td
          scope="row"
          className="py-4 pr-6 font-normal whitespace-nowrap text-gray-700 dark:text-gray-300 w-[100px]"
        >
          <div className="flex items-center justify-center h-[75px] w-[75px] border-[1px] border-gray-200 dark:border-gray-600 rounded-sm">
            <IconComponent icon={item.icon} />
          </div>
        </td>
        <td
          scope="row"
          className="pr-6 py-4 font-normal whitespace-nowrap text-gray-700 dark:text-gray-300"
        >
          {item.name}
        </td>
        <td className="pr-6 py-4 font-normal whitespace-nowrap text-gray-700 dark:text-gray-300 ">
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
            <AddAmenityModal
              closeModal={closeModal}
              amenity={singleItem}
              refresh={refresh}
              updateItemInList={updateItemInList}
            />
          </Modal>
        </td>
      </tr>
    </>
  );
};

export default SingleAmenityItem;
