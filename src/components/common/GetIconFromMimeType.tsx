import { AiFillSound } from "react-icons/ai";
import {
  FaFile,
  FaFileArchive,
  FaFileExcel,
  FaFilePdf,
  FaFilePowerpoint,
  FaFileWord,
  FaVideo,
} from "react-icons/fa";

const getIconForMimeType = ({ mimeType }: { mimeType: string }) => {
  if (mimeType.startsWith("image")) return null;
  if (mimeType.startsWith("video/"))
    return <FaVideo className="text-red-500" />;
  if (mimeType.startsWith("audio/"))
    return <AiFillSound className="text-blue-500" />;
  if (mimeType === "application/pdf")
    return <FaFilePdf className="text-red-500" />;
  if (
    mimeType === "application/msword" ||
    mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  )
    return <FaFileWord className="text-blue-500" />;
  if (
    mimeType === "application/vnd.ms-excel" ||
    mimeType ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  )
    return <FaFileExcel className="text-green-500" />;
  if (
    mimeType === "application/zip" ||
    mimeType === "application/x-tar" ||
    mimeType === "application/x-rar-compressed"
  )
    return <FaFileArchive className="text-yellow-500" />;
  if (
    mimeType === "application/vnd.ms-powerpoint" ||
    mimeType ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  )
    return <FaFilePowerpoint className="text-orange-500" />;
  return <FaFile className="text-gray-500" />;
};

export default getIconForMimeType;
