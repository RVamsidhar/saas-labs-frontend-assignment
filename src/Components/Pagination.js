import React from "react";
import { NUMBER1, NUMBER2, NUMBER5 } from "../Utils/constants";

export default function Pagination({ onPageChange, currentPage, totalPages }) {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = NUMBER5;
    const halfRange = Math.floor(maxPageNumbersToShow / NUMBER2);
    let startPage = Math.max(NUMBER1, currentPage - halfRange);
    let endPage = Math.min(totalPages, currentPage + halfRange);

    if (currentPage - halfRange < NUMBER1) {
      endPage = Math.min(
        totalPages,
        endPage + (NUMBER1 - (currentPage - halfRange))
      );
    }

    if (currentPage + halfRange > totalPages) {
      startPage = Math.max(
        NUMBER1,
        startPage - (currentPage + halfRange - totalPages)
      );
    }

    if (startPage > NUMBER1) {
      pageNumbers.push(
        <button
          onClick={() => onPageChange(NUMBER1)}
          key={1}
          aria-label="Page 1"
          className="page-button"
        >
          1
        </button>
      );
      if (startPage > NUMBER2) {
        pageNumbers.push(
          <button
            key="start-ellipsis"
            disabled
            aria-hidden="true"
            className="ellipsis"
          >
            ...
          </button>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`page-button ${currentPage === i ? "active" : ""}`}
          aria-label={`Page ${i}`}
          aria-current={currentPage === i ? "page" : undefined}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - NUMBER1) {
        pageNumbers.push(
          <button
            key="end-ellipsis"
            disabled
            aria-hidden="true"
            className="ellipsis"
          >
            ...
          </button>
        );
      }
      pageNumbers.push(
        <button
          onClick={() => onPageChange(totalPages)}
          key={totalPages}
          aria-label={`Page ${totalPages}`}
          className="page-button"
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div aria-label="Pagination controls" className="pagination">
      <button
        onClick={() => onPageChange(currentPage - NUMBER1)}
        disabled={currentPage === NUMBER1}
        aria-label="Previous page"
        className="page-button"
      >
        {"\u003C"} Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => onPageChange(currentPage + NUMBER1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="page-button"
      >
        Next {"\u003E"}
      </button>
    </div>
  );
}
