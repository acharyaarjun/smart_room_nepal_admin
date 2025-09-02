import Link from "next/link";
import { AccreditationsTable } from "@/components/accreditations";

const Banners = () => {
  return (
    <div className="w-full min-h-[calc(100vh-112px)]">
      <div className="px-6 w-full flex justify-between items-center">
        <div className="my-5">
          <h3 className="font-normal text-[17.5px] leading-5">
            Accreditations
          </h3>
          <Link href="/dashboard" className="text-[14px] text-graycolor">
            Home
          </Link>{" "}
          <span className="text-[14px] text-graycolor">-</span>{" "}
          <span className="text-[14px] text-graycolor">Accreditations</span>
        </div>
      </div>
      <div className="px-6 mb-4 w-full overflow-x-auto">
        <div className="py-6 px-4 sm:px-6 md:px-8 bg-white dark:bg-darkbg border-[1px] border-light dark:border-gray-700 rounded-md w-full flex flex-col justify-between shadow-custom">
          <AccreditationsTable />
        </div>
      </div>
    </div>
  );
};

export default Banners;
