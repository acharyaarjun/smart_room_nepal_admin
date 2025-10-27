"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Pagination, Search, SingleLineLoading } from "@/components/common";
import { SingleMembershipItem } from "@/components/memberships";
import { Membership } from "@/types/membership";
import { getAllMemberships } from "@/services/membershipService";

const MembershipTableComponent = () => {
  const [items, setItems] = useState<Membership[]>([]);
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
  const [refresh, setRefresh] = useState<boolean>(false);
  const refreshPage = () => {
    setRefresh(!refresh);
  };
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const getItems = async () => {
      try {
        const itemData = await getAllMemberships({
          page: currentPage,
          size: itemsPerPage,
          search: searchValue ? searchValue : "",
          status: selectedStatus,
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
  }, [searchValue, currentPage, itemsPerPage, selectedStatus, refresh]);

  const handlePageChange = async (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const updateItemInList = (updatedItem: Membership, id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? updatedItem : item))
    );
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="flex gap-3 flex-wrap justify-between my-4">
        <div className="flex gap-3 flex-wrap">
          <Search name={"memberships"} />
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className="py-2 px-3 border border-gray-300 dark:border-gray-700 bg-transparent text-gray-700 dark:text-gray-300 rounded-md text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
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
                Transaction ID
              </th>
              <th scope="col" className="pr-6 py-3 whitespace-nowrap">
                Membership Type
              </th>
              <th scope="col" className="pr-6 py-3 whitespace-nowrap">
                Amount
              </th>
              <th scope="col" className="pr-6 py-3 whitespace-nowrap">
                Payment Method
              </th>
              <th scope="col" className="pr-6 py-3 whitespace-nowrap">
                Status
              </th>
              <th scope="col" className="pr-6 py-3 whitespace-nowrap">
                Payment Date
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
                <SingleMembershipItem
                  item={item}
                  index={index}
                  key={item.id}
                  refresh={refreshPage}
                  updateItemInList={updateItemInList}
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

export default function MembershipTable() {
  return (
    <Suspense fallback={<SingleLineLoading />}>
      <MembershipTableComponent />
    </Suspense>
  );
}
