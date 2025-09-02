"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { Accreditation, AccreditationForm } from "@/types/accreditation";
import { toast } from "react-hot-toast";
import defaultImage from "@/assets/images/others/no-file-chosen.png";
import {
  addAccreditation,
  updateAccreditation,
} from "@/services/accreditationService";
const useAccreditation = ({
  closeModal,
  accreditation,
  refresh,
}: {
  closeModal: () => void;
  accreditation?: Accreditation;
  refresh?: () => void;
}) => {
  const [formData, setFormData] = useState<AccreditationForm>({
    title: accreditation ? accreditation.title ?? "" : "",
    isActive: accreditation ? accreditation.isActive : false,
    order: accreditation ? accreditation.order : 0,
    mediaId: accreditation ? accreditation.media?.id || undefined : undefined,
  });

  const { title, isActive, order, mediaId } = formData;

  const [titleError, setTitleError] = useState<string | null>(null);
  const [mediaError, setMediaError] = useState<string | null>(null);
  const [isActiveError, setIsActiveError] = useState<string | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [image, setImage] = useState<string>(
    accreditation
      ? accreditation.media?.url || defaultImage.src
      : defaultImage.src
  );
  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const updatedFormData = {
      ...formData,
      [event.target.name]: event.target.value,
    };
    setFormData(updatedFormData);
  };

  const validateTitle = () => {
    if (!title) {
      setTitleError("title is required!");
    } else {
      setTitleError(null);
    }
  };

  const validateOrder = () => {
    if (!order) {
      setOrderError("Order is required!");
    } else {
      setOrderError(null);
    }
  };

  const validateImage = () => {
    if (accreditation) {
      setMediaError(null);
    } else {
      if (mediaId !== undefined) {
        setMediaError(null);
      } else {
        setMediaError("Media is required!");
      }
    }
  };

  const validateIsActive = () => {
    // if (isActive === undefined) {
    //   setIsActiveError("Status is required!");
    // } else {
    //   setIsActiveError(null);
    // }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateTitle();
    validateImage();
    validateIsActive();

    if (
      titleError === null &&
      orderError === null &&
      isActiveError === null &&
      mediaError === null
    ) {
      try {
        setIsLoading(true);
        if (accreditation) {
          await updateAccreditation(formData, accreditation.id);
          toast.success("Accreditation update successfully", {
            id: "toast",
          });
          if (refresh) refresh();
          closeModal();
        } else {
          if (mediaId !== undefined) {
            // console.log(formData);
            await addAccreditation(formData);

            toast.success("Accreditation Added successfully", {
              id: "toast",
            });
            if (refresh) refresh();
            closeModal();
          } else {
            setMediaError("Media is Required");
          }
        }
      } catch (error: any) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          if (error.response.data.errors) {
            const errors = error.response.data.errors;

            errors.map((error: any) => {
              const key = Object.keys(error)[0];
              const value = error[key];

              if (key === "title") {
                setTitleError(value);
              }

              if (key === "order") {
                setOrderError(value);
              }

              if (key === "isActive") {
                setIsActiveError(value);
              }

              if (key === "mediaId") {
                setMediaError(value);
              }
            });
          }
          toast.error(error.response.data.message, {
            id: "toast",
          });
          return;
        }
        toast.error("Something went wrong", {
          id: "toast",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const [mediaModal, setMediaModal] = useState<boolean>(false);

  const openMediaModal = () => {
    setMediaModal(true);
  };

  const closeMediaModal = () => {
    setMediaModal(false);
  };

  const selectImage = (url: string, id: number) => {
    const updatedFormData = {
      ...formData,
      mediaId: id,
    };
    setFormData(updatedFormData);
    setImage(url);
    setMediaError(null);
    closeMediaModal();
  };

  return {
    title,

    isActive,
    order,
    image,
    titleError,

    isActiveError,
    orderError,
    mediaError,
    isLoading,
    handleChange,
    validateTitle,

    validateOrder,
    validateIsActive,
    validateImage,
    onSubmit,
    selectImage,
    mediaModal,
    openMediaModal,
    closeMediaModal,
  };
};

export default useAccreditation;
