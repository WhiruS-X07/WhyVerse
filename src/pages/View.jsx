import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Card from "../components/Card";

import { getMovies, getDiscoverMovies } from "../services/Movies";
import { getTVShows, getDiscoverTV } from "../services/TVShows";

const PAGE_LIMIT = 20;

const TITLES = {
  movie: {
    popular: "Popular Movies",
    top_rated: "Top Rated Movies",
    upcoming: "Upcoming Movies",
    now_playing: "Now Playing Movies",
    discover: "Discover Movies",
  },
  tv: {
    popular: "Popular TV Shows",
    top_rated: "Top Rated TV Shows",
    airing_today: "Airing Today",
    on_the_air: "On The Air",
    discover: "Discover TV Shows",
  },
};

const View = () => {
  const { type, category } = useParams();

  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(null);

        let data;

        if (type === "movie") {
          data =
            category === "discover"
              ? await getDiscoverMovies(currentPage)
              : await getMovies(category, currentPage);
        } else if (type === "tv") {
          data =
            category === "discover"
              ? await getDiscoverTV(currentPage)
              : await getTVShows(category, currentPage);
        } else {
          throw new Error("Invalid media type.");
        }

        setItems(data.results);
        setTotalPages(Math.min(data.total_pages, PAGE_LIMIT));
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [type, category, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [type, category]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;

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

        <p className="text-zinc-400">{error}</p>

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
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          {TITLES[type]?.[category] ?? "Results"}
        </h1>

        <div className="mt-2 h-1 w-24 rounded-full bg-[#EF5D12]" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-2 text-zinc-500">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`h-10 w-10 rounded-lg transition ${
                currentPage === page
                  ? "bg-[#EF5D12] text-white"
                  : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              {page}
            </button>
          ),
        )}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-lg border border-orange-500 bg-[#EF5D12] px-4 py-2 text-white transition hover:bg-[#F97316] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default View;
    