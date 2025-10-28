import React from "react";
import Image from "next/image";
import { AdminRecentRequest } from "@/types/dashboard";
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaCalendarAlt,
} from "react-icons/fa";

interface RecentRequestsProps {
  requests: AdminRecentRequest[];
}

const RecentRequests: React.FC<RecentRequestsProps> = ({ requests }) => {
  const formatCurrency = (amount: number) => {
    return `NPR ${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusConfig = (status: string) => {
    const configs: Record<
      string,
      { icon: React.ReactElement; color: string; bgColor: string }
    > = {
      approved: {
        icon: <FaCheckCircle />,
        color: "text-green-700 dark:text-green-300",
        bgColor: "bg-green-100 dark:bg-green-900/30",
      },
      pending: {
        icon: <FaClock />,
        color: "text-yellow-700 dark:text-yellow-300",
        bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
      },
      rejected: {
        icon: <FaTimesCircle />,
        color: "text-red-700 dark:text-red-300",
        bgColor: "bg-red-100 dark:bg-red-900/30",
      },
      canceled: {
        icon: <FaTimesCircle />,
        color: "text-gray-700 dark:text-gray-300",
        bgColor: "bg-gray-100 dark:bg-gray-900/30",
      },
      ongoing: {
        icon: <FaCalendarAlt />,
        color: "text-blue-700 dark:text-blue-300",
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
      },
      completed: {
        icon: <FaCheckCircle />,
        color: "text-purple-700 dark:text-purple-300",
        bgColor: "bg-purple-100 dark:bg-purple-900/30",
      },
    };

    return configs[status.toLowerCase()] || configs["pending"];
  };

  return (
    <div className="bg-white dark:bg-dark border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Requests
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Latest booking requests
        </p>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {requests.map((request) => {
            const statusConfig = getStatusConfig(request.status);
            return (
              <div
                key={request.id}
                className="flex gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow duration-200"
              >
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={request.room.image?.url || "/placeholder-room.jpg"}
                    alt={request.room.name}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {request.room.name}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Token: {request.token}
                      </p>
                    </div>
                    <div
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap capitalize ${statusConfig.bgColor} ${statusConfig.color}`}
                    >
                      {statusConfig.icon}
                      <span>{request.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400 mb-2">
                    <span>By: {request.user.fullName}</span>
                    {request.isFixedDate && (
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt />
                        {formatDate(request.startDate)} -{" "}
                        {formatDate(request.endDate)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {formatCurrency(request.price)}
                      </span>
                      {request.acceptedPrice && (
                        <span className="text-xs text-green-600 dark:text-green-400 font-semibold">
                          Accepted: {formatCurrency(request.acceptedPrice)}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDateTime(request.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentRequests;
