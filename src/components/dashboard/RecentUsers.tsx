import React from "react";
import Image from "next/image";
import { AdminRecentUser } from "@/types/dashboard";
import { FaUser, FaUserShield, FaHome } from "react-icons/fa";

interface RecentUsersProps {
  users: AdminRecentUser[];
}

const RecentUsers: React.FC<RecentUsersProps> = ({ users }) => {
  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return <FaUserShield className="text-purple-500" />;
      case "host":
        return <FaHome className="text-blue-500" />;
      default:
        return <FaUser className="text-gray-500" />;
    }
  };

  const getRoleBadge = (role: string) => {
    const badgeClasses: Record<string, string> = {
      admin:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      host: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      user: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
    };

    return badgeClasses[role.toLowerCase()] || badgeClasses["user"];
  };

  const getStatusBadge = (status: string) => {
    return status.toLowerCase() === "active"
      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white dark:bg-dark border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Users
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Latest registered users
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Joined
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {user.userProfile?.avatar ? (
                      <Image
                        src={user.userProfile.avatar.url}
                        alt={user.fullName}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.fullName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.fullName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {getRoleIcon(user.role)}
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${getRoleBadge(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusBadge(
                      user.userProfile?.status || "inactive"
                    )}`}
                  >
                    {user.userProfile?.status || "inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(user.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentUsers;
