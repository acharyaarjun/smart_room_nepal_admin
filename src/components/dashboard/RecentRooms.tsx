import React from "react";
import Image from "next/image";
import { AdminRecentRoom } from "@/types/dashboard";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";

interface RecentRoomsProps {
  rooms: AdminRecentRoom[];
}

const RecentRooms: React.FC<RecentRoomsProps> = ({ rooms }) => {
  const formatCurrency = (amount: number) => {
    return `NPR ${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    const badgeClasses: Record<string, string> = {
      approved:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      maintenance:
        "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
      disabled_by_admin:
        "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      disabled_by_owner:
        "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
    };

    return badgeClasses[status.toLowerCase()] || badgeClasses["pending"];
  };

  const getTypeBadge = (type: string) => {
    const badgeClasses: Record<string, string> = {
      apartment:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      house:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      room: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
      office:
        "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
    };

    return badgeClasses[type.toLowerCase()] || badgeClasses["room"];
  };

  return (
    <div className="bg-white dark:bg-dark border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Rooms
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Latest added properties
        </p>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="flex gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow duration-200"
            >
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={room.image?.url || "/placeholder-room.jpg"}
                  alt={room.name}
                  fill
                  className="rounded-lg object-cover"
                />
                {room.isFeatured && (
                  <div className="absolute top-1 right-1 bg-yellow-500 text-white p-1 rounded-full">
                    <FaStar className="text-xs" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {room.name}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 mt-1">
                      <FaMapMarkerAlt className="text-gray-400" />
                      <span className="truncate">{room.district.name}</span>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap capitalize ${getStatusBadge(
                      room.roomStatus
                    )}`}
                  >
                    {room.roomStatus.replace(/_/g, " ")}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${getTypeBadge(
                        room.roomType
                      )}`}
                    >
                      {room.roomType}
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {formatCurrency(room.price)}
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">
                        /{room.unit}
                      </span>
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(room.createdAt)}
                  </span>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  By: {room.user.fullName}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentRooms;
