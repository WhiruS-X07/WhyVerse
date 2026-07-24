import { Link } from "react-router-dom";

const Card = ({ item }) => {
  const title = item.title || item.name;
  const year = (item.release_date || item.first_air_date)?.slice(0, 4);
  const mediaType = item.media_type || (item.title ? "movie" : "tv");

  return (
    <Link
      to={`/details/${mediaType}/${item.id}`}
      className="group relative block w-[160px] flex-none overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/20 sm:w-[180px] md:w-[200px] lg:w-[220px]"
    >
      {/* Poster */}
      <img
        src={
          item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : "/placeholder.png"
        }
        alt={title}
        className="h-[240px] w-full object-cover transition-transform duration-700 group-hover:scale-110 sm:h-[270px] md:h-[300px] lg:h-[330px]"
      />

      {/* Rating */}
      <div className="absolute left-3 top-3 z-20 flex items-center gap-2 rounded-full border border-orange-500/40 bg-zinc-900/80 px-2.5 py-1 backdrop-blur-md sm:left-4 sm:top-4 sm:px-3 sm:py-1.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5 text-orange-500 sm:h-4 sm:w-4"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>

        <span className="text-xs font-semibold text-white sm:text-sm">
          {item.vote_average?.toFixed(1) ?? "N/A"}
        </span>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 hidden items-center justify-center bg-black/40 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100 md:flex">
        <div className="w-full translate-y-6 p-6 text-center transition-all duration-500 group-hover:translate-y-0">
          <h2 className="line-clamp-2 text-2xl font-black text-white">
            {title}
          </h2>

          <p className="mt-2 text-sm font-medium text-orange-400">
            {year || "Unknown"}
          </p>

          <p className="mt-5 line-clamp-4 text-sm leading-relaxed text-zinc-300">
            {item.overview || "No overview available."}
          </p>

          <div className="mt-6">
            <span
              className="
                inline-flex items-center gap-2
                rounded-2xl
                bg-orange-500
                px-6 py-3
                font-semibold text-white
                shadow-lg shadow-orange-500/20
                transition-all duration-300
                group-hover:scale-110
                group-hover:-translate-y-1
                group-hover:bg-orange-400
                group-hover:shadow-2xl
                group-hover:shadow-orange-500/50
              "
            >
              View Details
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Info */}
      <div className="p-4 md:hidden">
        <h2 className="line-clamp-1 text-base font-bold text-white sm:text-lg">
          {title}
        </h2>

        <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
          {year || "Unknown"}
        </p>
      </div>
    </Link>
  );
};

export default Card;
