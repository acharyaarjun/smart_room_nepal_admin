"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { updateMembership } from "@/services/membershipService";
import { Membership, MembershipForm } from "@/types/membership";
import PaymentStatus from "@/enums/paymentStatus";

const useMembership = ({
  closeModal,
  membership,
  refresh,
  updateItemInList,
}: {
  closeModal: () => void;
  membership?: Membership;
  refresh?: () => void;
  updateItemInList: (updatedItem: Membership, id: number) => void;
}) => {
  const [formData, setFormData] = useState<MembershipForm>({
    status: membership ? membership.status : PaymentStatus.PENDING,
    remarks: membership ? membership.remarks || "" : "",
  });

  const { status, remarks } = formData;

  const [statusError, setStatusError] = useState<string | null>(null);
  const [remarksError, setRemarksError] = useState<string | null>(null);

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

  const validateStatus = () => {
    if (!status) {
      setStatusError("Status is required!");
    } else if (
      !Object.values(PaymentStatus).includes(status as PaymentStatus)
    ) {
      setStatusError("Invalid status selected!");
    } else {
      setStatusError(null);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateStatus();

    if (status && statusError === null && membership) {
      try {
        setIsLoading(true);
        const response = await updateMembership(formData, membership.id);
        toast.success("Membership payment updated successfully", {
          id: "toast",
        });

        // Merge the updated data with the existing membership data
        const updatedMembership: Membership = {
          ...membership,
          status: response.data.status,
          remarks: response.data.remarks,
          updatedAt: response.data.updatedAt,
        };

        updateItemInList(updatedMembership, membership.id);
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

              if (key === "remarks") {
                setRemarksError(value);
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
    remarks,
    statusError,
    remarksError,
    isLoading,
    validateStatus,
    handleChange,
    onSubmit,
  };
};

export default useMembership;
