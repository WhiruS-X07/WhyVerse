import { useState, useEffect } from "react";
import { getPeople } from "../../services/tmdb/people";
import PeopleCard from "../../components/people/PersonCard";

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
      <nav aria-label="People pages" className="mt-10 flex flex-col items-center gap-4 border-t border-white/[0.08] pt-6 sm:mt-12 sm:flex-row sm:justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
          Page <span className="text-zinc-200">{currentPage}</span> of <span className="text-zinc-200">{totalPages}</span>
        </p>
        <div className="flex max-w-full flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-xs font-semibold text-white transition hover:border-orange-500/60 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40 sm:px-4 sm:text-sm"
        >
          Previous
        </button>

        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="px-1 text-lg font-semibold text-zinc-500 sm:px-2"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => goToPage(page)}
              aria-current={currentPage === page ? "page" : undefined}
              className={`flex h-9 w-9 items-center justify-center rounded-xl border text-xs font-semibold transition sm:h-10 sm:w-10 sm:text-sm ${
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
          className="rounded-xl border border-orange-500 bg-[#EF5D12] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#F97316] disabled:cursor-not-allowed disabled:opacity-40 sm:px-4 sm:text-sm"
        >
          Next
        </button>
        </div>
      </nav>
    </section>
  );
};

export default People;
