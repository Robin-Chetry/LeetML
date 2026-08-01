import { useSelector } from "react-redux";

function Pagination({ setFilters }) {
  // Extract pagination values directly from Redux
  const { currentPage, totalPages } = useSelector(
    (state) => state.problem
  );

  // Hide pagination entirely if there is 1 or 0 pages
  if (totalPages <= 1) {
    return null;
  }

  // Safely change pages
  const changePage = (page) => {
    if (typeof page !== "number" || page < 1 || page > totalPages) return;

    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  // Smart page calculation algorithm (LeetCode / GitHub style truncation)
  const getVisiblePages = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (start > 2) pages.push("...");

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getVisiblePages();

  return (
    <div className="flex justify-center mt-8 mb-10">
      <div className="join">

        {/* Previous Button */}
        <button
          className="join-item btn"
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        >
          Previous
        </button>

        {/* Page Buttons / Ellipses */}
        {pages.map((page, index) =>
          page === "..." ? (
            <button
              key={`ellipsis-${index}`}
              className="join-item btn btn-disabled"
            >
              ...
            </button>
          ) : (
            <button
              key={page}
              onClick={() => changePage(page)}
              className={`join-item btn ${
                page === currentPage ? "btn-active" : ""
              }`}
            >
              {page}
            </button>
          )
        )}

        {/* Next Button */}
        <button
          className="join-item btn"
          disabled={currentPage === totalPages}
          onClick={() => changePage(currentPage + 1)}
        >
          Next
        </button>

      </div>
    </div>
  );
}

export default Pagination;