"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { updateUser } from "@/services/userService";
import { UserResponse, UserForm } from "@/types/user";
import UserStatus from "@/enums/userStatus";

const useUser = ({
  closeModal,
  user,
  refresh,
  updateItemInList,
}: {
  closeModal: () => void;
  user?: UserResponse;
  refresh?: () => void;
  updateItemInList: (updatedItem: UserResponse, id: number) => void;
}) => {
  const [formData, setFormData] = useState<UserForm>({
    status: user ? user.userProfile.status : UserStatus.PENDING,
    isEnabled: user ? user.isEnabled : true,
  });

  const { status, isEnabled } = formData;

  const [statusError, setStatusError] = useState<string | null>(null);

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

  const handleIsEnabledChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedFormData = {
      ...formData,
      isEnabled: event.target.value === "true",
    };
    setFormData(updatedFormData);
  };

  const validateStatus = () => {
    if (!status) {
      setStatusError("Status is required!");
    } else if (!Object.values(UserStatus).includes(status as UserStatus)) {
      setStatusError("Invalid status selected!");
    } else {
      setStatusError(null);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateStatus();

    if (status && statusError === null && user) {
      try {
        setIsLoading(true);
        const response = await updateUser(formData, user.id);
        toast.success("User updated successfully", {
          id: "toast",
        });

        // Merge the updated data with the existing user data
        const updatedUser: UserResponse = {
          ...user,
          isEnabled: response.data.isEnabled,
          userProfile: {
            ...user.userProfile,
            status: response.data.status,
          },
        };

        updateItemInList(updatedUser, user.id);
        if (refresh) refresh();
        closeModal();
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

              if (key === "status") {
                setStatusError(value);
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
    status,
    isEnabled,
    statusError,
    isLoading,
    validateStatus,
    handleChange,
    handleIsEnabledChange,
    onSubmit,
  };
};

export default useUser;
