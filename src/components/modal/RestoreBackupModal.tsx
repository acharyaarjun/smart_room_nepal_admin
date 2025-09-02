"use client";
import AppApis from "@/constants/appApis";
import { myAxios } from "@/services/apiService";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoIosWarning } from "react-icons/io";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  onSuccess?: () => void;
}

interface FormData {
  restoreType: string;
  backupFile: File | null;
}

interface FormErrors {
  restoreType: string | null;
  backupFile: string | null;
}

export default function RestoreBackupModal({ isOpen, closeModal }: Props) {
  const [formData, setFormData] = useState<FormData>({
    restoreType: "",
    backupFile: null,
  });

  const [errors, setErrors] = useState<FormErrors>({
    restoreType: null,
    backupFile: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const restoreTypeOptions = [
    { value: "database", label: "Database Only" },
    { value: "files", label: "Files Only" },
    { value: "full", label: "Full Restore" },
  ];

  const allowedFileTypes = {
    database: [".sql"],
    files: [".zip"],
    full: [".zip", ".backup"],
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      restoreType: null,
      backupFile: null,
    };

    if (!formData.restoreType) {
      newErrors.restoreType = "Restore type is required";
    }

    if (!formData.backupFile) {
      newErrors.backupFile = "Backup file is required";
    } else {
      const fileExtension =
        "." + formData.backupFile.name.split(".").pop()?.toLowerCase();
      const allowedExtensions =
        allowedFileTypes[
          formData.restoreType as keyof typeof allowedFileTypes
        ] || [];

      if (!allowedExtensions.includes(fileExtension)) {
        newErrors.backupFile = `Invalid file type. Allowed types for ${
          formData.restoreType
        }: ${allowedExtensions.join(", ")}`;
      }
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== null);
  };

  const handleRestoreTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, restoreType: e.target.value, backupFile: null });
    setErrors({ ...errors, restoreType: null, backupFile: null });
    setMessage(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, backupFile: file });
    setErrors({ ...errors, backupFile: null });
    setMessage(null);
  };

  const router = useRouter();
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setMessage(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("restoreType", formData.restoreType);
      if (formData.backupFile) {
        formDataToSend.append("backupFile", formData.backupFile);
      }

      await myAxios.post(AppApis.app.restoreBackup, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Backup restored successfully.", {
        id: "toast",
      });

      closeModal();
      router.push("/dashboard");
    } catch (error: any) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Network error. Please check your connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({ restoreType: "", backupFile: null });
      setErrors({ restoreType: null, backupFile: null });
      setMessage(null);
      closeModal();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] mx-auto flex h-screen w-full items-center justify-center p-[10px]">
          <div className="pointer-events-none fixed inset-0 top-0 bg-gray-800 bg-opacity-50 transition-opacity"></div>
          <div className="z-[999] max-w-[450px] w-full rounded-md bg-white dark:bg-darkbg dark:border-[1px] dark:border-gray-600">
            <div className="flex w-full flex-col p-6">
              <div className="flex items-center mb-4">
                <div className="icon flex items-center justify-center mr-3">
                  <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                    <IoIosWarning className="text-[20px] text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-black dark:text-gray-100">
                  Restore Backup
                </h3>
              </div>

              {message && (
                <div
                  className={`mb-4 p-3 rounded-lg text-sm ${
                    message.type === "success"
                      ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                      : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                  }`}
                >
                  {message.text}
                </div>
              )}

              {/* Restore Type Select */}
              <div className="mb-4">
                <label
                  htmlFor="restoreType"
                  className="mb-[9px] inline-block text-[15px] font-medium leading-[1] tracking-[0] text-gray-600 dark:text-gray-400"
                >
                  Restore Type
                  <span className="text-danger">*</span>
                </label>
                <select
                  id="restoreType"
                  name="restoreType"
                  value={formData.restoreType}
                  onChange={handleRestoreTypeChange}
                  className={`h-[46px] w-full bg-transparent rounded-[5px] border-[1px] border-solid px-[15px] text-[14px] dark:text-gray-400 text-gray-600 outline-none shadow-sm ${
                    errors.restoreType
                      ? "border-danger"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  disabled={loading}
                >
                  <option value="">Select restore type</option>
                  {restoreTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.restoreType && (
                  <span className="mt-1 w-full text-[12px] font-normal italic text-danger">
                    {errors.restoreType}
                  </span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="backupFile"
                  className="mb-[9px] inline-block text-[15px] font-medium leading-[1] tracking-[0] text-gray-600 dark:text-gray-400"
                >
                  Backup File
                  <span className="text-danger">*</span>
                </label>
                <div
                  className={`h-[46px] flex justify-start items-center w-full bg-transparent rounded-[5px] border-[1px] border-solid px-[15px] text-[14px] dark:text-gray-400 text-gray-600 outline-none shadow-sm ${
                    errors.backupFile
                      ? "border-danger"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  <input
                    type="file"
                    id="backupFile"
                    name="backupFile"
                    onChange={handleFileChange}
                    accept={
                      formData.restoreType
                        ? allowedFileTypes[
                            formData.restoreType as keyof typeof allowedFileTypes
                          ]?.join(",")
                        : ""
                    }
                    disabled={loading || !formData.restoreType}
                  />
                </div>
                {errors.backupFile && (
                  <span className="mt-1 w-full text-[12px] font-normal italic text-danger">
                    {errors.backupFile}
                  </span>
                )}
                {formData.restoreType && (
                  <p className="mt-1 text-[12px] text-gray-500 dark:text-gray-400">
                    Allowed file types:{" "}
                    {allowedFileTypes[
                      formData.restoreType as keyof typeof allowedFileTypes
                    ]?.join(", ")}
                  </p>
                )}
              </div>

              <div className="mt-4 flex w-full items-center justify-end gap-3">
                <button
                  className="rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-gray-200 p-2 px-4 text-gray-500 transition-colors duration-300 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleClose}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  className="rounded-lg bg-blue-600 p-2 px-4 text-white transition-colors duration-300 ease-in-out hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleSubmit}
                  disabled={
                    loading || !formData.restoreType || !formData.backupFile
                  }
                >
                  {loading ? "Restoring..." : "Restore Backup"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
