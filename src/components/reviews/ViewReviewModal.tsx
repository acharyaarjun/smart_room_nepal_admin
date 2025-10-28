"use client";
import { Review } from "@/types/review";
import { IoClose } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

interface ViewReviewModalProps {
  closeModal: () => void;
  review: Review | undefined;
}

const ViewReviewModal: React.FC<ViewReviewModalProps> = ({
  closeModal,
  review,
}) => {
  if (!review) return null;

  const formatDate = (dateString: string) => {
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

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1 items-center">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={
              i < rating
                ? "text-yellow-500"
                : "text-gray-300 dark:text-gray-600"
            }
            size={20}
          />
        ))}
        <span className="ml-2 text-lg font-semibold">({rating}/5)</span>
      </div>
    );
  };

  return (
    <div className="relative z-[50] p-2 w-full max-w-5xl">
      <div className="bg-white dark:bg-dark rounded-lg shadow-3xl max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 md:px-5 md:py-4 border-b rounded-t dark:border-gray-600 sticky top-0 bg-white dark:bg-dark z-10">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Review Details
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
            {/* Rating */}
            <div>
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Rating
              </label>
              <div className="mt-2">{renderStars(review.rating)}</div>
            </div>

            {/* Review Message */}
            <div>
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Review Message
              </label>
              <p className="text-gray-800 dark:text-gray-200 mt-2 text-base leading-relaxed">
                {review.message}
              </p>
            </div>

            {/* Reviewer Information */}
            {review.roomRequest?.user && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Reviewer Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {review.roomRequest.user.userProfile?.avatar && (
                    <div className="md:col-span-2">
                      <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        Avatar
                      </label>
                      <div className="mt-2">
                        <Image
                          src={review.roomRequest.user.userProfile.avatar.url}
                          alt={review.roomRequest.user.fullName}
                          width={80}
                          height={80}
                          className="rounded-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Full Name
                    </label>
                    <p className="text-gray-800 dark:text-gray-200 mt-1">
                      {review.roomRequest.user.fullName}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Username
                    </label>
                    <p className="text-gray-800 dark:text-gray-200 mt-1">
                      {review.roomRequest.user.username}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Email
                    </label>
                    <p className="text-gray-800 dark:text-gray-200 mt-1">
                      {review.roomRequest.user.email}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Phone
                    </label>
                    <p className="text-gray-800 dark:text-gray-200 mt-1">
                      {review.roomRequest.user.userProfile?.phone || "N/A"}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      User Status
                    </label>
                    <p className="text-gray-800 dark:text-gray-200 mt-1 capitalize">
                      {review.roomRequest.user.userProfile?.status || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Room Information */}
            {review.roomRequest?.room && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Room Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Room Name
                    </label>
                    <p className="text-gray-800 dark:text-gray-200 mt-1">
                      {review.roomRequest.room.name}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Room Slug
                    </label>
                    <p className="text-gray-800 dark:text-gray-200 mt-1">
                      {review.roomRequest.room.slug}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Price
                    </label>
                    <p className="text-gray-800 dark:text-gray-200 mt-1">
                      {formatCurrency(review.roomRequest.room.price)} /{" "}
                      {review.roomRequest.room.unit}
                    </p>
                  </div>

                  {review.roomRequest.room.offerPrice && (
                    <div>
                      <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        Offer Price
                      </label>
                      <p className="text-gray-800 dark:text-gray-200 mt-1">
                        {formatCurrency(review.roomRequest.room.offerPrice)} /{" "}
                        {review.roomRequest.room.unit}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Room Owner Information */}
            {review.roomRequest?.room?.user && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Room Owner Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {review.roomRequest.room.user.userProfile?.avatar && (
                    <div className="md:col-span-2">
                      <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        Avatar
                      </label>
                      <div className="mt-2">
                        <Image
                          src={
                            review.roomRequest.room.user.userProfile.avatar.url
                          }
                          alt={review.roomRequest.room.user.fullName}
                          width={80}
                          height={80}
                          className="rounded-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Full Name
                    </label>
                    <p className="text-gray-800 dark:text-gray-200 mt-1">
                      {review.roomRequest.room.user.fullName}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Username
                    </label>
                    <p className="text-gray-800 dark:text-gray-200 mt-1">
                      {review.roomRequest.room.user.username}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Email
                    </label>
                    <p className="text-gray-800 dark:text-gray-200 mt-1">
                      {review.roomRequest.room.user.email}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Phone
                    </label>
                    <p className="text-gray-800 dark:text-gray-200 mt-1">
                      {review.roomRequest.room.user.userProfile?.phone || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Booking Request Information */}
            {review.roomRequest && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Booking Request Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Request Token
                    </label>
                    <p className="text-gray-800 dark:text-gray-200 mt-1">
                      {review.roomRequest.token}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Request Status
                    </label>
                    <p className="text-gray-800 dark:text-gray-200 mt-1 capitalize">
                      {review.roomRequest.status}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Timestamps */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                Review Timestamps
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Created At
                  </label>
                  <p className="text-gray-800 dark:text-gray-200 mt-1">
                    {formatDate(review.createdAt)}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Updated At
                  </label>
                  <p className="text-gray-800 dark:text-gray-200 mt-1">
                    {formatDate(review.updatedAt)}
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

export default ViewReviewModal;
