import { Menu } from "@/types/menu";
import { AiOutlineDashboard } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import { FaRegFolder } from "react-icons/fa";

import { LiaCertificateSolid } from "react-icons/lia";
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
    name: "Medias",
    link: "#",
    icon: FaRegFolder,
    subMenu: [
      {
        id: 1,
        name: "Gallery",
        link: "/medias",
        icon: BsImages,
      },
      {
        id: 2,
        name: "Upload",
        link: "/medias/upload",
        icon: MdAddToPhotos,
      },
    ],
  },

  {
    id: 7,
    name: "Accreditations",
    link: "/accreditations",
    icon: LiaCertificateSolid,
  },
];
