import React from "react";
import { IconType } from "react-icons";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: IconType;
  iconColor: string;
  iconBgColor: string;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  iconColor,
  iconBgColor,
  subtitle,
  trend,
}) => {
  return (
    <div className="bg-white dark:bg-dark border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </h3>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {subtitle}
            </p>
          )}
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={`text-xs font-semibold ${
                  trend.isPositive
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {trend.value}
              </span>
            </div>
          )}
        </div>
        <div
          className={`${iconBgColor} ${iconColor} p-4 rounded-lg flex items-center justify-center`}
        >
          <Icon className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
