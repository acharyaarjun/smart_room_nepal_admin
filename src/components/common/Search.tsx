"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { SingleLineLoading } from "@/components/common";

const SearchContent = ({ name }: { name: string }) => {
  const value = useSearchParams().get("search");
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const handleSubmit = () => {
    if (search !== "") {
      router.push(`/${name}?search=${search}`);
    } else {
      router.replace(`/${name}`);
    }
  };

  useEffect(() => {
    if (value && value !== "") {
      setSearch(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="flex items-center gap-2 rounded-lg bg-transparent border-[1px] border-solid dark:border-gray-600 border-gray-300 px-5 py-[10px] text-sm text-black dark:text-gray-200  focus:outline-none">
          <FaSearch
            className="text-md text-black dark:text-gray-200"
            onClick={handleSubmit}
          />
          <input
            type="text"
            value={search}
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent focus:outline-none"
            onBlur={handleSubmit}
          />
        </div>
      </form>
    </>
  );
};

const Search = ({ name }: { name: string }) => {
  return (
    <Suspense fallback={<SingleLineLoading />}>
      <SearchContent name={name} />
    </Suspense>
  );
};

export default Search;
