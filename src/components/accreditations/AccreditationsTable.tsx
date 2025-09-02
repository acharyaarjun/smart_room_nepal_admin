"use client";
import { Accreditation } from "@/types/accreditation";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  FilePreviewModal,
  Pagination,
  Search,
  SingleLineLoading,
} from "@/components/common";
import { Modal } from "@/components/modal";
import {
  AddAccreditationModal,
  SingleAccreditationItem,
} from "@/components/accreditations";
import { DeleteModal } from "@/components/modal";
import { toast } from "react-hot-toast";
import { myAxios } from "@/services/apiService";
import { Media } from "@/types/media";
import { getAllAccreditations } from "@/services/accreditationService";
import AppApis from "@/constants/appApis";

const AccreditationsTableComponent = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [singleAccreditation, setSingleAccreditation] =
    useState<Accreditation | null>(null);

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setSingleAccreditation(null);
    setShowModal(false);
  };

  const setValueInModal = (Accreditation: Accreditation) => {
    setSingleAccreditation(Accreditation);
    openModal();
  };

  const openDeleteModal = (Accreditation: Accreditation) => {
    setSingleAccreditation(Accreditation);
    setShowDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setSingleAccreditation(null);
    setShowDeleteModal(false);
  };

  const [items, setItems] = useState<Accreditation[]>([]);
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
    const getAccreditations = async () => {
      try {
        const itemData = await getAllAccreditations({
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
    getAccreditations();
  }, [searchValue, refresh, currentPage, itemsPerPage]);

  const handlePageChange = async (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const updateAccreditationStatusInList = (id: number, status: boolean) => {
    const updatedAccreditations = items.map((accreditation) => {
      if (accreditation.id === id) {
        accreditation.isActive = status;
      }
      return accreditation;
    });
    setItems(updatedAccreditations);
  };

  const handleDeleteAccreditation = async () => {
    if (!singleAccreditation) return;

    toast.promise(
      myAxios
        .delete(AppApis.accreditations.delete(singleAccreditation.id))
        .then(() => {
          setItems((prevAcc) =>
            prevAcc.filter((acc) => acc.id !== singleAccreditation.id)
          );
          refreshPage();
          closeDeleteModal();
        }),
      {
        loading: "Deleting accreditation...",
        success: "Accreditation deleted successfully!",
        error: "Failed to delete accreditation.",
      },
      {
        id: "toast",
      }
    );
  };

  const [mediaModal, setMediaModal] = useState<boolean>(false);
  const [media, setMedia] = useState<Media | null>(null);
  const openMediaModal = (media: Media) => {
    setMedia(media);
    setMediaModal(true);
  };

  const closeMediaModal = () => setMediaModal(false);

  return (
    <>
      <div className="flex gap-3 flex-wrap justify-between my-4">
        <Search name={"accreditation"} />

        <div>
          <button
            className="py-2 px-3 bg-bluecolor text-[14px] font-normal text-white rounded-md"
            onClick={openModal}
          >
            Add Accreditation
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto my-5">
        <table className="w-full text-sm text-left rtl:text-right ">
          <thead className="text-xs uppercase border-b border-dashed border-light dark:border-dark text-graycolor font-normal">
            <tr>
              <th scope="col" className="pr-6 py-3 whitespace-nowrap">
                S.N.
              </th>
              <th
                scope="col"
                className="py-3 whitespace-nowrap w-[100px] pr-6 lg:pr-0"
              ></th>
              <th scope="col" className="pr-6 py-3 whitespace-nowrap">
                Title
              </th>
              <th scope="col" className="pr-6 py-3 whitespace-nowrap">
                Order
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Active
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  scope="row"
                  colSpan={6}
                  className="pr-6 py-4 font-normal whitespace-nowrap text-graycolor"
                >
                  <div className="min-h-[300px] flex justify-center items-center">
                    <SingleLineLoading />
                  </div>
                </td>
              </tr>
            ) : errorMessage ? (
              <tr>
                <td
                  scope="row"
                  colSpan={6}
                  className="pr-6 py-4 font-normal whitespace-nowrap text-graycolor"
                >
                  <div className="min-h-[300px] flex justify-center items-center">
                    <p className="text-center text-danger font-medium">
                      {errorMessage}
                    </p>
                  </div>
                </td>
              </tr>
            ) : items.length > 0 ? (
              items.map((item: Accreditation, index: number) => (
                <SingleAccreditationItem
                  item={item}
                  refresh={refreshPage}
                  index={index}
                  key={index}
                  updateAccreditationStatusInList={
                    updateAccreditationStatusInList
                  }
                  openDeleteModal={openDeleteModal}
                  openMediaModal={openMediaModal}
                  setValueInModal={setValueInModal}
                />
              ))
            ) : (
              <tr>
                <td
                  scope="row"
                  colSpan={6}
                  className="pr-6 py-4 font-normal whitespace-nowrap text-graycolor"
                >
                  <div className="min-h-[300px] flex justify-center items-center">
                    <p className="text-center text-orange-500 font-medium">
                      No data found
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />

      <Modal isOpen={showModal}>
        <AddAccreditationModal
          closeModal={closeModal}
          refresh={refreshPage}
          accreditation={singleAccreditation ?? undefined}
        />
      </Modal>

      <DeleteModal
        isOpen={showDeleteModal}
        closeModal={closeDeleteModal}
        title="Delete accrediation"
        description={`Are you sure you want to delete the accrediation "${
          singleAccreditation?.title || ""
        }"?`}
        initiateDelete={handleDeleteAccreditation}
      />

      {mediaModal && (
        <FilePreviewModal
          id={media?.id || 0}
          url={media?.url || ""}
          mimeType={media?.mimeType || ""}
          fileName={media?.fileName || ""}
          closeModal={closeMediaModal}
          refresh={refreshPage}
        />
      )}
    </>
  );
};

export default function AccreditationsTable() {
  return (
    <Suspense fallback={<SingleLineLoading />}>
      <AccreditationsTableComponent />
    </Suspense>
  );
}
