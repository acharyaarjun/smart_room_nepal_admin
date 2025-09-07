import { Menu } from "@/types/menu";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiGlobe } from "react-icons/bi";
import { FaIcons } from "react-icons/fa";
import { MdCardMembership } from "react-icons/md";

export const MenuData: Menu[] = [
  {
    id: 1,
    name: "Dashboard",
    link: "/dashboard",
    icon: AiOutlineDashboard,
  },
  {
    id: 2,
    name: "Districts",
    link: "/districts",
    icon: BiGlobe,
  },
  {
    id: 3,
    name: "Amenities",
    link: "/amenities",
    icon: FaIcons,
  },
  {
    id: 4,
    name: "Membership Types",
    link: "/membership-types",
    icon: MdCardMembership,
  },
  // {
  //   id: 4,
  //   name: "Dropdown",
  //   link: "#",
  //   icon: FaRegFolder,
  //   subMenu: [
  //     {
  //       id: 1,
  //       name: "Item 1",
  //       link: "#",
  //       icon: BsImages,
  //     },
  //     {
  //       id: 2,
  //       name: "Item 2",
  //       link: "#",
  //       icon: MdAddToPhotos,
  //     },
  //   ],
  // },
];
