import Link from "next/link";
import { MediaList } from "@/components/medias";

export default function Media() {
  return (
    <div className="min-h-[83vh]">
      <div className="px-6 w-full flex justify-between items-center">
        <div className="my-5">
          <h3 className="font-semibold text-[17.5px] leading-5">Medias</h3>
          <Link href="/dashboard" className="text-[14px] text-graycolor">
            Home
          </Link>{" "}
          <span className="text-[14px] text-graycolor">-</span>{" "}
          <span className="text-[14px] text-graycolor">Medias</span>
        </div>
      </div>
      <div className="px-6 mb-4 w-full overflow-x-auto">
        <div className="py-6 px-4 sm:px-6 md:px-8 bg-white dark:bg-darkbg border-[1px] border-light dark:border-gray-700 rounded-md w-full flex flex-col justify-between shadow-custom">
          <MediaList />
        </div>
      </div>
    </div>
  );
}
