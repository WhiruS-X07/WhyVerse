import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import MediaCard from "../../components/media/MediaCard";
import { searchTitlesAndPeople } from "../../services/tmdb/search";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const MAX_PAGE = 500;
const FILTERS = [
  ["all", "All results"],
  ["movie", "Movies"],
  ["tv", "TV shows"],
  ["person", "People"],
];

const PersonResultCard = ({ person }) => (
  <Link to={`/person/${person.id}`} className="group min-w-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#151515] transition hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-950/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400">
    <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
      <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_50%_35%,rgba(239,93,18,0.2),transparent_45%),linear-gradient(145deg,#27211e,#111)] text-5xl font-black text-white/20" aria-hidden="true">{person.name?.charAt(0) || "?"}</div>
      {person.profile_path && <img src={`${IMAGE_BASE_URL}${person.profile_path}`} alt={person.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]" onError={(event) => { event.currentTarget.style.display = "none"; }} />}
      <span className="absolute left-2.5 top-2.5 rounded-full border border-white/15 bg-black/70 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-orange-200 backdrop-blur">Person</span>
    </div>
    <div className="p-3 sm:p-4">
      <h2 className="truncate text-sm font-bold text-white sm:text-base">{person.name}</h2>
      <p className="mt-1 truncate text-xs text-zinc-500">{person.known_for_department || "Film & television"}</p>
      {!!person.known_for?.length && <p className="mt-3 line-clamp-2 text-xs leading-5 text-zinc-400">Known for: {person.known_for.slice(0, 2).map((item) => item.title || item.name).filter(Boolean).join(", ")}</p>}
    </div>
  </Link>
);

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim();
  const requestedPage = Number.parseInt(searchParams.get("page") || "1", 10);
  const page = Number.isFinite(requestedPage) ? Math.min(Math.max(requestedPage, 1), MAX_PAGE) : 1;
  const requestedType = searchParams.get("type") || "all";
  const filter = FILTERS.some(([value]) => value === requestedType) ? requestedType : "all";
  const [sort, setSort] = useState("popularity");
  const [response, setResponse] = useState(null);
  const [failure, setFailure] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const queryTimer = useRef(null);
  const requestKey = `${query}|${page}|${retryCount}`;

  useEffect(() => {
    if (query.length < 2) return undefined;
    const controller = new AbortController();

    searchTitlesAndPeople(query, page, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) {
          setResponse({ key: requestKey, data });
          setFailure(null);
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) setFailure({ key: requestKey, message: "Search results couldn’t load. Check your connection and try again." });
      });

    return () => controller.abort();
  }, [query, page, requestKey]);

  useEffect(() => () => window.clearTimeout(queryTimer.current), []);

  const data = response?.key === requestKey ? response.data : null;
  const isLoading = query.length >= 2 && !data && failure?.key !== requestKey;
  const errorMessage = failure?.key === requestKey ? failure.message : null;

  const visibleResults = useMemo(() => {
    const filtered = (data?.results ?? []).filter((item) => filter === "all" || item.media_type === filter);
    if (sort !== "newest") return filtered;
    return [...filtered].sort((a, b) => {
      const dateA = a.release_date || a.first_air_date || "";
      const dateB = b.release_date || b.first_air_date || "";
      return dateB.localeCompare(dateA) || (b.popularity ?? 0) - (a.popularity ?? 0);
    });
  }, [data, filter, sort]);

  const totalPages = Math.max(1, Math.min(data?.total_pages ?? 1, MAX_PAGE));
  const totalResults = data?.total_results ?? 0;

  const submitSearch = (event) => {
    event.preventDefault();
    window.clearTimeout(queryTimer.current);
    const nextQuery = new FormData(event.currentTarget).get("query")?.toString().trim() ?? "";
    if (nextQuery.length < 2) return;
    setSort("popularity");
    setSearchParams({ q: nextQuery });
  };

  const handleQueryInput = (value) => {
    window.clearTimeout(queryTimer.current);
    const nextQuery = value.trim();
    queryTimer.current = window.setTimeout(() => {
      setSort("popularity");
      setSearchParams(nextQuery ? { q: nextQuery } : {}, { replace: true });
    }, 280);
  };

  const changeFilter = (nextFilter) => {
    setSearchParams({ q: query, ...(nextFilter === "all" ? {} : { type: nextFilter }) });
  };

  const changePage = (nextPage) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    setSearchParams({ q: query, ...(filter === "all" ? {} : { type: filter }), ...(nextPage > 1 ? { page: String(nextPage) } : {}) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#080808] px-4 py-8 text-white sm:px-6 sm:py-12 lg:px-10">
      <div className="mx-auto max-w-[1480px]">
        <header className="relative mb-7 overflow-hidden rounded-3xl border border-white/[0.08] bg-[radial-gradient(ellipse_at_88%_10%,rgba(239,93,18,0.18),transparent_42%),linear-gradient(120deg,#181411,#0d0d0d_68%)] px-5 py-7 sm:mb-9 sm:px-8 sm:py-9 lg:px-10">
          <div className="relative z-10 max-w-3xl">
            <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400 sm:text-xs"><span className="h-px w-7 bg-orange-500" />Find your next story</p>
            <h1 className="break-words text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">Search <span className="text-orange-500">WhyVerse</span></h1>
            <p className="mt-2 text-sm text-zinc-400">Search movies, series, and the people behind them.</p>
            <form onSubmit={submitSearch} className="mt-5 flex max-w-2xl gap-2 sm:mt-6">
              <label className="sr-only" htmlFor="full-search-query">Search movies, TV shows, and people</label>
              <div className="relative min-w-0 flex-1">
                <svg className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
                <input id="full-search-query" name="query" type="search" defaultValue={query} onChange={(event) => handleQueryInput(event.target.value)} placeholder="Try a title, series, or person" className="w-full rounded-xl border border-white/10 bg-black/40 py-3 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15" />
              </div>
              <button type="submit" className="shrink-0 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-400 sm:px-6">Search</button>
            </form>
          </div>
          <div aria-hidden="true" className="absolute -right-10 -top-16 h-56 w-56 rounded-full border border-orange-500/10 sm:h-72 sm:w-72" />
          <div aria-hidden="true" className="absolute -right-1 -top-7 h-40 w-40 rounded-full border border-orange-500/[0.07] sm:h-52 sm:w-52" />
        </header>

        {query.length < 2 ? (
          <div className="rounded-2xl border border-white/[0.08] bg-[#111] px-5 py-12 text-center">
            <p className="font-semibold text-white">Enter at least 2 characters to search.</p>
            <p className="mt-2 text-sm text-zinc-500">Results include movies, TV shows, and people.</p>
          </div>
        ) : (
          <>
            <div className="mb-5 flex flex-col gap-4 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[.16em] text-zinc-500">Search results for</p>
                <h2 className="mt-1 break-words text-2xl font-black sm:text-3xl">“{query}”</h2>
                {data && <p className="mt-1 text-sm text-zinc-500">{data.used_fuzzy_match ? "No exact match; showing close spelling matches." : `${totalResults.toLocaleString()} matches · sorted by ${sort === "popularity" ? "popularity" : "release date"}`}</p>}
              </div>
              {/* Sorting control kept here for a future search-page update:
              <label className="flex items-center gap-2 text-xs text-zinc-500">
                <span className="sr-only">Sort search results</span>
                <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-full border border-white/10 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-200 outline-none focus:border-orange-500"><option value="popularity">Most popular</option><option value="newest">Newest first</option></select>
              </label>
              */}
            </div>

            <div className="movie-scroll mb-5 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter search results">
              {FILTERS.map(([value, label]) => <button key={value} type="button" aria-pressed={filter === value} onClick={() => changeFilter(value)} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition ${filter === value ? "border-orange-500 bg-orange-500 text-white" : "border-white/10 bg-white/[0.03] text-zinc-300 hover:border-orange-500/50 hover:text-white"}`}>{label}</button>)}
            </div>

            {errorMessage ? (
              <div className="rounded-2xl border border-white/[0.08] bg-[#111] px-5 py-12 text-center">
                <p className="text-sm text-zinc-400">{errorMessage}</p>
                <button type="button" onClick={() => setRetryCount((value) => value + 1)} className="mt-4 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-400">Try again</button>
              </div>
            ) : isLoading ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6" role="status" aria-label="Loading search results">
                {Array.from({ length: 10 }, (_, index) => <div key={index} className="aspect-[2/3] animate-pulse rounded-2xl bg-zinc-900 motion-reduce:animate-none" />)}
              </div>
            ) : visibleResults.length ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {visibleResults.map((item) => item.media_type === "person"
                  ? <PersonResultCard key={`person-${item.id}`} person={item} />
                  : <MediaCard key={`${item.media_type}-${item.id}`} item={item} layout="grid" showMediaTypeBadge />)}
              </div>
            ) : data ? (
              <div className="rounded-2xl border border-white/[0.08] bg-[#111] px-5 py-12 text-center">
                <p className="font-semibold text-white">No {filter === "all" ? "results" : FILTERS.find(([value]) => value === filter)?.[1].toLowerCase()} on this page.</p>
                <p className="mt-2 text-sm text-zinc-500">Try another filter or search term.</p>
              </div>
            ) : null}

            {data && totalPages > 1 && <nav aria-label="Search result pages" className="mt-8 flex items-center justify-center gap-4">
              <button type="button" onClick={() => changePage(page - 1)} disabled={page <= 1} className="rounded-full border border-white/10 px-4 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-orange-500/50 disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
              <span className="text-xs text-zinc-500">Page {page} of {totalPages}</span>
              <button type="button" onClick={() => changePage(page + 1)} disabled={page >= totalPages} className="rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-2.5 text-sm font-semibold text-orange-200 transition hover:bg-orange-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40">Next</button>
            </nav>}
          </>
        )}
      </div>
    </main>
  );
};

export default SearchPage;
