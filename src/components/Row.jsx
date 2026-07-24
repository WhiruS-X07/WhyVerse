import { Link } from "react-router-dom";
import Card from "./Card";

const SectionIcon = ({ icon }) => {
  switch (icon) {
    case "popular":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="h-5 w-5 text-orange-500 sm:h-6 sm:w-6"
        >
          <path d="M12 2l2.4 6.8H22l-5.8 4.2L18.6 20 12 15.8 5.4 20l2.4-7L2 8.8h7.6L12 2z" />
        </svg>
      );

    case "play":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="h-5 w-5 text-orange-500 sm:h-6 sm:w-6"
        >
          <path d="M8 5.14v13.72a1 1 0 001.52.85l10.2-6.86a1 1 0 000-1.7L9.52 4.29A1 1 0 008 5.14z" />
        </svg>
      );

    case "star":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="h-5 w-5 text-orange-500 sm:h-6 sm:w-6"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );

    case "upcoming":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          className="h-5 w-5 text-orange-500 sm:h-6 sm:w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 19l14-7-14-7v5l10 2-10 2v5z"
          />
        </svg>
      );

    case "discover":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          className="h-5 w-5 text-orange-500 sm:h-6 sm:w-6"
        >
          <circle cx="12" cy="12" r="9" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.5 8.5l-3.5 7-3.5-3.5 7-3.5z"
          />
        </svg>
      );

    case "tv":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          className="h-5 w-5 text-orange-500 sm:h-6 sm:w-6"
        >
          <rect x="3" y="5" width="18" height="13" rx="2" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 21h8M12 18v3"
          />
        </svg>
      );

    case "airing":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          className="h-5 w-5 text-orange-500 sm:h-6 sm:w-6"
        >
          <circle cx="12" cy="12" r="3" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2v4M12 18v4M2 12h4M18 12h4"
          />
        </svg>
      );

    case "broadcast":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          className="h-5 w-5 text-orange-500 sm:h-6 sm:w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 16a4 4 0 018 0M5 13a7 7 0 0114 0M2 10a10 10 0 0120 0"
          />
          <circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );

    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="h-5 w-5 text-orange-500 sm:h-6 sm:w-6"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
};

const Row = ({ title, icon, items = [], type, category }) => {
  if (!items.length) return null;

  return (
    <section className="mb-10 pt-2 sm:mb-12 lg:mb-16 lg:pt-3">
      {/* Section Header */}
      <div className="mb-6 flex items-center  gap-4 sm:mb-8">
        <SectionIcon icon={icon} />

        <div className="flex flex-col">
          <h2 className="text-xl font-black tracking-tight sm:text-2xl lg:text-3xl">
            <Link
              to={`/view/${type}/${category}`}
              className="text-white transition-all duration-200 hover:text-orange-400 hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.45)]"
            >
              {title}
            </Link>
          </h2>

          <div className="mt-2 h-1 w-20 rounded-full bg-orange-500 sm:w-24 lg:w-28" />
        </div>
      </div>

      {/* Cards */}
      <div className="movie-scroll flex gap-4 overflow-x-auto overflow-y-visible px-1 py-3 sm:gap-5 lg:gap-6">
        {items.slice(0, 10).map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Row;
