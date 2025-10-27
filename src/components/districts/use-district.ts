"use client";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import defaultImage from "@/assets/images/others/image-placeholder.png";
import { addDistrict, updateDistrict } from "@/services/districtService";
import { District, DistrictForm } from "@/types/district";

const useDistrict = ({
  closeModal,
  district,
  updateItemInList,
  refresh,
}: {
  closeModal: () => void;
  district?: District;
  updateItemInList: (updatedItem: District, id: number) => void;
  refresh?: () => void;
}) => {
  const [formData, setFormData] = useState<DistrictForm>({
    name: district ? district.name : "",
    description: district ? district.description ?? "" : "",
  });

  const { name, description } = formData;

  const [nameError, setNameError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const validateName = () => {
    if (!name) {
      setNameError("Name is required!");
    } else if (name.length < 3) {
      setNameError("Name must be at least 3 characters long!");
    } else {
      setNameError(null);
    }
  };

  const validateDescription = () => {
    if (!description) {
      setDescriptionError("Description is required!");
    } else if (description.length < 10) {
      setDescriptionError("Description must be at least 10 characters long!");
    } else {
      setDescriptionError(null);
    }
  };

  const validateImage = () => {
    if (district) {
      setImageError(null);
    } else {
      if (!image) {
        setImageError("Image is required!");
      } else {
        setImageError(null);
      }
    }
  };

  const [image, setImage] = useState<string>(
    district
      ? district.image
        ? district.image.url
        : defaultImage.src
      : defaultImage.src
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const chooseImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const url = URL.createObjectURL(file);
        setImage(url);
        setFormData({ ...formData, image: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChangeClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateName();
    validateImage();
    validateDescription();

    if (
      name &&
      nameError === null &&
      descriptionError === null &&
      imageError === null
    ) {
      try {
        setIsLoading(true);
        if (district) {
          const response = await updateDistrict(formData, district.id);
          toast.success("District updated successfully", {
            id: "toast",
          });
          updateItemInList({ id: district.id, ...response.data }, district.id);
          closeModal();
        } else {
          const response = await addDistrict(formData);
          toast.success("District added successfully", {
            id: "toast",
          });
          updateItemInList(response.data, response.data.id);
          if (refresh) {
            refresh();
          }
          closeModal();
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

              if (key === "name") {
                setNameError(value);
              }

              if (key === "image") {
                setImageError(value);
              }

              if (key === "description") {
                setDescriptionError(value);
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

  return {
    name,
    image,
    description,
    nameError,
    imageError,
    descriptionError,
    isLoading,
    validateName,
    validateImage,
    validateDescription,
    handleChange,
    fileInputRef,
    chooseImage,
    handleImageChangeClick,
    onSubmit,
  };
};

export default useDistrict;
