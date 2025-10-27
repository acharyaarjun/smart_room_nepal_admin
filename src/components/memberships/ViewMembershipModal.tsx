"use client";
import { Membership } from "@/types/membership";
import { IoClose } from "react-icons/io5";

interface ViewMembershipModalProps {
  closeModal: () => void;
  membership: Membership | undefined;
}

const ViewMembershipModal: React.FC<ViewMembershipModalProps> = ({
  closeModal,
  membership,
}) => {
  if (!membership) return null;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return `NPR ${amount.toLocaleString()}`;
  };

  return (
    <div className="relative z-[50] p-2 w-full max-w-5xl">
      <div className="bg-white dark:bg-dark rounded-lg shadow-3xl max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 md:px-5 md:py-4 border-b rounded-t dark:border-gray-600 sticky top-0 bg-white dark:bg-dark z-10">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Membership Payment Details
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
          <div className="space-y-6">
            {/* Payment Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Transaction ID
                </label>
                <p className="text-gray-800 dark:text-gray-200 mt-1">
                  {membership.transactionId}
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Amount
                </label>
                <p className="text-gray-800 dark:text-gray-200 mt-1 font-bold">
                  {formatCurrency(membership.amount)}
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Payment Method
                </label>
                <p className="text-gray-800 dark:text-gray-200 mt-1 capitalize">
                  {membership.paymentMethod}
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Payment Status
                </label>
                <p className="text-gray-800 dark:text-gray-200 mt-1 capitalize font-semibold">
                  {membership.status}
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Payment Date
                </label>
                <p className="text-gray-800 dark:text-gray-200 mt-1">
                  {formatDate(membership.paymentDate)}
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Expiry Date
                </label>
                <p className="text-gray-800 dark:text-gray-200 mt-1">
                  {formatDate(membership.expiryDate)}
                </p>
              </div>
            </div>

            {/* Membership Type Information */}
            {membership.membershipType && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Membership Type Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Name
                    </label>
                    <p className="text-gray-800 dark:text-gray-200 mt-1">
                      {membership.membershipType.name}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Price
                    </label>
                    <p className="text-gray-800 dark:text-gray-200 mt-1">
                      {formatCurrency(membership.membershipType.price)}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Limit
                    </label>
                    <p className="text-gray-800 dark:text-gray-200 mt-1">
                      {membership.membershipType.limit} properties
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Description
                    </label>
                    <p className="text-gray-800 dark:text-gray-200 mt-1">
                      {membership.membershipType.description}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Features
                    </label>
                    <div
                      className="text-gray-800 dark:text-gray-200 mt-1 prose prose-sm dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: membership.membershipType.features,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Remarks */}
            {membership.remarks && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Remarks
                </h3>
                <p className="text-gray-800 dark:text-gray-200">
                  {membership.remarks}
                </p>
              </div>
            )}

            {/* Timestamps */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                Record Timestamps
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Created At
                  </label>
                  <p className="text-gray-800 dark:text-gray-200 mt-1">
                    {formatDate(membership.createdAt)}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Updated At
                  </label>
                  <p className="text-gray-800 dark:text-gray-200 mt-1">
                    {formatDate(membership.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMembershipModal;
