import { useState, useEffect } from "react";
import { getPeople } from "../services/People";
import PeopleCard from "../components/PeopleCard";

const People = () => {
  const [popularPeople, setPopularPeople] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getPeople(currentPage);

        setPopularPeople(data.results);
        setTotalPages(Math.min(data.total_pages, 100));
      } catch (error) {
        console.error("Error fetching people:", error);
        setError("Failed to load popular people.");
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, [currentPage]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#EF5D12] border-t-transparent sm:h-12 sm:w-12"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-2xl font-bold text-white">Something went wrong</h2>

        <p className="text-slate-400">{error}</p>

        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-[#EF5D12] px-5 py-2 text-white transition hover:bg-[#F97316]"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 xl:px-10">
      <PeopleCard title="Popular People" items={popularPeople} />

      {/* Pagination */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:border-orange-500 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-lg font-semibold text-zinc-500"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium transition ${
                currentPage === page
                  ? "border-orange-500 bg-[#EF5D12] text-white"
                  : "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-orange-500 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              {page}
            </button>
          ),
        )}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-lg border border-orange-500 bg-[#EF5D12] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#F97316] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default People;
