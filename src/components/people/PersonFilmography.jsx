import { useMemo, useState } from "react";

import Card from "../media/MediaCard";
import { SectionHeading } from "../details/DetailUI";

const PAGE_SIZE = 20;

const sortByPopularity = (a, b) => (b.vote_count || 0) - (a.vote_count || 0) || (b.popularity || 0) - (a.popularity || 0);
const creditDate = (item) => item.release_date || item.first_air_date || "";

const PersonFilmography = ({ person }) => {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("popular");
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const credits = person.combined_credits ?? {};

  const normalized = useMemo(() => {
    const cast = credits.cast ?? [];
    const crew = credits.crew ?? [];
    const unique = new Map();
    [...cast.map((item) => ({ ...item, credit_kind: "cast" })), ...crew.map((item) => ({ ...item, credit_kind: "crew" }))].forEach((item) => {
      const mediaType = item.media_type || (item.title ? "movie" : "tv");
      const key = `${mediaType}-${item.id}`;
      const existing = unique.get(key);
      if (!existing) unique.set(key, { ...item, media_type: mediaType, credit_kinds: [item.credit_kind] });
      else {
        existing.credit_kinds = [...new Set([...existing.credit_kinds, item.credit_kind])];
        if (!existing.character && item.character) existing.character = item.character;
        if (!existing.job && item.job) existing.job = item.job;
      }
    });
    return [...unique.values()];
  }, [credits.cast, credits.crew]);

  const knownFor = [...normalized].sort(sortByPopularity).slice(0, 5);
  const filtered = normalized.filter((item) => {
    const title = item.title || item.name || "";
    const matchesSearch = title.toLowerCase().includes(search.trim().toLowerCase());
    const matchesFilter = filter === "all"
      || (filter === "movies" && item.media_type === "movie")
      || (filter === "tv" && item.media_type === "tv")
      || (filter === "acting" && item.credit_kinds.includes("cast"))
      || (filter === "crew" && item.credit_kinds.includes("crew"));
    return matchesSearch && matchesFilter;
  }).sort((a, b) => sort === "newest" ? creditDate(b).localeCompare(creditDate(a)) || sortByPopularity(a, b) : sortByPopularity(a, b));

  const filters = [
    ["all", "All"],
    ["movies", "Movies"],
    ["tv", "TV Shows"],
    ["acting", "Acting"],
    ["crew", "Crew"],
  ];

  return (
    <div className="mt-14 min-w-0 space-y-14 sm:mt-20 sm:space-y-20">
      {!!knownFor.length && (
        <section className="min-w-0">
          <SectionHeading><span className="text-white">Known</span>{" "}<span className="text-orange-500">For</span></SectionHeading>
          <div className="movie-scroll flex min-w-0 gap-4 overflow-x-auto px-1 pb-5 sm:gap-5">{knownFor.map((item) => <Card key={`known-${item.media_type}-${item.id}`} item={item} />)}</div>
        </section>
      )}

      <section className="min-w-0">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-400">The body of work</p><h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">Filmography</h2><p className="mt-1 text-sm text-zinc-500">{normalized.length} credited titles</p></div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <label className="sr-only" htmlFor="person-credit-search">Search filmography</label>
            <input id="person-credit-search" type="search" value={search} onChange={(event) => { setSearch(event.target.value); setLimit(PAGE_SIZE); }} placeholder="Search credits" className="min-w-0 rounded-full border border-white/10 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-orange-500 sm:w-56" />
            <label className="sr-only" htmlFor="person-credit-sort">Sort filmography</label>
            <select id="person-credit-sort" value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-full border border-white/10 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-200 outline-none focus:border-orange-500"><option value="popular">Most popular</option><option value="newest">Newest first</option></select>
          </div>
        </div>

        <div className="movie-scroll mt-5 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter filmography">
          {filters.map(([value, label]) => <button key={value} type="button" onClick={() => { setFilter(value); setLimit(PAGE_SIZE); }} aria-pressed={filter === value} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition ${filter === value ? "border-orange-500 bg-orange-500 text-white" : "border-white/10 bg-white/[0.03] text-zinc-300 hover:border-orange-500/50 hover:text-white"}`}>{label}</button>)}
        </div>

        {filtered.length ? (
          <>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {filtered.slice(0, limit).map((item) => (
                <div key={`${item.media_type}-${item.id}`} className="min-w-0">
                  <Card item={item} layout="grid" showMediaTypeBadge />
                  <p className="mt-2 truncate px-1 text-xs text-zinc-500">{item.character || item.job || item.credit_kinds.map((kind) => kind === "cast" ? "Cast" : "Crew").join(" · ")}</p>
                </div>
              ))}
            </div>
            {filtered.length > limit && <div className="mt-8 flex justify-center"><button type="button" onClick={() => setLimit((value) => value + PAGE_SIZE)} className="rounded-full border border-orange-500/40 bg-orange-500/10 px-6 py-3 text-sm font-bold text-orange-200 transition hover:bg-orange-500 hover:text-white">Load more</button></div>}
          </>
        ) : (
          <div className="mt-6 rounded-2xl border border-white/[0.08] bg-zinc-900/60 px-5 py-12 text-center"><p className="font-semibold text-white">No credits match this view.</p><p className="mt-2 text-sm text-zinc-500">Try another filter or search term.</p></div>
        )}
      </section>
    </div>
  );
};

export default PersonFilmography;
