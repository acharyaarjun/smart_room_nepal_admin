"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Pagination, SingleLineLoading } from "@/components/common";
import { OrginalMedia } from "@/types/media";
import { getMedias } from "@/services/mediaService";
import { FilePreview } from "@/components/common/";
import Link from "next/link";

const MediaListContent = () => {
  const [items, setItems] = useState<OrginalMedia[]>([]);
  const currentpage = useSearchParams().get("page");
  const [currentPage, setCurrentPage] = useState<number>(
    currentpage ? parseInt(currentpage!) : 1
  );
  const size = useSearchParams().get("size");
  const newsPerPage = size ? parseInt(size) : 40;
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
        setLoading(true);
        setErrorMessage(null);
        const itemsData = await getMedias({
          page: currentPage,
          size: newsPerPage,
          search: searchValue || "",
        });
        setItems(itemsData.data.data);
        setTotalPages(itemsData.data.totalPages);
        setCurrentPage(itemsData.data.currentPage);
      } catch (error: any) {
        setErrorMessage(
          error.response?.data?.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, refresh, currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="flex gap-3 flex-wrap justify-between my-4">
        <div>{/* <Search name={"medias"} /> */}</div>

        <div>
          <Link
            href={`/medias/upload`}
            className="py-2 px-3 bg-bluecolor text-[14px] font-normal text-white rounded-md"
          >
            Add Medias
          </Link>
        </div>
      </div>
      <div className="w-full my-2">
        {loading ? (
          <div className="flex justify-center items-center h-[250px] bg-gray-50 dark:bg-gray-800 rounded-lg">
            <SingleLineLoading />
          </div>
        ) : errorMessage ? (
          <div className="flex justify-center items-center h-[250px] bg-danger/10 text-danger rounded-lg text-sm italic">
            <p>{errorMessage}</p>
          </div>
        ) : items.length === 0 ? (
          <div className="flex justify-center items-center h-[250px] bg-danger/10 text-danger rounded-lg text-sm italic">
            <p>No data found!</p>
          </div>
        ) : (
          <div className="flex justify-start items-center flex-wrap gap-[8px]">
            {items.map((item: OrginalMedia, index: number) => (
              <FilePreview
                key={index}
                id={item.id}
                url={item.url}
                mimeType={item.mimeType}
                fileName={item.fileName}
                height="h-36"
                width="w-36"
                refresh={refreshPage}
              />
            ))}
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

const MediaList = () => {
  return (
    <Suspense fallback={<SingleLineLoading />}>
      <MediaListContent />
    </Suspense>
  );
};

export default MediaList;
