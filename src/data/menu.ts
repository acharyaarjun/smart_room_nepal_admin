import { Menu } from "@/types/menu";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiGlobe } from "react-icons/bi";
import { BsImages } from "react-icons/bs";
import { FaRegFolder } from "react-icons/fa";
import { MdAddToPhotos } from "react-icons/md";

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
    name: "Dropdown",
    link: "#",
    icon: FaRegFolder,
    subMenu: [
      {
        id: 1,
        name: "Item 1",
        link: "#",
        icon: BsImages,
      },
      {
        id: 2,
        name: "Item 2",
        link: "#",
        icon: MdAddToPhotos,
      },
    ],
  },
];
