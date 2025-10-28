"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Pagination, Search, SingleLineLoading } from "@/components/common";
import { SingleRoomRequestItem } from "@/components/room-requests";
import { Request } from "@/types/request";
import { getAllRoomRequests } from "@/services/roomRequestService";

const RoomRequestTableComponent = () => {
  const [items, setItems] = useState<Request[]>([]);
  const currentpage = useSearchParams().get("page");
  const [currentPage, setCurrentPage] = useState<number>(
    currentpage ? parseInt(currentpage!) : 1
  );
  const size = useSearchParams().get("size");
  const itemsPerPage = size ? parseInt(size) : 10;
  const [totalPages, setTotalPages] = useState<number>(0);
  const searchValue = useSearchParams().get("search");
  const statusFilter = useSearchParams().get("status");
  const [selectedStatus, setSelectedStatus] = useState<string>(
    statusFilter || ""
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const getItems = async () => {
      try {
        const itemData = await getAllRoomRequests({
          page: currentPage,
          size: itemsPerPage,
          search: searchValue ? searchValue : "",
          roomRequestStatus: selectedStatus,
        });
        setItems(itemData.data.data);
        setTotalPages(itemData.data.totalPages);
        setCurrentPage(itemData.data.currentPage);
      } catch (error: any) {
        setErrorMessage(
          error.response?.data?.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };
    getItems();
  }, [searchValue, currentPage, itemsPerPage, selectedStatus]);

  const handlePageChange = async (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="flex gap-3 flex-wrap justify-between my-4">
        <div className="flex gap-3 flex-wrap">
          <Search name={"room-requests"} />
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className="py-2 px-3 border border-gray-300 dark:border-gray-700 bg-transparent text-gray-700 dark:text-gray-300 rounded-md text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="canceled">Canceled</option>
            <option value="ongoing">On Going</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      <div className="relative overflow-x-auto my-5">
        <table className="w-full text-sm text-left rtl:text-right ">
          <thead className="text-xs uppercase border-b border-dashed border-gray-300 dark:border-gray-700 font-medium text-gray-700 dark:text-gray-300 ">
            <tr>
              <th scope="col" className="pr-6 py-3 whitespace-nowrap">
                S.N.
              </th>
              <th scope="col" className="pr-6 py-3 whitespace-nowrap">
                Token
              </th>
              <th scope="col" className="pr-6 py-3 whitespace-nowrap">
                Room Name
              </th>
              <th scope="col" className="pr-6 py-3 whitespace-nowrap">
                Requester
              </th>
              <th scope="col" className="pr-6 py-3 whitespace-nowrap">
                Price
              </th>
              <th scope="col" className="pr-6 py-3 whitespace-nowrap">
                Status
              </th>
              <th scope="col" className="pr-6 py-3 whitespace-nowrap">
                Request Date
              </th>
              <th scope="col" className="pr-6 py-3 whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  scope="row"
                  colSpan={8}
                  className="py-4  whitespace-nowrap text-gray-700 dark:text-gray-300"
                >
                  <div className="min-h-[100px] flex justify-center items-center bg-gray-100 dark:bg-gray-700 rounded-lg italic">
                    <div className="text-center text-orange-500 font-medium">
                      <SingleLineLoading color="text-primary" />
                    </div>
                  </div>
                </td>
              </tr>
            ) : errorMessage ? (
              <tr>
                <td
                  scope="row"
                  colSpan={8}
                  className="py-4  whitespace-nowrap text-gray-700 dark:text-gray-300"
                >
                  <div className="min-h-[100px] flex justify-center items-center bg-danger/30 rounded-lg italic">
                    <p className="text-center text-danger font-medium">
                      {errorMessage}
                    </p>
                  </div>
                </td>
              </tr>
            ) : items.length > 0 ? (
              items.map((item, index) => (
                <SingleRoomRequestItem
                  item={item}
                  index={index}
                  key={item.id}
                />
              ))
            ) : (
              <tr>
                <td
                  scope="row"
                  colSpan={8}
                  className="py-4  whitespace-nowrap text-gray-700 dark:text-gray-300"
                >
                  <div className="min-h-[100px] flex justify-center items-center bg-gray-100 dark:bg-gray-700 rounded-lg italic">
                    <div className="text-center text-orange-500 font-medium">
                      No data found!
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default function RoomRequestTable() {
  return (
    <Suspense fallback={<SingleLineLoading />}>
      <RoomRequestTableComponent />
    </Suspense>
  );
}
