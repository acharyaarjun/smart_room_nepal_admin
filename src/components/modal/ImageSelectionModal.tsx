"use client";
import { getMedias } from "@/services/mediaService";
import { OrginalMedia } from "@/types/media";
import React, { useEffect, useState } from "react";
import {
  FilePreview,
  FileUpload,
  Pagination,
  SingleLineLoading,
} from "@/components/common";
import { IoClose } from "react-icons/io5";

type ModalProps = {
  onClose: () => void;
  onSelect: (url: string, id: number) => void;
  mimeType?: string;
};

const ImageSelectionModal: React.FC<ModalProps> = ({
  onClose,
  onSelect,
  mimeType,
}) => {
  const [items, setItems] = useState<OrginalMedia[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 36;
  const [totalPages, setTotalPages] = useState<number>(0);
  const [refresh, setRefresh] = useState<boolean>(false);
  const refreshPage = () => {
    setRefresh(!refresh);
  };

  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const getItems = async () => {
      try {
        setLoading(true);
        setErrorMessage(null);
        const itemsData = await getMedias({
          page: currentPage,
          size: itemsPerPage,
          mimeType: mimeType ? mimeType : "image",
        });
        setItems(itemsData.data.data);
        setTotalPages(itemsData.data.totalPages);
        setCurrentPage(itemsData.data.currentPage);
      } catch (error: any) {
        setErrorMessage(
          error.response?.data?.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-[999] flex justify-center items-start md:items-cente overflow-y-auto w-screen h-screen">
      <div className="bg-white dark:bg-gray-800 shadow-lg overflow-y-auto w-screen h-screen relative">
        <div className="header w-full flex justify-between py-3 border-b-[2px] border-gray-200 dark:border-gray-600 px-4 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Upload File
          </h2>
          <button
            title="close"
            type="button"
            onClick={onClose}
            className="absolute top-2 z-[2] right-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition p-1"
          >
            <IoClose size={24} />
          </button>
        </div>
        <div className="w-full my-4">
          <FileUpload
            refreshPage={refreshPage}
            selectImage={onSelect}
            accept={mimeType ? mimeType : undefined}
          />
        </div>
        <div className="w-full my-2">
          {loading ? (
            <div className="px-6">
              <div className="flex justify-center items-center h-[250px] bg-gray-50 dark:bg-gray-800 rounded-lg">
                <SingleLineLoading />
              </div>
            </div>
          ) : errorMessage ? (
            <div className="px-6">
              <div className="flex justify-center items-center h-[250px] bg-danger/10 text-danger rounded-lg text-sm italic">
                <p>{errorMessage}</p>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="px-6">
              <div className="flex justify-center items-center h-[250px] bg-danger/10 text-danger rounded-lg text-sm italic">
                <p>No data found!</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-start items-center flex-wrap gap-3 px-6">
              <>
                {items.map((item: OrginalMedia, index: number) => (
                  <FilePreview
                    key={index}
                    id={item.id}
                    url={item.url}
                    mimeType={item.mimeType}
                    fileName={item.fileName}
                    height="h-36"
                    width="w-36"
                    refresh={refreshPage}
                    selectImage={onSelect}
                  />
                ))}

                <div className="w-full flex justify-center items-center mt-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                  />
                </div>
              </>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageSelectionModal;
