import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMovieDetails, getTVDetails } from "../services/Details";

const Details = () => {
  const { type, id } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details =
          type === "movie" ? await getMovieDetails(id) : await getTVDetails(id);

        setData(details);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, [id, type]);

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center text-2xl text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative h-[85vh]">
        {/* Backdrop */}
        <img
          src={
            data.backdrop_path
              ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
              : "/images/backdrop-placeholder.jpg"
          }
          alt={data.title || data.name}
          className="absolute inset-0 h-full w-full object-cover brightness-75"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center gap-16 px-8">
          {/* Poster */}
          <img
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt={data.title || data.name}
            className=" h-[550px] rounded-3xl border border-zinc-700 object-cover shadow-2xl shadow-black/60 "
          />

          {/* Right Side */}
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl font-black leading-tight lg:text-6xl">
              {data.title || data.name}
            </h1>

            <div className="h-1 w-28 rounded-full bg-orange-500" />

            {data.tagline && (
              <p className="max-w-2xl text-lg italic leading-relaxed text-gray-400 lg:text-xl">
                "{data.tagline}"
              </p>
            )}

            {/* Rating & Info */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {/* Rating */}
              <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/70 px-5 py-3 backdrop-blur-md transition-all duration-300 hover:border-orange-500/50 hover:bg-zinc-800/80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 text-orange-500"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>

                <span className="font-bold text-white">
                  {data.vote_average.toFixed(1)}
                </span>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/70 px-5 py-3 backdrop-blur-md transition-all duration-300 hover:border-orange-500/50 hover:bg-zinc-800/80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5 text-orange-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"
                  />
                </svg>
                <span className="whitespace-nowrap font-medium text-white">
                  {data.release_date || data.first_air_date}
                </span>
              </div>

              {/* Runtime */}
              <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/70 px-5 py-3 backdrop-blur-md transition-all duration-300 hover:border-orange-500/50 hover:bg-zinc-800/80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5 text-orange-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v5l3 3m6-4a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {data.runtime || data.episode_run_time?.[0]
                  ? `${data.runtime || data.episode_run_time?.[0]} min`
                  : "N/A"}
              </div>

              {/* Language */}
              <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/70 px-5 py-3 backdrop-blur-md transition-all duration-300 hover:border-orange-500/50 hover:bg-zinc-800/80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5 text-orange-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12A9 9 0 113 12a9 9 0 0118 0zm-9-9c2.5 2.5 4 5.8 4 9s-1.5 6.5-4 9m0-18C9.5 5.5 8 8.8 8 12s1.5 6.5 4 9"
                  />
                </svg>{" "}
                <span className="uppercase">{data.original_language}</span>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {data.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full border border-orange-500/40 bg-zinc-900/60 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:border-orange-500 hover:bg-orange-500 hover:text-black"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-5">
              {data.homepage && (
                <a
                  href={data.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-2xl bg-orange-500 px-8 py-4 font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:scale-105 hover:bg-orange-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 5h6m0 0v6m0-6L10 14"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 7a2 2 0 012-2h3m4 12H7a2 2 0 01-2-2V8"
                    />
                  </svg>
                  Visit Homepage
                </a>
              )}

              <button className="flex items-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-900/70 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-orange-500 hover:bg-orange-500 hover:text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                >
                  <path d="M8 5.14v13.72a1 1 0 001.53.85l10.28-6.86a1 1 0 000-1.66L9.53 4.29A1 1 0 008 5.14z" />
                </svg>
                Watch Trailer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-8 py-20">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* LEFT CONTENT */}
          <div className="space-y-20 lg:col-span-2">
            {/* Story */}
            <section>
              <h2 className="text-4xl font-black">
                <span className="text-white">The</span>{" "}
                <span className="text-orange-500">Story</span>
              </h2>

              <div className="mt-3 mb-8 h-1 w-24 rounded-full bg-orange-500"></div>

              <p className="text-lg leading-9 text-gray-300">{data.overview}</p>
            </section>

            {/* At a Glance */}
            <section>
              <h2 className="text-4xl font-black">
                <span className="text-white">At a</span>{" "}
                <span className="text-orange-500">Glance</span>
              </h2>

              <div className="mt-3 mb-8 h-1 w-24 rounded-full bg-orange-500"></div>

              <div className="grid gap-5 md:grid-cols-2">
                {/* Status */}

                <div className="rounded-2xl border border-zinc-800 bg-zinc-800/80 p-6">
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4"
                      />
                    </svg>

                    <p className="text-sm uppercase tracking-widest text-gray-400">
                      Status
                    </p>
                  </div>

                  <h3 className="mt-4 text-xl font-bold">{data.status}</h3>
                </div>

                {/* Language */}

                <div className="rounded-2xl border border-zinc-800 bg-zinc-800/80 p-6">
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5h18M9 3v2m6-2v2M5 9h14M5 15h14M9 21h6"
                      />
                    </svg>

                    <p className="text-sm uppercase tracking-widest text-gray-400">
                      Language
                    </p>
                  </div>

                  <h3 className="mt-4 text-xl font-bold">
                    {data.original_language.toUpperCase()}
                  </h3>
                </div>

                {/* Release */}

                <div className="rounded-2xl border border-zinc-800 bg-zinc-800/80 p-6">
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"
                      />
                    </svg>

                    <p className="text-sm uppercase tracking-widest text-gray-400">
                      {type === "movie" ? "Release Date" : "First Air Date"}
                    </p>
                  </div>

                  <h3 className="mt-4 text-xl font-bold">
                    {data.release_date || data.first_air_date}
                  </h3>
                </div>

                {/* Runtime */}

                <div className="rounded-2xl border border-zinc-800 bg-zinc-800/80 p-6">
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <circle cx="12" cy="12" r="9" strokeWidth="2" />
                      <path
                        d="M12 7v5l3 2"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>

                    <p className="text-sm uppercase tracking-widest text-gray-400">
                      {type === "movie" ? "Runtime" : "Episode Runtime"}
                    </p>
                  </div>

                  <h3 className="mt-4 text-xl font-bold">
                    {data.runtime || data.episode_run_time?.[0]} min
                  </h3>
                </div>
              </div>
            </section>

            {/* Details */}

            <section>
              <h2 className="text-4xl font-black">
                <span className="text-white">Behind the </span>
                <span className="text-orange-500">Screen</span>
              </h2>

              <div className="mt-3 mb-8 h-1 w-24 rounded-full bg-orange-500"></div>

              <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-800/80">
                {/* MOVIE */}
                {type === "movie" && (
                  <>
                    {/* Budget */}
                    <div className="flex items-center justify-between border-b border-zinc-800 p-6">
                      <div>
                        <p className="text-sm uppercase tracking-widest text-gray-500">
                          Budget
                        </p>

                        <h3 className="mt-2 text-xl font-bold">
                          {data.budget
                            ? `$${data.budget.toLocaleString()}`
                            : "N/A"}
                        </h3>
                      </div>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-orange-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-2 0-3 1-3 2s1 2 3 2 3 1 3 2-1 2-3 2m0-10v10m0-10V6m0 12v2"
                        />
                      </svg>
                    </div>

                    {/* Revenue */}
                    <div className="flex items-center justify-between border-b border-zinc-800 p-6">
                      <div>
                        <p className="text-sm uppercase tracking-widest text-gray-500">
                          Revenue
                        </p>

                        <h3 className="mt-2 text-xl font-bold">
                          {data.revenue
                            ? `$${data.revenue.toLocaleString()}`
                            : "N/A"}
                        </h3>
                      </div>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-orange-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 12h14M12 5l7 7-7 7"
                        />
                      </svg>
                    </div>

                    {/* Collection */}
                    <div className="flex items-center justify-between border-b border-zinc-800 p-6">
                      <div>
                        <p className="text-sm uppercase tracking-widest text-gray-500">
                          Collection
                        </p>

                        <h3 className="mt-2 text-xl font-bold">
                          {data.belongs_to_collection?.name ||
                            "Standalone Movie"}
                        </h3>
                      </div>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-orange-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <rect
                          x="4"
                          y="6"
                          width="16"
                          height="12"
                          rx="2"
                          strokeWidth={2}
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 6V4h8v2"
                        />
                      </svg>
                    </div>

                    {/* IMDb */}
                    <div className="flex items-center justify-between p-6">
                      <div>
                        <p className="text-sm uppercase tracking-widest text-gray-500">
                          IMDb
                        </p>

                        <a
                          href={`https://www.imdb.com/title/${data.imdb_id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-block text-xl font-bold text-orange-500 hover:underline"
                        >
                          View Movie →
                        </a>
                      </div>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-orange-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 3h7v7m0-7L10 14m-4-7H3v14h14v-3"
                        />
                      </svg>
                    </div>
                  </>
                )}

                {/* TV */}
                {type === "tv" && (
                  <>
                    {/* Seasons */}
                    <div className="flex items-center justify-between border-b border-zinc-800 p-6">
                      <div>
                        <p className="text-sm uppercase tracking-widest text-gray-500">
                          Seasons
                        </p>

                        <h3 className="mt-2 text-xl font-bold">
                          {data.number_of_seasons}
                        </h3>
                      </div>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-orange-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <rect
                          x="3"
                          y="5"
                          width="18"
                          height="14"
                          rx="2"
                          strokeWidth={2}
                        />
                        <path
                          strokeWidth={2}
                          strokeLinecap="round"
                          d="M7 9h10M7 15h6"
                        />
                      </svg>
                    </div>

                    {/* Episodes */}
                    <div className="flex items-center justify-between border-b border-zinc-800 p-6">
                      <div>
                        <p className="text-sm uppercase tracking-widest text-gray-500">
                          Episodes
                        </p>

                        <h3 className="mt-2 text-xl font-bold">
                          {data.number_of_episodes}
                        </h3>
                      </div>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-orange-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="16"
                          rx="2"
                          strokeWidth={2}
                        />
                        <polygon
                          points="10,8 16,12 10,16"
                          strokeWidth={2}
                          fill="none"
                        />
                      </svg>
                    </div>

                    {/* Last Air Date */}
                    <div className="flex items-center justify-between border-b border-zinc-800 p-6">
                      <div>
                        <p className="text-sm uppercase tracking-widest text-gray-500">
                          Last Air Date
                        </p>

                        <h3 className="mt-2 text-xl font-bold">
                          {data.last_air_date}
                        </h3>
                      </div>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-orange-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <rect
                          x="4"
                          y="5"
                          width="16"
                          height="15"
                          rx="2"
                          strokeWidth={2}
                        />
                        <path
                          strokeWidth={2}
                          strokeLinecap="round"
                          d="M8 3v4M16 3v4M4 10h16"
                        />
                      </svg>
                    </div>

                    {/* Network */}
                    <div className="flex items-center justify-between border-b border-zinc-800 p-6">
                      <div>
                        <p className="text-sm uppercase tracking-widest text-gray-500">
                          Network
                        </p>

                        <h3 className="mt-2 text-xl font-bold">
                          {data.networks
                            ?.map((network) => network.name)
                            .join(", ") || "N/A"}
                        </h3>
                      </div>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-orange-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <circle cx="12" cy="12" r="3" strokeWidth={2} />
                        <path
                          strokeWidth={2}
                          strokeLinecap="round"
                          d="M4 12a8 8 0 0116 0M7 12a5 5 0 0110 0"
                        />
                      </svg>
                    </div>

                    {/* Created By */}
                    <div className="flex items-center justify-between p-6">
                      <div>
                        <p className="text-sm uppercase tracking-widest text-gray-500">
                          Created By
                        </p>

                        <h3 className="mt-2 text-xl font-bold">
                          {data.created_by
                            ?.map((creator) => creator.name)
                            .join(", ") || "N/A"}
                        </h3>
                      </div>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-orange-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <circle cx="12" cy="8" r="4" strokeWidth={2} />
                        <path
                          strokeWidth={2}
                          strokeLinecap="round"
                          d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6"
                        />
                      </svg>
                    </div>
                  </>
                )}
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-8 lg:col-span-1">
            <section>
              <h2 className="text-4xl font-black">
                <span className="text-white">Production</span>{" "}
                <span className="text-orange-500">Studios</span>
              </h2>

              <div className="mt-3 mb-8 h-1 w-24 rounded-full bg-orange-500"></div>

              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {data.production_companies.map((company) => (
                  <div
                    key={company.id}
                    className="min-w-[140px] flex-shrink-0 rounded-2xl border border-zinc-800 bg-zinc-800/80 p-4 transition-all duration-300 hover:border-orange-500 hover:bg-zinc-800"
                  >
                    {company.logo_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w300${company.logo_path}`}
                        alt={company.name}
                        className="mx-auto h-12 object-contain"
                      />
                    ) : (
                      <div className="flex h-14 items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-orange-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 21h18M5 21V7l7-4 7 4v14"
                          />
                        </svg>
                      </div>
                    )}

                    <h3 className="mt-3 line-clamp-2 text-center text-sm font-bold">
                      {company.name}
                    </h3>

                    <p className="mt-1 text-center text-xs text-gray-400">
                      {company.origin_country || "Unknown"}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Details;
