"use client";
import { District } from "@/types/district";
import { useState } from "react";
import { Modal } from "@/components/modal";
import { toast } from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { BiImageAlt, BiTrash } from "react-icons/bi";
import { Lightbox } from "@/components/common";
import { AddDistrictModal } from "@/components/districts";
import Image from "next/image";

const SingleDistrictItem = ({
  item,
  index,
  refresh,
  openDeleteModal,
}: {
  item: District;
  index: number;
  refresh: () => void;
  openDeleteModal: (category: District) => void;
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [singleItem, setSingleItem] = useState<District | undefined>(undefined);

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

  const [imageError, setImageError] = useState(false);

  const [showLightBox, setShowLightBox] = useState(false);

  const openLightBox = () => {
    setShowLightBox(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightBox = () => {
    setShowLightBox(false);
    document.body.style.overflow = "auto";
  };

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
            {!imageError && item.image ? (
              <Image
                width={100}
                height={100}
                alt={item.name}
                src={item.image.url}
                className={`h-[75px] w-[75px] rounded-sm ${
                  item.image ? "object-cover cursor-pointer" : "object-cover"
                } rounded-md"`}
                onClick={openLightBox}
                onError={() => setImageError(true)}
              />
            ) : (
              <BiImageAlt className="text-gray-400 text-[44px]" />
            )}
          </div>
        </td>
        <td
          scope="row"
          className="pr-6 py-4 font-normal whitespace-nowrap text-gray-700 dark:text-gray-300"
        >
          {item.name}
        </td>
        <td
          scope="row"
          className="pr-6 py-4 font-normal whitespace-nowrap text-gray-700 dark:text-gray-300"
        >
          {item.description}
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
            <AddDistrictModal
              closeModal={closeModal}
              district={singleItem}
              refresh={refresh}
            />
          </Modal>
          {showLightBox && item.image !== null && (
            <Lightbox media={item.image} closeLightbox={closeLightBox} />
          )}
        </td>
      </tr>
    </>
  );
};

export default SingleDistrictItem;
