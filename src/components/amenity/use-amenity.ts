"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { addAmenity, updateAmenity } from "@/services/amenityService";
import { Amenity, AmenityForm } from "@/types/amenity";
import { IconEnum } from "@/enums/IconEnum";
import { IconData } from "@/data/icon";

const useAmenity = ({
  closeModal,
  amenity,
  refresh,
  updateItemInList,
}: {
  closeModal: () => void;
  amenity?: Amenity;
  refresh?: () => void;
  updateItemInList: (updatedItem: Amenity, id: number) => void;
}) => {
  const [formData, setFormData] = useState<AmenityForm>({
    name: amenity ? amenity.name : "",
    icon: amenity ? amenity.icon : IconEnum.DEFAULT,
  });

  const { name, icon } = formData;

  const [nameError, setNameError] = useState<string | null>(null);
  const [iconError, setIconError] = useState<string | null>(null);

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

  const changeIcon = (icon: string) => {
    const updatedFormData = {
      ...formData,
      icon: icon,
    };
    setFormData(updatedFormData);
    setIconError(null);
  };

  const validateName = () => {
    if (!name) {
      setNameError("Name is required!");
    } else if (name.length < 2) {
      setNameError("Name is too short!");
    } else {
      setNameError(null);
    }
  };

  const validateIcon = () => {
    if (!icon) {
      setIconError("Icon is required!");
    } else if (!(icon in IconData)) {
      setIconError("Invalid icon selected!");
    } else {
      setIconError(null);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateIcon();
    validateName();

    if (name && nameError === null && icon && iconError === null) {
      try {
        setIsLoading(true);
        if (amenity) {
          const response = await updateAmenity(formData, amenity.id);
          toast.success("Amenity updated successfully", {
            id: "toast",
          });
          updateItemInList(response.data, amenity.id);
          if (refresh) refresh();
          closeModal();
        } else {
          const response = await addAmenity(formData);
          toast.success("Amenity added successfully", {
            id: "toast",
          });
          updateItemInList(response.data, response.data.id);
          if (refresh) refresh();
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

              if (key === "icon") {
                setIconError(value);
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
    icon,
    nameError,
    iconError,
    isLoading,
    validateName,
    validateIcon,
    handleChange,
    changeIcon,
    onSubmit,
  };
};

export default useAmenity;
