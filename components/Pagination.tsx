import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const DOTS = '...';

function getPaginationRange(current: number, total: number): (number | string)[] {
  const range: (number | string)[] = [];
  const maxButtons = 6;

  if (total <= maxButtons) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const showLeftDots = current > 3;
  const showRightDots = current < total - 2;

  const middlePages: (number | string)[] = [];

  if (!showLeftDots && showRightDots) {
    middlePages.push(2, 3, 4);
    return [...[1], ...middlePages, DOTS, total];
  }

  if (showLeftDots && !showRightDots) {
    middlePages.push(total - 3, total - 2, total - 1);
    return [1, DOTS, ...middlePages, total];
  }

  if (showLeftDots && showRightDots) {
    middlePages.push(current - 1, current, current + 1);
    return [1, DOTS, ...middlePages, DOTS, total];
  }

  return range;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pagination = getPaginationRange(currentPage, totalPages);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex sm:gap-2 gap-1 justify-center mt-4 items-center">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        aria-label="Previous Page"
        className={`sm:px-3 py-1 px-1 border rounded ${
          currentPage === 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'hover:bg-gray-100 cursor-pointer'
        }`}
      >
        &#8592;
      </button>

      {pagination.map((item, idx) => {
        if (item === DOTS) {
          return (
            <span key={idx} className="px-2 py-1 text-gray-500 select-none">
              &hellip;
            </span>
          );
        }

        const pageNum = Number(item);
        return (
          <button
            key={idx}
            onClick={() => onPageChange(pageNum)}
            className={`px-2 py-1 border rounded ${
              currentPage === pageNum
                ? 'bg-blue-600 text-white border-blue-600 pointer-events-none'
                : 'hover:bg-gray-100 cursor-pointer'
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
        className={`sm:px-3 py-1 px-1 border rounded ${
          currentPage === totalPages
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'hover:bg-gray-100 cursor-pointer'
        }`}
      >
        &#8594;
      </button>
    </div>
  );
};

export default Pagination;
