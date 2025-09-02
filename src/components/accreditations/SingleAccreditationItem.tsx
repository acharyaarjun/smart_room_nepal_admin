"use client";
import { Accreditation } from "@/types/accreditation";
import Image from "next/image";
import { SingleLineLoading, Switch } from "@/components/common";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { changeAccreditationStatus } from "@/services/accreditationService";
import defaultImage from "@/assets/images/others/image-placeholder.png";
import { Media } from "@/types/media";

const SingleAccreditationItem = ({
  item,
  index,
  updateAccreditationStatusInList,
  openDeleteModal,
  openMediaModal,
  setValueInModal,
}: {
  item: Accreditation;
  index: number;
  refresh: () => void;
  updateAccreditationStatusInList: (id: number, status: boolean) => void;
  openDeleteModal: (acc: Accreditation) => void;
  openMediaModal: (media: Media) => void;
  setValueInModal: (acc: Accreditation) => void;
}) => {
  const [loading, setLoading] = useState(false);

  const openModal = async () => {
    try {
      setValueInModal(item);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Accreditation could not be fetched"
      );
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (id: number, status: boolean) => {
    toast.promise(
      handleUpdateAccreditations(id, status)
        .then(() => {
          updateAccreditationStatusInList(id, !status);
        })
        .catch((error) => {
          throw new Error(
            error.response?.data?.message ||
              "Accreditation status could not be changed"
          );
        }),
      {
        loading: "Updating Accreditation status...",
        success: "Accreditation status updated successfully!",
        error: (error: any) => error.message || "An error occurred.",
      },
      {
        id: "toast",
      }
    );
  };

  const handleUpdateAccreditations = async (id: number, status: boolean) => {
    await changeAccreditationStatus(!status, id);
  };

  const [imageError, setImageError] = useState<boolean>(false);

  return (
    <>
      <tr
        key={item.id}
        className="border-b border-dashed border-light dark:border-dark "
      >
        <td
          scope="row"
          className="pr-6 py-4 font-normal whitespace-nowrap text-graycolor "
        >
          {index + 1}
        </td>
        <th scope="row" className="py-4 pr-6 font-normal whitespace-nowrap">
          <div className="h-[75px] w-[75px]">
            <Image
              width={100}
              height={100}
              alt={item.title ?? "accreditation image"}
              src={
                imageError
                  ? defaultImage
                  : item.media
                  ? item.media.url
                  : defaultImage
              }
              className={`h-[75px] w-[75px] border-[1px] border-gray-200 dark:border-gray-600 rounded-sm ${
                item.media ? "object-cover cursor-pointer" : "object-cover"
              } rounded-md"`}
              onClick={
                item && !imageError && item.media
                  ? () => openMediaModal(item.media as Media)
                  : () => {}
              }
              onError={() => setImageError(true)}
            />
          </div>
        </th>
        <td
          scope="row"
          className="pr-6 py-4 font-normal whitespace-nowrap text-graycolor"
        >
          {item.title}
        </td>
        <td
          scope="row"
          className="pr-6 py-4 font-normal whitespace-nowrap text-graycolor max-w-[300px] overflow-hidden"
        >
          {item.order}
        </td>
        <td className="px-6 py-4 font-normal whitespace-nowrap text-graycolor">
          <Switch
            status={item.isActive ?? false}
            id={item.id}
            changeStatus={() => {
              changeStatus(item.id, item.isActive);
            }}
          />
        </td>
        <td className="px-6 py-4 font-normal whitespace-nowrap text-graycolor ">
          <div className="flex gap-2 items-center">
            <button
              title="Edit"
              type="button"
              className="bg-bluecolor p-2 text-white rounded-sm"
              onClick={openModal}
            >
              {loading ? (
                <SingleLineLoading height="h-[14px]" width="w-[14px]" />
              ) : (
                <BiEdit />
              )}
            </button>
            <button
              type="button"
              title="Delete"
              onClick={() => openDeleteModal(item)}
              className="bg-danger dark:bg-red-500 p-2 text-white rounded-sm"
            >
              <BiTrash />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default SingleAccreditationItem;
