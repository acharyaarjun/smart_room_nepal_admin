"use client";
import { deleteMedia } from "@/services/mediaService";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaDownload } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { DeleteModal } from "@/components/modal";
import { PdfLoader } from "@/components/common";

interface FilePreviewModalProps {
  id?: number;
  url: string;
  mimeType: string;
  fileName: string;
  closeModal: () => void; // Function to handle closing the modal
  refresh?: () => void; // Optional function to refresh the parent component
  selectImage?: (url: string, id: number) => void;
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
  url,
  id = 0,
  mimeType,
  fileName,
  closeModal,
  refresh,
  selectImage,
}) => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const [isCopied, setIsCopied] = useState<boolean>(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Download the file from the URL, mimeType, and fileName
  const handleDownload = () => {
    setIsDownloading(true); // Set isDownloading to true when download starts

    // Fetch the file data from the URL
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to download file: ${response.statusText}`);
        }
        return response.blob(); // Convert the response to a Blob
      })
      .then((blob) => {
        // Create a Blob with the correct mimeType
        const fileBlob = new Blob([blob], { type: mimeType });
        const blobUrl = window.URL.createObjectURL(fileBlob);

        // Create an anchor tag to trigger the download
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = fileName; // Set the file name for download

        // Append the link to the DOM, trigger the download, then remove the link
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Cleanup the URL object
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch((error) => {
        console.error("Error downloading the file:", error);
      })
      .finally(() => {
        setIsDownloading(false); // Reset isDownloading after the download completes or fails
      });
  };

  const renderPreview = () => {
    if (mimeType.startsWith("image/")) {
      return (
        <Image
          width={1000}
          height={1000}
          src={url}
          alt={fileName}
          className="w-full h-full max-h-[80vh] object-contain"
        />
      );
    }
    if (mimeType.startsWith("video/")) {
      return (
        <video controls className="w-full h-full" crossOrigin="anonymous">
          <source src={url} type={mimeType} />
          Your browser does not support the video tag.
        </video>
      );
    }
    if (mimeType.startsWith("audio/")) {
      return (
        <div className="w-full min-h-[190px] h-full flex justify-center items-center rounded-md bg-gray-200 dark:bg-gray-900 px-6">
          <audio controls className="w-full" crossOrigin="anonymous">
            <source src={url} type={mimeType} />
            Your browser does not support the audio tag.
          </audio>
        </div>
      );
    }
    if (mimeType === "application/pdf") {
      return <PdfLoader pdfUrl={url} />;
    }
    return (
      <div className="text-center text-gray-800 dark:text-gray-300 italic text-sm">
        <p>This file cannot be previewed.</p>
      </div>
    );
  };

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const openDeleteModal = () => setShowDeleteModal(true);
  const closeDeleteModal = () => setShowDeleteModal(false);

  const initiateDelete = async (id: number) => {
    try {
      await deleteMedia(id);
      closeDeleteModal();
      closeModal();
      if (refresh) refresh();
      toast.success("Media deleted successfully", {
        id: "toast",
      });
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Media could not be deleted",
        {
          id: "toast",
        }
      );
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-[999] flex justify-center items-start md:items-center h-screen overflow-y-auto w-screen p-3">
        <div className="bg-white dark:bg-gray-800 overflow-x-hidden shadow-lg max-w-6xl w-full relative">
          {/* Close Button */}
          <div className="header w-full flex justify-between py-3 border-b-[2px] border-gray-200 dark:border-gray-600 px-4 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Attachment Details
            </h2>
            <button
              title="close"
              type="button"
              onClick={() => closeModal()}
              className="absolute top-2 z-[2] right-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition p-1"
            >
              <IoClose size={24} />
            </button>
          </div>

          <div className="flex flex-col md:flex-row w-full ">
            {/* Left Section: File Preview */}
            <div className="w-full md:w-[60%] p-4 h-auto min-h-[200px] max-h-[95vh] overflow-hidden border-b-[1px] md:border-r-[1px] md:border-b-[0px] border-gray-300 dark:border-gray-500 flex justify-center items-center">
              <div className="w-full min-h-[190px] h-full flex justify-center items-center rounded-md bg-gray-200 dark:bg-gray-900">
                {renderPreview()}
              </div>
            </div>

            {/* Right Section: File Details */}
            <div className="w-full md:w-[40%] p-5 flex flex-col leading-relaxed whitespace-normal">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                File Info
              </h2>

              {/* File Info */}
              <div className="mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">
                  <strong>File Type:</strong> {mimeType}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">
                  <strong>File Name:</strong> {fileName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  <strong>File URL:</strong>
                  <br />
                  <input
                    title="file"
                    type="text"
                    value={url}
                    readOnly
                    disabled
                    className=" w-full p-2 mt-1 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-500 rounded-md"
                  />
                </p>
              </div>
              <div className="flex flex-wrap w-full items-center gap-2 mt-4">
                {/* Copy URL Button */}
                <button
                  onClick={copyToClipboard}
                  className="px-4 flex justify-center items-center rounded-sm bg-blue-500 text-white text-sm h-[32px] hover:bg-blue-600 transition"
                >
                  {isCopied ? "Copied!" : "Copy URL"}
                </button>
                {selectImage && (
                  <button
                    onClick={() => selectImage(url, id)}
                    className="px-4 flex justify-center items-center rounded-sm bg-secondary text-white text-sm h-[32px] hover:bg-secondary/80 transition"
                  >
                    Use File
                  </button>
                )}
                <button
                  onClick={handleDownload}
                  className={`px-4 flex justify-center items-center rounded-sm bg-green-500 text-white text-sm h-[32px] hover:bg-green-600 transition ${
                    isDownloading ? "bg-green-300 cursor-not-allowed" : ""
                  }`}
                  disabled={isDownloading} // Disable the button when downloading
                >
                  {isDownloading ? <span>Downloading...</span> : <FaDownload />}
                </button>
                {/* Delete Button */}
                {id !== 0 && (
                  <button
                    onClick={openDeleteModal}
                    className="px-4 flex justify-center items-center rounded-sm bg-red-500 text-white text-sm h-[32px] hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                )}
              </div>

              {id !== 0 && (
                <div className="mt-3 w-full break-words text-danger text-xs italic leading-relaxed whitespace-normal">
                  Note: If you delete this file, it will be permanently removed
                  and all references to it will be broken.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        initiateDelete={() => {
          initiateDelete(id ?? 0);
        }}
        closeModal={closeDeleteModal}
        title="Delete Media"
        description="Are you sure you want to delete this media?"
      />
    </>
  );
};

export default FilePreviewModal;
