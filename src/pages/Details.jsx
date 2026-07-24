import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getMovieDetails,
  getTVDetails,
  getMovieCollection,
  getMovieWatchProviders,
  getTVWatchProviders,
  getMovieExternalIds,
  getTVExternalIds,
} from "../services/Details";
const Details = () => {
  const { type, id } = useParams();

  const [data, setData] = useState(null);
  const [collection, setCollection] = useState(null);
  const [watchProviders, setWatchProviders] = useState(null);
  const [externalIds, setExternalIds] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Main details
        const details =
          type === "movie" ? await getMovieDetails(id) : await getTVDetails(id);

        setData(details);

        // Collection (Movies only)
        if (type === "movie" && details.belongs_to_collection) {
          const collectionData = await getMovieCollection(
            details.belongs_to_collection.id,
          );

          setCollection(collectionData);
        }

        // Watch Providers
        const providers =
          type === "movie"
            ? await getMovieWatchProviders(id)
            : await getTVWatchProviders(id);

        setWatchProviders(providers);

        // External IDs
        const ids =
          type === "movie"
            ? await getMovieExternalIds(id)
            : await getTVExternalIds(id);

        setExternalIds(ids);
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

  // Find the first official YouTube trailer
  const trailer = data?.videos?.results?.find(
    (video) => video.site === "YouTube" && video.type === "Trailer",
  );
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

              {trailer && (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="flex items-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-900/70 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-orange-500 hover:bg-orange-500 hover:text-black"
                >
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
              )}
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

              <p className="text-lg leading-9 text-gray-300">
                {data.overview || "No story overview available."}
              </p>
            </section>

            {/* Quick Facts */}
            <section>
              <h2 className="text-4xl font-black">
                <span className="text-white">Quick</span>{" "}
                <span className="text-orange-500">Facts</span>
              </h2>

              <div className="mt-3 mb-8 h-1 w-24 rounded-full bg-orange-500"></div>

              <div className="grid gap-5 md:grid-cols-2">
                {/* Status */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-800/80 p-6 transition-all duration-300 hover:border-orange-500">
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

                {/* Collection / Seasons */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-800/80 p-6 transition-all duration-300 hover:border-orange-500">
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-orange-500"
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

                    <p className="text-sm uppercase tracking-widest text-gray-400">
                      {type === "movie" ? "Collection" : "Seasons"}
                    </p>
                  </div>

                  <h3 className="mt-4 text-xl font-bold">
                    {type === "movie"
                      ? data.belongs_to_collection?.name || "Standalone Movie"
                      : data.number_of_seasons}
                  </h3>
                </div>

                {/* Country / Network */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-800/80 p-6 transition-all duration-300 hover:border-orange-500">
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
                        d="M3 12h18M12 3v18"
                      />
                      <circle cx="12" cy="12" r="9" strokeWidth={2} />
                    </svg>

                    <p className="text-sm uppercase tracking-widest text-gray-400">
                      {type === "movie" ? "Country" : "Network"}
                    </p>
                  </div>

                  <h3 className="mt-4 text-xl font-bold">
                    {type === "movie"
                      ? data.production_countries
                          ?.map((country) => country.name)
                          .join(", ") || "N/A"
                      : data.networks
                          ?.map((network) => network.name)
                          .join(", ") || "N/A"}
                  </h3>
                </div>

                {/* Languages / Episodes */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-800/80 p-6 transition-all duration-300 hover:border-orange-500">
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
                        d="M21 12A9 9 0 113 12a9 9 0 0118 0zm-9-9c2.5 2.5 4 5.8 4 9s-1.5 6.5-4 9m0-18C9.5 5.5 8 8.8 8 12s1.5 6.5 4 9"
                      />
                    </svg>

                    <p className="text-sm uppercase tracking-widest text-gray-400">
                      {type === "movie" ? "Languages" : "Episodes"}
                    </p>
                  </div>

                  <h3 className="mt-4 text-xl font-bold">
                    {type === "movie"
                      ? data.spoken_languages
                          ?.map((lang) => lang.english_name)
                          .join(", ") || "N/A"
                      : data.number_of_episodes}
                  </h3>
                </div>
              </div>
            </section>

            {/* Production Details */}
            <section>
              <h2 className="text-4xl font-black">
                <span className="text-white">Production </span>
                <span className="text-orange-500">Details</span>
              </h2>

              <div className="mt-3 mb-8 h-1 w-24 rounded-full bg-orange-500"></div>

              <div className="grid gap-5 md:grid-cols-2">
                {type === "movie" ? (
                  <>
                    {/* Budget */}
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-800/80 p-6 hover:border-orange-500 transition-all">
                      <div className="flex items-center gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-orange-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 8c-2 0-3 1-3 2s1 2 3 2 3 1 3 2-1 2-3 2m0-10v10"
                          />
                        </svg>

                        <p className="text-sm uppercase tracking-widest text-gray-400">
                          Budget
                        </p>
                      </div>

                      <h3 className="mt-4 text-2xl font-bold">
                        {data.budget
                          ? `$${data.budget.toLocaleString()}`
                          : "Not Available"}
                      </h3>
                    </div>

                    {/* Revenue */}
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-800/80 p-6 hover:border-orange-500 transition-all">
                      <div className="flex items-center gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-orange-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 12h14M12 5l7 7-7 7"
                          />
                        </svg>

                        <p className="text-sm uppercase tracking-widest text-gray-400">
                          Box Office
                        </p>
                      </div>

                      <h3 className="mt-4 text-2xl font-bold">
                        {data.revenue
                          ? `$${data.revenue.toLocaleString()}`
                          : "Not Available"}
                      </h3>
                    </div>

                    {/* Homepage */}
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-800/80 p-6 hover:border-orange-500 transition-all">
                      <div className="flex items-center gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-orange-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                          <path
                            strokeWidth={2}
                            strokeLinecap="round"
                            d="M3 12h18M12 3c3 3 5 6 5 9s-2 6-5 9c-3-3-5-6-5-9s2-6 5-9z"
                          />
                        </svg>

                        <p className="text-sm uppercase tracking-widest text-gray-400">
                          Official Site
                        </p>
                      </div>

                      {data.homepage ? (
                        <a
                          href={data.homepage}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-block font-semibold text-orange-500 hover:underline"
                        >
                          Visit Website →
                        </a>
                      ) : (
                        <h3 className="mt-4 text-xl font-bold">
                          Not Available
                        </h3>
                      )}
                    </div>

                    {/* IMDb */}
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-800/80 p-6 hover:border-orange-500 transition-all">
                      <div className="flex items-center gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-orange-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14 3h7v7m0-7L10 14m-4-7H3v14h14v-3"
                          />
                        </svg>

                        <p className="text-sm uppercase tracking-widest text-gray-400">
                          IMDb
                        </p>
                      </div>

                      {data.imdb_id ? (
                        <a
                          href={`https://www.imdb.com/title/${data.imdb_id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-block font-semibold text-orange-500 hover:underline"
                        >
                          View on IMDb →
                        </a>
                      ) : (
                        <h3 className="mt-4 text-xl font-bold">
                          Not Available
                        </h3>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Created By */}
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-800/80 p-6 hover:border-orange-500 transition-all">
                      <p className="text-sm uppercase tracking-widest text-gray-400">
                        Created By
                      </p>

                      <h3 className="mt-4 text-xl font-bold">
                        {data.created_by?.map((c) => c.name).join(", ") ||
                          "Not Available"}
                      </h3>
                    </div>

                    {/* Network */}
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-800/80 p-6 hover:border-orange-500 transition-all">
                      <p className="text-sm uppercase tracking-widest text-gray-400">
                        Network
                      </p>

                      <h3 className="mt-4 text-xl font-bold">
                        {data.networks?.map((n) => n.name).join(", ") ||
                          "Not Available"}
                      </h3>
                    </div>

                    {/* Last Air Date */}
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-800/80 p-6 hover:border-orange-500 transition-all">
                      <p className="text-sm uppercase tracking-widest text-gray-400">
                        Last Air Date
                      </p>

                      <h3 className="mt-4 text-xl font-bold">
                        {data.last_air_date || "Not Available"}
                      </h3>
                    </div>

                    {/* Homepage */}
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-800/80 p-6 hover:border-orange-500 transition-all">
                      <p className="text-sm uppercase tracking-widest text-gray-400">
                        Official Site
                      </p>

                      {data.homepage ? (
                        <a
                          href={data.homepage}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-block font-semibold text-orange-500 hover:underline"
                        >
                          Visit Website →
                        </a>
                      ) : (
                        <h3 className="mt-4 text-xl font-bold">
                          Not Available
                        </h3>
                      )}
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

            {/* Top Cast */}
            <section>
              <h2 className="text-4xl font-black">
                <span className="text-white">Top </span>
                <span className="text-orange-500">Cast</span>
              </h2>

              <div className="mt-3 mb-8 h-1 w-24 rounded-full bg-orange-500"></div>

              {data.credits?.cast?.length ? (
                <div className=" flex gap-8 overflow-x-auto pt-2 pb-4 scrollbar-hide">
                  {data.credits.cast.slice(0, 12).map((actor) => (
                    <div
                      key={actor.id}
                      className="w-32 flex-shrink-0 text-center"
                    >
                      {actor.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                          alt={actor.name}
                          className="mx-auto h-28 w-28 rounded-full border-2 border-zinc-700 object-cover transition-all duration-300 hover:border-orange-500 hover:scale-105"
                        />
                      ) : (
                        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-2 border-zinc-700 bg-zinc-800 transition-all duration-300 hover:border-orange-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-orange-500"
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
                      )}

                      <h3 className="mt-4 line-clamp-2 text-sm font-bold">
                        {actor.name}
                      </h3>

                      <p className="mt-1 line-clamp-2 text-xs text-gray-400">
                        {actor.character || "Unknown Character"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400">
                  No cast information available.
                </p>
              )}
            </section>








          </aside>
        </div>
      </section>
      {showTrailer && trailer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          onClick={() => setShowTrailer(false)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-12 right-0 text-3xl font-bold text-white hover:text-orange-500"
            >
              ✕
            </button>

            <div className="aspect-video overflow-hidden rounded-2xl">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                title={trailer.name}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
