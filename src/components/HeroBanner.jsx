import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HeroBanner = ({ items = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Show only the first 5 featured items
  const featuredItems = items.slice(0, 5);

  // Keep the current index valid if the featured items change
  useEffect(() => {
    if (featuredItems.length && currentIndex >= featuredItems.length) {
      setCurrentIndex(0);
    }
  }, [featuredItems.length, currentIndex]);

  const changeItem = (newIndex) => {
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsAnimating(false);
    }, 300);
  };

  const nextItem = () => {
    if (!featuredItems.length) return;

    changeItem((currentIndex + 1) % featuredItems.length);
  };


  // Auto-slide every 5 seconds
  useEffect(() => {
    if (!featuredItems.length) return;

    const timer = setInterval(nextItem, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, featuredItems.length]);

  if (!featuredItems.length) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#EF5D12] border-t-transparent sm:h-12 sm:w-12"></div>
      </div>
    );
  }

  const currentItem = featuredItems[currentIndex];

  return (
    <div className="relative">
      <section className="relative h-[65vh] overflow-hidden rounded-2xl sm:h-[75vh] lg:h-[85vh] lg:rounded-3xl">
        {/* Background */}
        <img
          src={
            currentItem.backdrop_path
              ? `https://image.tmdb.org/t/p/original${currentItem.backdrop_path}`
              : "/images/backdrop-placeholder.jpg"
          }
          alt={currentItem.title || currentItem.name}
          className={`absolute inset-0 h-full w-full object-cover brightness-75 transition-all duration-700 ${
            isAnimating ? "scale-110 opacity-0" : "scale-100 opacity-100"
          }`}
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        {/* Hero */}
        <div
          className={`relative z-10 flex h-full items-center justify-between px-4 sm:px-8 lg:px-12 xl:px-16 transition-all duration-500 ${
            isAnimating
              ? "translate-y-5 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          {/* LEFT */}
          <div className="max-w-3xl text-white">
            {/* Featured Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-zinc-900/70 px-3 py-1.5 backdrop-blur-md sm:px-5 sm:py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-4 w-4 text-orange-500"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>

              <span className="text-xs font-semibold sm:text-sm">Featured</span>
            </div>

            {/* Title */}
            <h1 className="mt-5 text-3xl font-black leading-tight sm:text-4xl lg:mt-6 lg:text-5xl xl:text-6xl 2xl:text-7xl">
              {currentItem.title || currentItem.name}
            </h1>

            {/* Info Badges */}
            <div className="mt-6 flex flex-wrap gap-3 lg:mt-8 lg:gap-4">
              {/* Rating */}
              <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/70 px-3 py-2 backdrop-blur-md sm:px-5 sm:py-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 text-orange-500 sm:h-5 sm:w-5"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>

                <span className="text-sm font-medium sm:text-base">
                  {currentItem.vote_average?.toFixed(1) ?? "N/A"}
                </span>
              </div>

              {/* Release Date */}
              {/* Release Date */}
              <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/70 px-3 py-2 backdrop-blur-md sm:px-5 sm:py-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 text-orange-500 sm:h-5 sm:w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3M4 11h16M6 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2z"
                  />
                </svg>

                <span className="text-sm sm:text-base">
                  {currentItem.release_date ||
                    currentItem.first_air_date ||
                    "Unknown"}
                </span>
              </div>

              {/* Language */}
              <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/70 px-3 py-2 backdrop-blur-md sm:px-5 sm:py-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 text-orange-500 sm:h-5 sm:w-5"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18"
                  />
                </svg>

                <span className="text-sm uppercase sm:text-base">
                  {currentItem.original_language || "N/A"}
                </span>
              </div>
            </div>

            {/* Overview */}
            <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-300 sm:mt-8 sm:text-base lg:text-lg lg:leading-8">
              {currentItem.overview || "No overview available."}
            </p>

            {/* Button */}
            <div className="mt-8 lg:mt-10">
              <Link
                to={`/details/${currentItem.title ? "movie" : "tv"}/${currentItem.id}`}
                className="group inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:scale-105 hover:bg-orange-400 hover:shadow-2xl hover:shadow-orange-500/50 sm:px-6 sm:py-3.5 sm:text-base lg:px-8 lg:py-4"
              >
                View Details
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="hidden lg:flex lg:w-[320px] lg:flex-col lg:gap-4 xl:w-[360px]">
            {featuredItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => changeItem(index)}
                className={`flex items-center gap-4 rounded-2xl border p-3 text-left backdrop-blur-md transition-all duration-300 ${
                  index === currentIndex
                    ? "scale-105 border-orange-500 bg-zinc-900/80 shadow-lg shadow-orange-500/20"
                    : "border-zinc-700 bg-zinc-900/60 hover:scale-105 hover:border-orange-500/50 hover:bg-zinc-800/70"
                }`}
              >
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                      : "/placeholder.png"
                  }
                  alt={item.title || item.name}
                  className="h-20 w-14 rounded-xl object-cover xl:h-24 xl:w-16"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="line-clamp-2 text-sm font-bold text-white xl:text-base">
                    {item.title || item.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-2 text-xs text-zinc-300 xl:mt-3 xl:text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-orange-500"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>

                    <span>{item.vote_average?.toFixed(1) ?? "N/A"}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-8 sm:gap-3">
          {featuredItems.map((_, index) => (
            <button
              key={index}
              onClick={() => changeItem(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "h-2 w-10 bg-orange-500 sm:w-12"
                  : "h-2 w-3 bg-zinc-500 hover:bg-zinc-300"
              }`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HeroBanner;
