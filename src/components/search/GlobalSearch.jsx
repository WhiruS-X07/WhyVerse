import { useEffect, useId, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { searchTitlesAndPeople } from "../../services/tmdb/search";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w92";
const RESULT_TYPES = { movie: "Movie", tv: "TV show", person: "Person" };

const getResultRoute = (item) => item.media_type === "person"
  ? `/person/${item.id}`
  : item.media_type === "movie" || item.media_type === "tv"
    ? `/details/${item.media_type}/${item.id}`
    : null;

const getResultTitle = (item) => item.title || item.name || "Untitled";
const getResultYear = (item) => (item.release_date || item.first_air_date || "").slice(0, 4);

const GlobalSearch = ({ mobile = false, onNavigate }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle");
  const [isOpen, setIsOpen] = useState(false);
  const [usedFuzzyMatch, setUsedFuzzyMatch] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const resultsId = useId();
  const normalizedQuery = query.trim();

  useEffect(() => {
    if (normalizedQuery.length < 2) return undefined;

    const controller = new AbortController();

    const timeout = window.setTimeout(async () => {
      try {
        const data = await searchTitlesAndPeople(normalizedQuery, 1, controller.signal);
        if (!controller.signal.aborted) {
          setResults((data.results ?? []).filter((item) => getResultRoute(item)).slice(0, 8));
          setUsedFuzzyMatch(Boolean(data.used_fuzzy_match));
          setStatus("ready");
        }
      } catch {
        if (!controller.signal.aborted) {
          setResults([]);
          setUsedFuzzyMatch(false);
          setStatus("error");
        }
      }
    }, 280);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [normalizedQuery]);

  useEffect(() => {
    const closeOnOutsidePointer = (event) => {
      if (!containerRef.current?.contains(event.target)) setIsOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const handleQueryChange = (value) => {
    setQuery(value);
    if (value.trim().length < 2) {
      setResults([]);
      setUsedFuzzyMatch(false);
      setStatus("idle");
      setIsOpen(false);
    } else {
      setResults([]);
      setUsedFuzzyMatch(false);
      setStatus("loading");
      setIsOpen(true);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && normalizedQuery.length >= 2) {
      event.preventDefault();
      navigate(`/search?q=${encodeURIComponent(normalizedQuery)}`);
      setQuery("");
      setResults([]);
      setIsOpen(false);
      onNavigate?.();
    }
    if (event.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={containerRef} className={`relative ${mobile ? "w-full" : "w-56 2xl:w-64"}`}>
      <svg className={`pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500 transition-colors ${isOpen ? "text-orange-400" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        ref={inputRef}
        type="text"
        inputMode="search"
        enterKeyHint="search"
        value={query}
        onChange={(event) => handleQueryChange(event.target.value)}
        onFocus={() => { if (normalizedQuery.length >= 2) setIsOpen(true); }}
        onKeyDown={handleKeyDown}
        placeholder={mobile ? "Search movies, shows, people…" : "Search movies, shows, people"}
        aria-label="Search movies, TV shows, and people"
        aria-autocomplete="list"
        aria-controls={resultsId}
        aria-expanded={isOpen}
        className={`w-full rounded-xl border border-white/10 bg-white/[0.05] py-3 pl-12 pr-10 text-sm text-white placeholder:text-zinc-500 outline-none backdrop-blur-xl transition focus:border-orange-500 focus:bg-white/[0.08] focus:ring-2 focus:ring-orange-500/15 ${mobile ? "" : "rounded-2xl"}`}
      />
      {query && <button type="button" onClick={() => { handleQueryChange(""); inputRef.current?.focus(); }} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-500 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
      </button>}

      {isOpen && normalizedQuery.length >= 2 && <div className={`absolute left-0 z-[70] mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-2xl shadow-black/70 ${mobile ? "top-full w-full" : "top-full w-[min(24rem,calc(100vw-2rem))]"}`}>
        <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-[.18em] text-zinc-500">{usedFuzzyMatch ? "Close matches" : "Search results"}</p>
          {status === "loading" && <span className="h-4 w-4 animate-spin rounded-full border-2 border-orange-500 border-r-transparent" role="status" aria-label="Searching" />}
        </div>
        <ul id={resultsId} role="listbox" aria-label="Search results" className="max-h-[min(65vh,26rem)] overflow-y-auto p-2">
          {status === "loading" && !results.length && <li className="px-3 py-5 text-center text-sm text-zinc-400">Searching…</li>}
          {status === "error" && <li className="px-3 py-5 text-center text-sm text-zinc-400">Search is unavailable. Check your connection and try again.</li>}
          {status === "ready" && !results.length && <li className="px-3 py-5 text-center text-sm text-zinc-400">No movies, shows, or people found.</li>}
          {results.map((item) => {
            const title = getResultTitle(item);
            const imagePath = item.media_type === "person" ? item.profile_path : item.poster_path;
            const detail = item.media_type === "person"
              ? item.known_for_department || "Person"
              : [getResultYear(item), item.vote_average > 0 ? `★ ${item.vote_average.toFixed(1)}` : null].filter(Boolean).join(" · ") || RESULT_TYPES[item.media_type];

            return <li key={`${item.media_type}-${item.id}`} role="option" aria-selected="false">
              <Link to={getResultRoute(item)} onClick={() => { setQuery(""); setResults([]); setIsOpen(false); onNavigate?.(); }} className="flex min-w-0 items-center gap-3 rounded-xl px-2.5 py-2 transition hover:bg-white/[0.06] focus-visible:bg-white/[0.06] focus-visible:outline-none">
                {imagePath ? <img src={`${IMAGE_BASE_URL}${imagePath}`} alt="" className="h-12 w-9 shrink-0 rounded-md bg-zinc-900 object-cover" loading="lazy" onError={(event) => { event.currentTarget.style.display = "none"; }} /> : <span className="grid h-12 w-9 shrink-0 place-items-center rounded-md bg-zinc-900 text-[10px] font-bold uppercase text-orange-400">{item.media_type === "person" ? "P" : "W"}</span>}
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-white">{title}</span>
                  <span className="mt-1 block truncate text-xs text-zinc-500">{detail}</span>
                </span>
                <span className="shrink-0 rounded-full border border-orange-500/20 bg-orange-500/[0.07] px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-orange-300">{RESULT_TYPES[item.media_type]}</span>
              </Link>
            </li>;
          })}
        </ul>
        <Link to={`/search?q=${encodeURIComponent(normalizedQuery)}`} onClick={() => { setQuery(""); setResults([]); setIsOpen(false); onNavigate?.(); }} className="flex items-center justify-between border-t border-white/[0.07] px-4 py-3 text-xs font-semibold text-orange-300 transition hover:bg-white/[0.04] hover:text-orange-200">
          <span>See all results for “{normalizedQuery}”</span>
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </Link>
      </div>}
    </div>
  );
};

export default GlobalSearch;
