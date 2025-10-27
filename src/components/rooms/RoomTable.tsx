"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Pagination, Search, SingleLineLoading } from "@/components/common";
import { SingleRoomItem } from "@/components/rooms";
import { Room } from "@/types/room";
import { getAllRooms } from "@/services/roomService";
import { getAllDistricts } from "@/services/districtService";
import { getAllUsers } from "@/services/userService";
import RoomStatus from "@/enums/roomStatus";
import RoomType from "@/enums/roomType";
import MaxCapacity from "@/enums/maxCapacity";

const RoomTableComponent = () => {
  const [items, setItems] = useState<Room[]>([]);
  const currentpage = useSearchParams().get("page");
  const [currentPage, setCurrentPage] = useState<number>(
    currentpage ? parseInt(currentpage!) : 1
  );
  const size = useSearchParams().get("size");
  const itemsPerPage = size ? parseInt(size) : 10;
  const [totalPages, setTotalPages] = useState<number>(0);
  const searchValue = useSearchParams().get("search");

  // Filters
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedCapacity, setSelectedCapacity] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedHost, setSelectedHost] = useState<number>(0);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState<boolean>(false);

  // Filter options
  const [districts, setDistricts] = useState<any[]>([]);
  const [hosts, setHosts] = useState<any[]>([]);

  const [refresh, setRefresh] = useState<boolean>(false);
  const refreshPage = () => {
    setRefresh(!refresh);
  };
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch districts and hosts on mount
  useEffect(() => {
    const fetchFiltersData = async () => {
      try {
        const [districtsData, hostsData] = await Promise.all([
          getAllDistricts({ page: 1, size: 1000 }),
          getAllUsers({ page: 1, size: 1000, role: "host" }),
        ]);
        setDistricts(districtsData.data.data || []);
        setHosts(hostsData.data.data || []);
      } catch (error) {
        console.error("Failed to fetch filter data:", error);
      }
    };
    fetchFiltersData();
  }, []);

  useEffect(() => {
    const getItems = async () => {
      try {
        const itemData = await getAllRooms({
          page: currentPage,
          size: itemsPerPage,
          search: searchValue ? searchValue : "",
          roomStatus: selectedStatus,
          roomType: selectedType,
          maxCapacity: selectedCapacity,
          district: selectedDistrict,
          userId: selectedHost,
          isFeatured: showFeaturedOnly,
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
  }, [
    searchValue,
    currentPage,
    itemsPerPage,
    selectedStatus,
    selectedType,
    selectedCapacity,
    selectedDistrict,
    selectedHost,
    showFeaturedOnly,
    refresh,
  ]);

  const handlePageChange = async (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const updateItemInList = (updatedItem: Room, id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? updatedItem : item))
    );
  };

  return (
    <>
      <div className="flex gap-3 flex-wrap justify-between my-4">
        <div className="flex gap-3 flex-wrap">
          <Search name={"rooms"} />

          {/* Room Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="py-2 px-3 border border-gray-300 dark:border-gray-700 bg-transparent text-gray-700 dark:text-gray-300 rounded-md text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Status</option>
            {Object.values(RoomStatus).map((status) => (
              <option key={status} value={status}>
                {status
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </option>
            ))}
          </select>

          {/* Room Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setCurrentPage(1);
            }}
            className="py-2 px-3 border border-gray-300 dark:border-gray-700 bg-transparent text-gray-700 dark:text-gray-300 rounded-md text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Types</option>
            {Object.values(RoomType).map((type) => (
              <option key={type} value={type}>
                {type
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </option>
            ))}
          </select>

          {/* Max Capacity Filter */}
          <select
            value={selectedCapacity}
            onChange={(e) => {
              setSelectedCapacity(e.target.value);
              setCurrentPage(1);
            }}
            className="py-2 px-3 border border-gray-300 dark:border-gray-700 bg-transparent text-gray-700 dark:text-gray-300 rounded-md text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Capacity</option>
            {Object.values(MaxCapacity).map((capacity) => (
              <option key={capacity} value={capacity}>
                {capacity.replace(/_/g, " ")}
              </option>
            ))}
          </select>

          {/* District Filter */}
          <select
            value={selectedDistrict}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setCurrentPage(1);
            }}
            className="py-2 px-3 border border-gray-300 dark:border-gray-700 bg-transparent text-gray-700 dark:text-gray-300 rounded-md text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Districts</option>
            {districts.map((district) => (
              <option key={district.id} value={district.slug}>
                {district.name}
              </option>
            ))}
          </select>

          {/* Host Filter */}
          <select
            value={selectedHost}
            onChange={(e) => {
              setSelectedHost(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="py-2 px-3 border border-gray-300 dark:border-gray-700 bg-transparent text-gray-700 dark:text-gray-300 rounded-md text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="0">All Hosts</option>
            {hosts.map((host) => (
              <option key={host.id} value={host.id}>
                {host.fullName}
              </option>
            ))}
          </select>

          {/* Featured Filter */}
          <label className="flex items-center gap-2 py-2 px-3 border border-gray-300 dark:border-gray-700 bg-transparent text-gray-700 dark:text-gray-300 rounded-md text-[14px] cursor-pointer">
            <input
              type="checkbox"
              checked={showFeaturedOnly}
              onChange={(e) => {
                setShowFeaturedOnly(e.target.checked);
                setCurrentPage(1);
              }}
              className="cursor-pointer w-4 h-4"
            />
            <span>Featured Only</span>
          </label>
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
                Image
              </th>
              <th scope="col" className="pr-6 py-3 whitespace-nowrap">
                Name
              </th>
              <th scope="col" className="pr-6 py-3 whitespace-nowrap">
                Host
              </th>
              <th scope="col" className="pr-6 py-3 whitespace-nowrap">
                District
              </th>
              <th scope="col" className="pr-6 py-3 whitespace-nowrap">
                Type
              </th>
              <th scope="col" className="pr-6 py-3 whitespace-nowrap">
                Price
              </th>
              <th scope="col" className="pr-6 py-3 whitespace-nowrap">
                Status
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
                  colSpan={9}
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
                  colSpan={9}
                  className="py-4 whitespace-nowrap text-gray-700 dark:text-gray-300"
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
                <SingleRoomItem
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
                  colSpan={9}
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

export default function RoomTable() {
  return (
    <Suspense fallback={<SingleLineLoading />}>
      <RoomTableComponent />
    </Suspense>
  );
}
