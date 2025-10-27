"use client";
import { Membership } from "@/types/membership";
import { IoClose } from "react-icons/io5";
import useMembership from "./use-membership";
import {
  FormSelectElement,
  FormDefaultTextareaElement,
  SingleLineLoading,
} from "@/components/common";
import PaymentStatus from "@/enums/paymentStatus";

interface UpdateMembershipModalProps {
  closeModal: () => void;
  membership: Membership | undefined;
  refresh?: () => void;
  updateItemInList: (updatedItem: Membership, id: number) => void;
}

const UpdateMembershipModal: React.FC<UpdateMembershipModalProps> = ({
  closeModal,
  membership,
  refresh,
  updateItemInList,
}) => {
  const {
    status,
    remarks,
    statusError,
    remarksError,
    isLoading,
    validateStatus,
    handleChange,
    onSubmit,
  } = useMembership({
    closeModal,
    membership,
    refresh,
    updateItemInList,
  });

  if (!membership) return null;

  const statusOptions = Object.values(PaymentStatus).map((status) => ({
    value: status,
    label: status.charAt(0).toUpperCase() + status.slice(1),
  }));

  return (
    <div className="relative z-[50] p-2 w-full max-w-5xl">
      <div className="bg-white dark:bg-dark rounded-lg shadow-3xl">
        <div className="flex items-center justify-between p-4 md:px-5 md:py-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Update Membership Payment
          </h3>
          <button
            title="close"
            type="button"
            className="cursor-pointer text-gray-500 dark:text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={closeModal}
          >
            <IoClose />
          </button>
        </div>
        {/* Modal body */}
        <div className="p-4 md:p-5 w-full">
          <form onSubmit={onSubmit}>
            {/* Payment Info (Read-only) */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Transaction ID:{" "}
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {membership.transactionId}
                </span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Membership Type:{" "}
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {membership.membershipType?.name || "N/A"}
                </span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Amount:{" "}
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  NPR {membership.amount.toLocaleString()}
                </span>
              </p>
            </div>

            <div className="flex flex-col gap-3 my-2">
              {/* Status Field */}
              <FormSelectElement
                title="Payment Status"
                name="status"
                value={status}
                onChange={handleChange}
                onBlur={validateStatus}
                error={statusError}
                options={statusOptions}
                isRequired
              />

              {/* Remarks Field */}
              <FormDefaultTextareaElement
                title="Remarks"
                name="remarks"
                value={remarks}
                onChange={handleChange}
                onBlur={() => {}}
                error={remarksError}
                placeholder="Enter any remarks or notes about this payment"
              />
            </div>

            <div className="flex justify-end">
              {isLoading ? (
                <div className="py-1.5 px-3 bg-primary text-[14px] text-white rounded-md my-4">
                  <SingleLineLoading color="text-white" />
                </div>
              ) : (
                <button
                  type="submit"
                  className="py-1.5 px-3 bg-primary text-[14px] text-white rounded-md my-4 cursor-pointer"
                >
                  Update Payment
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateMembershipModal;
