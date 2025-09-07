"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Pagination, Search, SingleLineLoading } from "@/components/common";
import { AddAmenityModal, SingleAmenityItem } from "@/components/amenity";
import toast from "react-hot-toast";
import { DeleteModal, Modal } from "@/components/modal";
import { Amenity } from "@/types/amenity";
import { getAllAmenities } from "@/services/amenityService";
import { myAxios } from "@/services/apiService";
import AppApis from "@/constants/appApis";

const AmenityTableComponent = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deletingItem, setDeletingItem] = useState<Amenity | null>(null);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const openDeleteModal = (amenity: Amenity) => {
    setDeletingItem(amenity);
    setShowDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setDeletingItem(null);
    setShowDeleteModal(false);
  };

  const [items, setItems] = useState<Amenity[]>([]);
  const currentpage = useSearchParams().get("page");
  const [currentPage, setCurrentPage] = useState<number>(
    currentpage ? parseInt(currentpage!) : 1
  );
  const size = useSearchParams().get("size");
  const itemsPerPage = size ? parseInt(size) : 10;
  const [totalPages, setTotalPages] = useState<number>(0);
  const searchValue = useSearchParams().get("search");
  const [refresh, setRefresh] = useState<boolean>(false);
  const refreshPage = () => {
    setRefresh(!refresh);
  };
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const getItems = async () => {
      try {
        const itemData = await getAllAmenities({
          page: currentPage,
          size: itemsPerPage,
          search: searchValue ? searchValue : "",
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
  }, [searchValue, currentPage, itemsPerPage, refresh]);

  const handlePageChange = async (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteItem = async () => {
    if (!deletingItem) return;

    toast.promise(
      myAxios.delete(AppApis.amenity.delete(deletingItem.id)).then(() => {
        setItems((prevAmenities) =>
          prevAmenities.filter((amenity) => amenity.id !== deletingItem.id)
        );
        refreshPage();
        closeDeleteModal();
      }),
      {
        loading: "Deleting item...",
        success: "Item deleted successfully!",
        error: "Failed to delete item.",
      },
      {
        id: "toast",
      }
    );
  };

  const updateItemInList = (updatedItem: Amenity, id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? updatedItem : item))
    );
  };

  return (
    <>
      <div className="flex gap-3 flex-wrap justify-between my-4">
        <Search name={"amenities"} />
        <div>
          <button
            className="cursor-pointer py-2 px-3 bg-primary text-[14px]  text-white rounded-md"
            onClick={openModal}
          >
            Add Amenity
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto my-5">
        <table className="w-full text-sm text-left rtl:text-right ">
          <thead className="text-xs uppercase border-b border-dashed border-gray-300 dark:border-gray-700 font-medium text-gray-700 dark:text-gray-300 ">
            <tr>
              <th scope="col" className="pr-6 py-3 whitespace-nowrap">
                S.N.
              </th>
              <th scope="col" className="py-3 pr-6 whitespace-nowrap"></th>
              <th scope="col" className="pr-6 py-3 whitespace-nowrap">
                Name
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
                  colSpan={4}
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
                  colSpan={4}
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
                <SingleAmenityItem
                  item={item}
                  index={index}
                  key={item.id}
                  openDeleteModal={openDeleteModal}
                  refresh={refreshPage}
                  updateItemInList={updateItemInList}
                />
              ))
            ) : (
              <tr>
                <td
                  scope="row"
                  colSpan={4}
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

      <Modal isOpen={showModal}>
        <AddAmenityModal
          closeModal={closeModal}
          refresh={refreshPage}
          updateItemInList={updateItemInList}
        />
      </Modal>

      <DeleteModal
        isOpen={showDeleteModal}
        closeModal={closeDeleteModal}
        title="Delete Amenity"
        description={`Are you sure you want to delete  ${deletingItem?.name}?`}
        initiateDelete={handleDeleteItem}
      />
    </>
  );
};

export default function AmenityTable() {
  return (
    <Suspense fallback={<SingleLineLoading />}>
      <AmenityTableComponent />
    </Suspense>
  );
}
