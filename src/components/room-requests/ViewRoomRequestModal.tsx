"use client";
import { Request } from "@/types/request";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { FaCalendarAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface ViewRoomRequestModalProps {
  closeModal: () => void;
  request: Request | undefined;
}

const ViewRoomRequestModal: React.FC<ViewRoomRequestModalProps> = ({
  closeModal,
  request,
}) => {
  if (!request) return null;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
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

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<
      string,
      { color: string; bgColor: string; icon: React.ReactElement }
    > = {
      approved: {
        color: "text-green-700 dark:text-green-300",
        bgColor: "bg-green-100 dark:bg-green-900/30",
        icon: <FaCheckCircle />,
      },
      pending: {
        color: "text-yellow-700 dark:text-yellow-300",
        bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
        icon: <FaCalendarAlt />,
      },
      rejected: {
        color: "text-red-700 dark:text-red-300",
        bgColor: "bg-red-100 dark:bg-red-900/30",
        icon: <FaTimesCircle />,
      },
      canceled: {
        color: "text-gray-700 dark:text-gray-300",
        bgColor: "bg-gray-100 dark:bg-gray-900/30",
        icon: <FaTimesCircle />,
      },
      ongoing: {
        color: "text-blue-700 dark:text-blue-300",
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
        icon: <FaCalendarAlt />,
      },
      completed: {
        color: "text-purple-700 dark:text-purple-300",
        bgColor: "bg-purple-100 dark:bg-purple-900/30",
        icon: <FaCheckCircle />,
      },
    };

    const config =
      statusConfig[status.toLowerCase()] || statusConfig["pending"];

    return (
      <div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold capitalize ${config.bgColor} ${config.color}`}
      >
        {config.icon}
        <span>{status}</span>
      </div>
    );
  };

  return (
    <div className="relative z-[50] p-2 w-full max-w-5xl">
      <div className="bg-white dark:bg-dark rounded-lg shadow-3xl max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 md:px-5 md:py-4 border-b rounded-t dark:border-gray-600 sticky top-0 bg-white dark:bg-dark z-10">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Room Request Details
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
            {/* Request Status */}
            <div className="flex justify-between items-center">
              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Request Status
                </label>
                <div className="mt-2">{getStatusBadge(request.status)}</div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Token
                </label>
                <p className="text-gray-800 dark:text-gray-200 mt-1 font-mono text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded">
                  {request.token}
                </p>
              </div>
            </div>

            {/* Request Information */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                Request Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Fixed Date Booking
                  </label>
                  <p className="text-gray-800 dark:text-gray-200 mt-1">
                    {request.isFixedDate ? (
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        Yes
                      </span>
                    ) : (
                      <span className="text-orange-600 dark:text-orange-400 font-semibold">
                        No (Flexible)
                      </span>
                    )}
                  </p>
                </div>

                {request.isFixedDate && (
                  <>
                    <div>
                      <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        Start Date
                      </label>
                      <p className="text-gray-800 dark:text-gray-200 mt-1">
                        {formatDate(request.startDate)}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        End Date
                      </label>
                      <p className="text-gray-800 dark:text-gray-200 mt-1">
                        {formatDate(request.endDate)}
                      </p>
                    </div>
                  </>
                )}

                <div>
                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Requested Price
                  </label>
                  <p className="text-gray-800 dark:text-gray-200 mt-1 font-bold">
                    {formatCurrency(request.price)}
                  </p>
                </div>

                {request.acceptedPrice && (
                  <div>
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Accepted Price
                    </label>
                    <p className="text-green-600 dark:text-green-400 mt-1 font-bold">
                      {formatCurrency(request.acceptedPrice)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Requester Information */}
            {request.user && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Requester Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {request.user.userProfile?.avatar && (
                    <div className="md:col-span-2">
                      <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        Avatar
                      </label>
                      <div className="mt-2">
                        <Image
                          src={request.user.userProfile.avatar.url}
                          alt={request.user.fullName}
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
                      {request.user.fullName}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Username
                    </label>
                    <p className="text-gray-800 dark:text-gray-200 mt-1">
                      {request.user.username}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Email
                    </label>
                    <p className="text-gray-800 dark:text-gray-200 mt-1">
                      {request.user.email}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      User Status
                    </label>
                    <p className="text-gray-800 dark:text-gray-200 mt-1 capitalize">
                      {request.user.userProfile?.status || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Room Information */}
            {request.room && (
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
                      {request.room.name}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Room Slug
                    </label>
                    <p className="text-gray-800 dark:text-gray-200 mt-1">
                      {request.room.slug}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Price
                    </label>
                    <p className="text-gray-800 dark:text-gray-200 mt-1">
                      {formatCurrency(request.room.price)} / {request.room.unit}
                    </p>
                  </div>

                  {request.room.offerPrice && (
                    <div>
                      <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        Offer Price
                      </label>
                      <p className="text-gray-800 dark:text-gray-200 mt-1">
                        {formatCurrency(request.room.offerPrice)} /{" "}
                        {request.room.unit}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Room Owner Information */}
            {request.room?.user && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Room Owner Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {request.room.user.userProfile?.avatar && (
                    <div className="md:col-span-2">
                      <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        Avatar
                      </label>
                      <div className="mt-2">
                        <Image
                          src={request.room.user.userProfile.avatar.url}
                          alt={request.room.user.fullName}
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
                      {request.room.user.fullName}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Username
                    </label>
                    <p className="text-gray-800 dark:text-gray-200 mt-1">
                      {request.room.user.username}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Email
                    </label>
                    <p className="text-gray-800 dark:text-gray-200 mt-1">
                      {request.room.user.email}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Phone
                    </label>
                    <p className="text-gray-800 dark:text-gray-200 mt-1">
                      {request.room.user.userProfile?.phone || "N/A"}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Owner Status
                    </label>
                    <p className="text-gray-800 dark:text-gray-200 mt-1 capitalize">
                      {request.room.user.userProfile?.status || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Timestamps */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                Request Timestamps
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Created At
                  </label>
                  <p className="text-gray-800 dark:text-gray-200 mt-1">
                    {formatDateTime(request.createdAt)}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Updated At
                  </label>
                  <p className="text-gray-800 dark:text-gray-200 mt-1">
                    {formatDateTime(request.updatedAt)}
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

export default ViewRoomRequestModal;
