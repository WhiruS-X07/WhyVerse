import { Link } from "react-router-dom";

const Card = ({ item }) => {
  const title = item.title || item.name;
  const year = (item.release_date || item.first_air_date)?.slice(0, 4);

  return (
    <Link
      to={`/details/${item.media_type || (item.title ? "movie" : "tv")}/${item.id}`}
      className="group relative block w-[220px] flex-none overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/20"
    >
      {/* Poster */}
      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt={title}
        className="h-[330px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Rating */}
      <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-orange-500/40 bg-zinc-900/80 px-3 py-1.5 backdrop-blur-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="h-4 w-4 text-orange-500"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>

        <span className="text-sm font-semibold text-white">
          {item.vote_average.toFixed(1)}
        </span>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 hidden items-center justify-center bg-black/40 backdrop-blur-md opacity-0 transition-all duration-500 group-hover:opacity-100 md:flex">
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
            <div
              className="
                inline-flex items-center gap-2
                rounded-2xl
                bg-orange-500
                px-6 py-3
                font-semibold text-white
                shadow-lg shadow-orange-500/20
                transition-all duration-300
                hover:scale-110
                hover:-translate-y-1
                hover:bg-orange-400
                hover:shadow-2xl
                hover:shadow-orange-500/50
                cursor-pointer
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
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Info */}
      <div className="p-4 md:hidden">
        <h2 className="line-clamp-1 text-lg font-bold text-white">{title}</h2>

        <p className="mt-1 text-sm text-zinc-400">{year || "Unknown"}</p>
      </div>
    </Link>
  );
};

export default Card;
