"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaUserShield,
  FaHome,
  FaUser,
  FaCheckCircle,
  FaHotel,
  FaClock,
  FaStar,
  FaWrench,
  FaCalendarCheck,
  FaTimesCircle,
  FaSpinner,
  FaDollarSign,
  FaChartLine,
  FaMoneyBillWave,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { getDashbaord } from "@/services/dashboardService";
import { AdminDashboard } from "@/types/dashboard";
import StatsCard from "./StatsCard";
import RecentUsers from "./RecentUsers";
import RecentRooms from "./RecentRooms";
import RecentRequests from "./RecentRequests";
import { SingleLineLoading } from "@/components/common";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<AdminDashboard | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getDashbaord();
        setDashboardData(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-[calc(100vh-112px)] flex items-center justify-center">
        <SingleLineLoading color="text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-[calc(100vh-112px)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) return null;

  const { stats, recentUsers, recentRooms, recentRequests } = dashboardData;

  return (
    <div className="w-full min-h-[calc(100vh-112px)] max-h-full">
      <div className="px-6 w-full flex justify-between items-center">
        <div className="my-5">
          <h3 className="text-[17.5px] leading-5 text-gray-800 dark:text-gray-200 font-semibold">
            Dashboard
          </h3>
          <Link
            href="/dashboard"
            className="text-[14px] text-gray-800 dark:text-gray-200 font-medium"
          >
            Home
          </Link>{" "}
          <span className="text-[14px] text-gray-700 dark:text-gray-300">
            -
          </span>{" "}
          <span className="text-[14px] text-gray-700 dark:text-gray-300 font-medium">
            Dashboard
          </span>
        </div>
      </div>

      <div className="px-6 mb-4 w-full">
        {/* Users Stats Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <FaUsers className="text-primary" />
            Users Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Total Users"
              value={stats.users.total.toLocaleString()}
              icon={FaUsers}
              iconColor="text-blue-600"
              iconBgColor="bg-blue-100 dark:bg-blue-900/30"
              subtitle={`${stats.users.active} active, ${stats.users.inactive} inactive`}
            />
            <StatsCard
              title="Admins"
              value={stats.users.admins.toLocaleString()}
              icon={FaUserShield}
              iconColor="text-purple-600"
              iconBgColor="bg-purple-100 dark:bg-purple-900/30"
            />
            <StatsCard
              title="Hosts"
              value={stats.users.hosts.toLocaleString()}
              icon={FaHome}
              iconColor="text-green-600"
              iconBgColor="bg-green-100 dark:bg-green-900/30"
            />
            <StatsCard
              title="Normal Users"
              value={stats.users.normalUsers.toLocaleString()}
              icon={FaUser}
              iconColor="text-orange-600"
              iconBgColor="bg-orange-100 dark:bg-orange-900/30"
            />
          </div>
        </div>

        {/* Rooms Stats Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <FaHotel className="text-primary" />
            Rooms Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Total Rooms"
              value={stats.rooms.total.toLocaleString()}
              icon={FaHotel}
              iconColor="text-indigo-600"
              iconBgColor="bg-indigo-100 dark:bg-indigo-900/30"
              subtitle={`${stats.rooms.featured} featured`}
            />
            <StatsCard
              title="Approved"
              value={stats.rooms.approved.toLocaleString()}
              icon={FaCheckCircle}
              iconColor="text-green-600"
              iconBgColor="bg-green-100 dark:bg-green-900/30"
            />
            <StatsCard
              title="Pending"
              value={stats.rooms.pending.toLocaleString()}
              icon={FaClock}
              iconColor="text-yellow-600"
              iconBgColor="bg-yellow-100 dark:bg-yellow-900/30"
            />
            <StatsCard
              title="Maintenance"
              value={stats.rooms.maintenance.toLocaleString()}
              icon={FaWrench}
              iconColor="text-orange-600"
              iconBgColor="bg-orange-100 dark:bg-orange-900/30"
            />
          </div>
        </div>

        {/* Requests Stats Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <FaCalendarCheck className="text-primary" />
            Requests Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatsCard
              title="Total Requests"
              value={stats.requests.total.toLocaleString()}
              icon={FaCalendarCheck}
              iconColor="text-blue-600"
              iconBgColor="bg-blue-100 dark:bg-blue-900/30"
            />
            <StatsCard
              title="Pending"
              value={stats.requests.pending.toLocaleString()}
              icon={FaClock}
              iconColor="text-yellow-600"
              iconBgColor="bg-yellow-100 dark:bg-yellow-900/30"
            />
            <StatsCard
              title="Approved"
              value={stats.requests.approved.toLocaleString()}
              icon={FaCheckCircle}
              iconColor="text-green-600"
              iconBgColor="bg-green-100 dark:bg-green-900/30"
            />
            <StatsCard
              title="Ongoing"
              value={stats.requests.ongoing.toLocaleString()}
              icon={FaSpinner}
              iconColor="text-blue-600"
              iconBgColor="bg-blue-100 dark:bg-blue-900/30"
            />
            <StatsCard
              title="Completed"
              value={stats.requests.completed.toLocaleString()}
              icon={FaCheckCircle}
              iconColor="text-purple-600"
              iconBgColor="bg-purple-100 dark:bg-purple-900/30"
            />
            <StatsCard
              title="Rejected"
              value={stats.requests.rejected.toLocaleString()}
              icon={FaTimesCircle}
              iconColor="text-red-600"
              iconBgColor="bg-red-100 dark:bg-red-900/30"
            />
          </div>
        </div>

        {/* Reviews & Payments Stats Section */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Reviews */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                <FaStar className="text-primary" />
                Reviews Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StatsCard
                  title="Total Reviews"
                  value={stats.reviews.total.toLocaleString()}
                  icon={FaStar}
                  iconColor="text-yellow-600"
                  iconBgColor="bg-yellow-100 dark:bg-yellow-900/30"
                />
                <StatsCard
                  title="Average Rating"
                  value={stats.reviews.averageRating.toFixed(1)}
                  icon={FaStar}
                  iconColor="text-yellow-600"
                  iconBgColor="bg-yellow-100 dark:bg-yellow-900/30"
                  subtitle="Out of 5.0"
                />
              </div>
            </div>

            {/* Districts */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                <FaMapMarkedAlt className="text-primary" />
                Other Statistics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StatsCard
                  title="Total Districts"
                  value={stats.districts.total.toLocaleString()}
                  icon={FaMapMarkedAlt}
                  iconColor="text-teal-600"
                  iconBgColor="bg-teal-100 dark:bg-teal-900/30"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Payments Stats Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <FaDollarSign className="text-primary" />
            Payments Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Total Payments"
              value={stats.payments.total.toLocaleString()}
              icon={FaMoneyBillWave}
              iconColor="text-emerald-600"
              iconBgColor="bg-emerald-100 dark:bg-emerald-900/30"
            />
            <StatsCard
              title="Completed"
              value={stats.payments.completed.toLocaleString()}
              icon={FaCheckCircle}
              iconColor="text-green-600"
              iconBgColor="bg-green-100 dark:bg-green-900/30"
            />
            <StatsCard
              title="Pending"
              value={stats.payments.pending.toLocaleString()}
              icon={FaClock}
              iconColor="text-yellow-600"
              iconBgColor="bg-yellow-100 dark:bg-yellow-900/30"
            />
            <StatsCard
              title="Total Revenue"
              value={`NPR ${stats.payments.totalRevenue.toLocaleString()}`}
              icon={FaChartLine}
              iconColor="text-blue-600"
              iconBgColor="bg-blue-100 dark:bg-blue-900/30"
            />
          </div>
        </div>

        {/* Recent Data Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {recentRequests.length > 0 && (
            <RecentRequests requests={recentRequests} />
          )}
          {recentRooms.length > 0 && <RecentRooms rooms={recentRooms} />}
        </div>
        {/* Recent Users Section */}
        {recentUsers.length > 0 && (
          <div className="mb-8">
            <RecentUsers users={recentUsers} />
          </div>
        )}
      </div>
    </div>
  );
}
