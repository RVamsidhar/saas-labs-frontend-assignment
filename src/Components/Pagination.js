import React from "react";

export default function Pagination({ onPageChange, currentPage, totalPages }) {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 5;
    const halfRange = Math.floor(maxPageNumbersToShow / 2);
    let startPage = Math.max(1, currentPage - halfRange);
    let endPage = Math.min(totalPages, currentPage + halfRange);

    if (currentPage - halfRange < 1) {
      endPage = Math.min(totalPages, endPage + (1 - (currentPage - halfRange)));
    }

    if (currentPage + halfRange > totalPages) {
      startPage = Math.max(
        1,
        startPage - (currentPage + halfRange - totalPages)
      );
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

    if (startPage > 1) {
      pageNumbers.unshift(
        <button
          key="start-ellipsis"
          disabled
          aria-hidden="true"
          className="ellipsis"
        >
          ...
        </button>
      );
      pageNumbers.unshift(
        <button
          onClick={() => onPageChange(1)}
          key={1}
          aria-label="Page 1"
          className="page-button"
        >
          1
        </button>
      );
    }

    if (endPage < totalPages) {
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
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="page-button"
      >
        {"\u003C"} Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="page-button"
      >
        Next {"\u003E"}
      </button>
    </div>
  );
}
