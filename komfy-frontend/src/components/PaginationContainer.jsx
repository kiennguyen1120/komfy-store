import React from "react";
import { useLocation, useNavigate, useLoaderData } from "react-router-dom";

const PaginationContainer = () => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const { currentPage, totalPages } = useLoaderData();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  return totalPages > 1 ? (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prevPage = currentPage - 1;
            if (prevPage < 1) prevPage = totalPages;
            handlePageChange(prevPage);
          }}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            onClick={() => handlePageChange(index + 1)}
            key={`page-${index + 1}`}
            className={`btn btn-xs sm:btn-md border-none join-item ${
              index + 1 === currentPage && "bg-base-300 border-base-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let nextPage = currentPage + 1;
            if (nextPage > totalPages) nextPage = 1;
            handlePageChange(nextPage);
          }}
        >
          Next
        </button>
      </div>
    </div>
  ) : null;
};

export default PaginationContainer;
