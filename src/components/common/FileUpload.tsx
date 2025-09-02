"use client";
import React, { useState } from "react";
import { uploadMedia } from "@/services/mediaService"; // Assuming uploadMedia is defined elsewhere
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { GetIconFromMimeType } from "@/components/common";

interface FileWithProgress extends File {
  id: number;
  url: string;
  fileName: string;
  mimeType: string;
  path: string;
  progress: number;
  file: File;
}

interface Props {
  refreshPage?: () => void;
  selectImage?: (url: string, id: number) => void;
  accept?: string;
}

export default function FileUpload({
  refreshPage,
  selectImage,
  accept,
}: Props) {
  const [files, setFiles] = useState<FileWithProgress[]>([]);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Generate a unique ID for files
  const generateFileId = (): number =>
    Date.now() + Math.floor(Math.random() * 1000);

  // Upload a single file
  const uploadFile = async (file: FileWithProgress) => {
    setError("");
    setSuccessMessage("");

    try {
      // Call the API and process the response
      const response = await uploadMedia({
        file: file.file,
        onProgress: (progress: number) => {
          // Instead of modifying the file directly, create a new object with updated progress
          const updatedFile = { ...file, progress };
          setFiles((prevFiles) =>
            prevFiles.map((f) => (f.id === file.id ? updatedFile : f))
          );
        },
      });

      // Map the server response to the file metadata
      const uploadedFile = response.data;
      const updatedFile = {
        ...file,
        id: uploadedFile.id,
        url: uploadedFile.url,
        path: uploadedFile.path,
        mimeType: uploadedFile.mimeType,
        fileName: uploadedFile.fileName,
        progress: 100,
      };

      setFiles((prevFiles) => [
        ...prevFiles.filter((f) => f.id !== file.id),
        updatedFile,
      ]); // Update file with new metadata
      setSuccessMessage("File uploaded successfully!");

      if (refreshPage) refreshPage();
    } catch (err: any) {
      console.error(err);
      const updatedFile = { ...file, progress: -1 }; // Update file progress to reflect failure
      setFiles((prevFiles) => [
        ...prevFiles.filter((f) => f.id !== file.id),
        updatedFile,
      ]); // Update progress to failure
      setError(
        err.response?.data?.message || "File upload failed. Please try again."
      );
    }
  };

  // Handle drag-and-drop file selection
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    const newFile = Object.assign(droppedFile, {
      file: droppedFile,
      id: generateFileId(),
      progress: 0,
      url: "", // Initially empty URL
      fileName: droppedFile.name,
      mimeType: droppedFile.type,
      path: "",
    }) as FileWithProgress;

    setFiles([newFile]); // Set files state to the newly dropped file
    uploadFile(newFile);
  };

  // Prevent default behavior for drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Handle file selection via input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      const newFile = {
        ...selectedFile,
        file: selectedFile,
        id: generateFileId(),
        progress: 0,
        url: "", // Initially empty URL
        fileName: selectedFile.name,
        mimeType: selectedFile.type,
        path: "",
      } as FileWithProgress;

      setFiles([newFile]);
      uploadFile(newFile);
    }
  };

  const [isCopied, setIsCopied] = useState<boolean>(false);
  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const removeFile = (fileId: number) => {
    setError("");
    setSuccessMessage("");
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
  };

  return (
    <div className="px-6 mb-4 w-full overflow-x-auto">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="py-6 px-4 sm:px-6 md:px-8 dark:bg-gray-800 border-[1px] border-dashed border-gray-300 dark:border-gray-500 w-full flex flex-col justify-between shadow-customShadow"
      >
        <div className="w-full flex justify-center items-center flex-col gap-2 py-10">
          <p className="text-gray-600 dark:text-gray-300 text-lg text-center">
            Drag and drop a file to upload
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-sm text-center">
            or
          </p>
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="file-input"
            accept={accept ? accept : "*"}
          />
          <label
            htmlFor="file-input"
            className="border-[1px] border-secondary text-secondary hover:bg-secondary hover:text-white dark:border-gray-300 dark:text-gray-300 dark:hover:bg-gray-300 dark:hover:text-secondary text-sm rounded-md px-5 py-[6px] cursor-pointer"
          >
            Select File
          </label>
        </div>
      </div>
      {files.length > 0 && (
        <div className="mt-6">
          {files.map((file) => (
            <div
              key={file.id}
              className="my-4 bg-white shadow-card dark:bg-gray-900 p-3  rounded-md flex items-start justify-start gap-4 w-full max-w-[700px] relative"
            >
              {(successMessage || error) && (
                <button
                  onClick={() => removeFile(file.id)}
                  className="absolute top-2 right-2 text-danger"
                >
                  <IoClose className="text-sm" />
                </button>
              )}
              {file.url && (
                <>
                  {file.mimeType.startsWith("image/") ? (
                    <Image
                      src={file.url}
                      width={100}
                      height={100}
                      alt="File"
                      className="border-[1px] h-[100px] w-[100px] border-primary dark:border-gray-500 object-cover object-center"
                    />
                  ) : (
                    <div className="border-[1px] h-[100px] w-[100px] border-primary dark:border-gray-500 object-cover object-center flex justify-center items-center text-[64px]">
                      <GetIconFromMimeType mimeType={file.mimeType} />
                    </div>
                  )}
                </>
              )}
              <div className="w-[400px] flex h-full flex-col justify-start items-start gap-2">
                <p className="text-gray-600 dark:text-gray-400 italic">
                  {file.fileName}
                </p>
                <div
                  className={`relative w-full max:w-[400px] h-4  ${
                    error ? "bg-danger" : "bg-gray-200 dark:bg-gray-700"
                  }  rounded-lg`}
                >
                  <div
                    className={`h-4 rounded-lg ${
                      file.progress === 100
                        ? "bg-green-500"
                        : file.progress === -1
                        ? "bg-danger"
                        : "bg-blue-500"
                    }`}
                    style={{ width: `${Math.max(file.progress, 0)}%` }}
                  ></div>
                </div>
                <div className="w-full flex justify-start items-between gap-4">
                  {file.url && (
                    <>
                      <button
                        onClick={() => copyToClipboard(file.url)}
                        className="px-4 flex justify-center mt-1 items-center rounded-sm bg-blue-500 text-white text-sm h-[32px] hover:bg-blue-600 transition"
                      >
                        {isCopied ? "Copied!" : "Copy URL"}
                      </button>

                      {selectImage && (
                        <button
                          onClick={() => {
                            selectImage(file.url, file.id);
                          }}
                          className="px-4 flex justify-center mt-1 items-center rounded-sm bg-secondary text-white text-sm h-[32px] hover:bg-secondary/80 transition"
                        >
                          Use File
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {successMessage && (
        <p className="text-green-500 mt-4 italic text-sm">{successMessage}</p>
      )}
      {error && <p className="text-danger mt-4 italic text-sm">{error}</p>}
    </div>
  );
}
