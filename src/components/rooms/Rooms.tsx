import Link from "next/link";
import { RoomTable } from "@/components/rooms";

const Rooms = () => {
  return (
    <div className="w-full min-h-[calc(100vh-112px)]">
      <div className="w-full flex justify-between items-center px-6">
        <div className="my-5">
          <h3 className="font-semibold text-[17.5px] leading-5 dark:text-gray-300">
            Rooms
          </h3>
          <Link
            href="/dashboard"
            className="text-[14px] text-gray-700 dark:text-gray-300"
          >
            Home
          </Link>{" "}
          <span className="text-[14px] text-gray-700 dark:text-gray-300">
            -
          </span>{" "}
          <span className="text-[14px] text-gray-700 dark:text-gray-300">
            Rooms
          </span>
        </div>
      </div>
      <div className="px-6 mb-4 w-full overflow-x-auto">
        <div className="py-6 px-4 sm:px-6 md:px-8 bg-white dark:bg-dark border-[1px] border-light dark:border-gray-700 rounded-md w-full flex flex-col justify-between shadow-custom">
          <RoomTable />
        </div>
      </div>
    </div>
  );
};

export default Rooms;
