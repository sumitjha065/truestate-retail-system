
// Reusable pagination control component with page numbers and navigation buttons.
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange, maxVisiblePages = 5 }) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-2 mt-6">

      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-lg border flex items-center gap-1 text-sm
          ${currentPage === 1
            ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }
        `}
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </button>

      {/* First page + ellipsis */}
      {!visiblePages.includes(1) && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`w-10 h-10 rounded-lg border text-sm
              ${currentPage === 1
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }
            `}
          >
            1
          </button>
          <span className="px-2 text-gray-500">...</span>
        </>
      )}

      {/* Page numbers */}
      {visiblePages.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => {
            onPageChange(pageNum);
          }}

          className={`w-10 h-10 rounded-lg border text-sm flex items-center justify-center
            ${currentPage === pageNum
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }
          `}
        >
          {pageNum}
        </button>
      ))}

      {/* Last page + ellipsis */}
      {!visiblePages.includes(totalPages) && (
        <>
          <span className="px-2 text-gray-500">...</span>
          <button
            onClick={() => onPageChange(totalPages)}
            className={`w-10 h-10 rounded-lg border text-sm
              ${currentPage === totalPages
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }
            `}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-lg border flex items-center gap-1 text-sm
          ${currentPage === totalPages
            ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }
        `}
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
