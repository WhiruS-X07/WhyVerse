import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HeroBanner = ({ items = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const featuredItems = items.slice(0, 5);

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
    changeItem((currentIndex + 1) % featuredItems.length);
  };

  const prevItem = () => {
    changeItem(
      currentIndex === 0 ? featuredItems.length - 1 : currentIndex - 1,
    );
  };

  useEffect(() => {
    if (!featuredItems.length) return;

    const timer = setInterval(nextItem, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, featuredItems.length]);

  if (!featuredItems.length) {
    return (
      <div className="flex h-[75vh] items-center justify-center text-xl text-white">
        Loading...
      </div>
    );
  }

  const currentItem = featuredItems[currentIndex];

  return (
    <div className="relative">
      <section className="relative h-[85vh] overflow-hidden rounded-3xl">
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
          className={`relative z-10 flex h-full items-center justify-between px-12 xl:px-16 transition-all duration-500 ${
            isAnimating
              ? "translate-y-5 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          {/* LEFT */}
          <div className="max-w-3xl text-white">
            {/* Featured Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-zinc-900/70 px-5 py-2 backdrop-blur-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-4 w-4 text-orange-500"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>

              <span className="text-sm font-semibold">Featured</span>
            </div>

            {/* Title */}
            <h1 className="mt-6 text-5xl font-black leading-tight lg:text-6xl xl:text-7xl">
              {currentItem.title || currentItem.name}
            </h1>

            {/* Info Badges */}
            <div className="mt-8 flex flex-wrap gap-4">
              {/* Rating */}
              <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/70 px-5 py-3 backdrop-blur-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-orange-500"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>

                <span className="font-medium">
                  {currentItem.vote_average.toFixed(1)}
                </span>
              </div>

              {/* Release Date */}
              <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/70 px-5 py-3 backdrop-blur-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-orange-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3M4 11h16M6 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2z"
                  />
                </svg>

                <span>
                  {currentItem.release_date || currentItem.first_air_date}
                </span>
              </div>

              {/* Language */}
              <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/70 px-5 py-3 backdrop-blur-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-orange-500"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18"
                  />
                </svg>

                <span className="uppercase">
                  {currentItem.original_language}
                </span>
              </div>
            </div>

            {/* Overview */}
            <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-300">
              {currentItem.overview || "No overview available."}
            </p>

            {/* Button */}
            <div className="mt-10">
              <Link
                to={`/details/${
                  currentItem.title ? "movie" : "tv"
                }/${currentItem.id}`}
              >
                <button className="group inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-8 py-4 font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:scale-105 hover:bg-orange-400 hover:shadow-2xl hover:shadow-orange-500/50">
                  View Details
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="hidden lg:flex flex-col gap-4">
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
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  alt={item.title || item.name}
                  className="h-24 w-16 rounded-xl object-cover"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="line-clamp-2 font-bold text-white">
                    {item.title || item.name}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-sm text-zinc-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-orange-500"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>

                    <span>{item.vote_average.toFixed(1)}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
          {featuredItems.map((_, index) => (
            <button
              key={index}
              onClick={() => changeItem(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "h-2 w-12 bg-orange-500"
                  : "h-2 w-3 bg-zinc-500 hover:bg-zinc-300"
              }`}
            />
          ))}
        </div>
      </section>
      {/* Previous */}
      <button
        onClick={prevItem}
        className="
          absolute
          -left-20
          top-1/2
          z-30
          flex
          h-20
          w-20
          -translate-y-1/2
          items-center
          justify-center
          bg-transparent
          text-white/45
          transition-all
          duration-300
          hover:scale-125
          hover:-translate-x-1
          hover:text-orange-500
          hover:drop-shadow-[0_0_20px_rgba(249,115,22,0.8)]
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
          className="h-10 w-10 transition-transform duration-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={nextItem}
        className="
          absolute
          -right-20
          top-1/2
          z-30
          flex
          h-20
          w-20
          -translate-y-1/2
          items-center
          justify-center
          bg-transparent
          text-white/45
          transition-all
          duration-300
          hover:scale-125
          hover:translate-x-1
          hover:text-orange-500
          hover:drop-shadow-[0_0_20px_rgba(249,115,22,0.8)]
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
          className="h-10 w-10 transition-transform duration-300"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default HeroBanner;
