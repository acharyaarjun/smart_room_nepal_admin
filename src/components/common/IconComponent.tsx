import { IconData } from "@/data/icon";
import { IconEnum } from "@/enums/IconEnum";
import React from "react";

/**
 * @return {JSX.Element}
 * @param {Object} props
 * @param {string} props.icon - The icon name to display.
 * @param {string} [props.size="size-6"] - The size of the icon, default is "size-6", use options like "size-4", "size-5", "size-6", etc.
 * @description A React component that renders an icon based on the provided icon name.
 * If the icon name is not found in the IconData, it defaults to the hiking icon.
 * The icon size can be customized using the `size` prop.
 * If the icon is not found, it defaults to the hiking icon.
 */

export default function IconComponent({
  icon,
  size = "size-6",
  className = "",
}: {
  icon: string;
  size?: string;
  className?: string;
}) {
  const Icon =
    icon in IconData
      ? IconData[icon as keyof typeof IconData]
      : IconData[IconEnum.HIKING];
  return <Icon className={`${size} ${className}`} />;
}
