"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import {
  addMembershipType,
  updateMembershipType,
} from "@/services/membershipTypeService";
import { MembershipType, MembershipTypeForm } from "@/types/membership-type";

const useMembershipType = ({
  closeModal,
  membershipType,
  refresh,
  updateItemInList,
}: {
  closeModal: () => void;
  membershipType?: MembershipType;
  refresh?: () => void;
  updateItemInList: (updatedItem: MembershipType, id: number) => void;
}) => {
  const [formData, setFormData] = useState<MembershipTypeForm>({
    name: membershipType ? membershipType.name : "",
    description: membershipType ? membershipType.description : "",
    limit: membershipType ? membershipType.limit : 0,
    price: membershipType ? membershipType.price : 0,
    features: membershipType ? membershipType.features : "",
  });

  const { name, description, limit, price, features } = formData;

  const [nameError, setNameError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [limitError, setLimitError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [featuresError, setFeaturesError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    let processedValue: string | number = value;

    // Convert string to number for numeric fields
    if (name === "limit" || name === "price") {
      processedValue = value === "" ? 0 : Number(value);
    }

    const updatedFormData = {
      ...formData,
      [name]: processedValue,
    };
    setFormData(updatedFormData);
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

  const validateDescription = () => {
    if (!description) {
      setDescriptionError("Description is required!");
    } else if (description.length < 10) {
      setDescriptionError("Description is too short!");
    } else {
      setDescriptionError(null);
    }
  };

  const validateLimit = () => {
    if (!limit || limit < 1) {
      setLimitError("Limit must be at least 1!");
    } else {
      setLimitError(null);
    }
  };

  const validatePrice = () => {
    if (!price || price < 0) {
      setPriceError("Price must be 0 or greater!");
    } else {
      setPriceError(null);
    }
  };

  const validateFeatures = () => {
    if (!features) {
      setFeaturesError("Features are required!");
    } else {
      setFeaturesError(null);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateName();
    validateDescription();
    validateLimit();
    validatePrice();
    validateFeatures();

    if (
      name &&
      nameError === null &&
      description &&
      descriptionError === null &&
      limit &&
      limitError === null &&
      price !== undefined &&
      priceError === null &&
      features &&
      featuresError === null
    ) {
      try {
        setIsLoading(true);
        if (membershipType) {
          const response = await updateMembershipType(
            formData,
            membershipType.id
          );
          toast.success("Membership Type updated successfully", {
            id: "toast",
          });
          updateItemInList(response.data, membershipType.id);
          if (refresh) refresh();
          closeModal();
        } else {
          const response = await addMembershipType(formData);
          toast.success("Membership Type added successfully", {
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

              if (key === "description") {
                setDescriptionError(value);
              }

              if (key === "limit") {
                setLimitError(value);
              }

              if (key === "price") {
                setPriceError(value);
              }

              if (key === "features") {
                setFeaturesError(value);
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
    description,
    limit,
    price,
    features,
    nameError,
    descriptionError,
    limitError,
    priceError,
    featuresError,
    isLoading,
    validateName,
    validateDescription,
    validateLimit,
    validatePrice,
    validateFeatures,
    handleChange,
    onSubmit,
  };
};

export default useMembershipType;
