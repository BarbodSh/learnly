import React from "react";

function usePagination(totalItems = 0, pageSize = 1, currentPage = 1) {
  if (totalItems <= 0 || pageSize <= 0) {
    return {
      totalPages: [],
      startIndex: 0,
      endIndex: 0,
    };
  }

  const totalPagesLength = Math.ceil(totalItems / pageSize);
  const totalPages = Array.from({ length: totalPagesLength }, (_, i) => i + 1);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return { totalPages, startIndex, endIndex };
}

export default usePagination;
