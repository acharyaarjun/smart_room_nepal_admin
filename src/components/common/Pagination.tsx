"use client";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  handlePageChange,
}: PaginationProps) {
  return (
    <div className="gi-pro-pagination flex w-full items-center justify-between pt-[15px] max-[575px]:flex-col">
      <span className="text-[14px] text-gray-500 max-[575px]:mb-[10px]">
        Showing page {currentPage} of {totalPages} pages
      </span>
      <ul className="gi-pro-pagination-inner">
        {currentPage > 1 && (
          <li
            className="float-left mr-[5px] inline-block cursor-pointer"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <p
              className={`flex h-[32px] items-center justify-center rounded-[5px] bg-[#eee] p-[2px] px-[5px] text-center align-top text-[16px] font-light leading-[32px] text-gray-500 hover:bg-primary hover:text-[#fff]`}
            >
              <FaChevronLeft className="ml-[3px] size-[12px]" /> Prev
            </p>
          </li>
        )}
        <li className="float-left mr-[5px] inline-block cursor-pointer">
          <p
            className={`flex h-[32px] w-[32px] items-center justify-center rounded-[5px] p-[0] text-center align-top text-[16px] font-light leading-[32px] hover:bg-primary hover:text-[#fff] ${
              currentPage === 1
                ? "bg-primary text-[#fff]"
                : "bg-[#eee] text-gray-500"
            }`}
            onClick={() => handlePageChange(1)}
          >
            {1}
          </p>
        </li>
        <li className="float-left mr-[5px] inline-block cursor-pointer">
          <p
            className={`flex h-[32px] w-[32px] items-center justify-center rounded-[5px] p-[0] text-center align-top text-[16px] font-light leading-[32px] hover:bg-primary hover:text-[#fff] ${
              currentPage === 2
                ? "bg-primary text-[#fff]"
                : "bg-[#eee] text-gray-500"
            } ${totalPages < 2 && "hidden"}`}
            onClick={() => handlePageChange(2)}
          >
            {2}
          </p>
        </li>
        <li className="float-left mr-[5px] inline-block cursor-pointer">
          <p
            className={`flex h-[32px] w-[32px] items-center justify-center rounded-[5px] p-[0] text-center align-top text-[16px] font-light leading-[32px] hover:bg-primary hover:text-[#fff] ${
              currentPage === 3
                ? "bg-primary text-[#fff]"
                : "bg-[#eee] text-gray-500"
            } ${totalPages < 3 && "hidden"}`}
            onClick={() => handlePageChange(3)}
          >
            {3}
          </p>
        </li>
        <li className="float-left mr-[5px] inline-block cursor-pointer">
          <p
            className={`flex h-[32px] w-[32px] items-center justify-center rounded-[5px] p-[0] text-center align-top text-[16px] font-light leading-[32px] hover:bg-primary hover:text-[#fff] ${
              currentPage === 4
                ? "bg-primary text-[#fff]"
                : "bg-[#eee] text-gray-500"
            } ${totalPages < 4 && "hidden"}`}
            onClick={() => handlePageChange(4)}
          >
            {4}
          </p>
        </li>
        <li className="float-left mr-[5px] inline-block cursor-pointer">
          <p
            className={`flex h-[32px] w-[32px] items-center justify-center rounded-[5px] p-[0] text-center align-top text-[16px] font-light leading-[32px] hover:bg-primary hover:text-[#fff] ${
              currentPage === 5
                ? "bg-primary text-[#fff]"
                : "bg-[#eee] text-gray-500"
            } ${totalPages < 5 && "hidden"}`}
            onClick={() => handlePageChange(5)}
          >
            {5}
          </p>
        </li>
        {totalPages > 5 && currentPage > 5 && currentPage < totalPages && (
          <>
            <li
              className={`float-left mr-[5px] inline-block cursor-pointer ${
                totalPages === 6 && currentPage === 5 && "hidden"
              }`}
            >
              <span className="block w-[20px] text-center text-gray-500">
                ...
              </span>
            </li>
            <li className="float-left mr-[5px] inline-block cursor-pointer">
              <p
                className={`"} flex h-[32px] w-[32px] items-center justify-center rounded-[5px] bg-primary p-[0] text-center align-top text-[16px] font-light leading-[32px] text-[#fff]`}
              >
                {currentPage}
              </p>
            </li>
          </>
        )}
        {totalPages >= 6 && (
          <>
            <li
              className={`float-left mr-[5px] inline-block cursor-pointer ${
                totalPages === 6 && currentPage === 5 && "hidden"
              } ${
                currentPage > 5 && currentPage === totalPages - 1 && "hidden"
              }`}
            >
              <span className="block w-[20px] text-center text-gray-500">
                ...
              </span>
            </li>
            <li className="float-left mr-[5px] inline-block cursor-pointer">
              <p
                className={`flex h-[32px] w-[32px] items-center justify-center rounded-[5px] p-[0] text-center align-top text-[16px] font-light leading-[32px] hover:bg-primary hover:text-[#fff] ${
                  currentPage === totalPages
                    ? "bg-primary text-[#fff]"
                    : "bg-[#eee] text-gray-500"
                }`}
              >
                {totalPages}
              </p>
            </li>
          </>
        )}
        {currentPage < totalPages && (
          <li
            className="float-left inline-block cursor-pointer"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <p
              className={`flex h-[32px] items-center justify-center rounded-[5px] bg-[#eee] p-[2px] px-[5px] text-center align-top text-[16px] font-light leading-[32px] text-gray-500 hover:bg-primary hover:text-[#fff]`}
            >
              Next <FaChevronRight className="ml-[3px] size-[12px]" />
            </p>
          </li>
        )}
      </ul>
    </div>
  );
}
