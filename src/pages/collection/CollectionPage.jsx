import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Card from "../../components/media/MediaCard";
import { getGenres, getTitlesByGenre } from "../../services/tmdb/genres";
import { createCollection, getCollections, getWatchLater, removeFromWatchLater, removeTitleFromCollection, SAVED_LISTS_EVENT } from "../../services/storage/savedLists";

const MAX_TITLES = 100;
const PAGE_SIZE = 20;
const makeCursor = () => ({ page: 1, offset: 0, cache: [], totalPages: 5 });
const makeCursors = () => ({ movie: makeCursor(), tv: makeCursor() });

const NAV_ITEMS = [
  { id: "genres", label: "Genres", icon: "grid" },
  { id: "collection", label: "My Collection", icon: "collection" },
  { id: "watch-later", label: "Watch Later", icon: "clock" },
];

const MERGED_GENRE_GROUPS = [
  { label: "Action & Adventure", movie: ["Action", "Adventure"], tv: ["Action & Adventure"] },
  { label: "Animation", movie: ["Animation"], tv: ["Animation"] },
  { label: "Comedy", movie: ["Comedy"], tv: ["Comedy"] },
  { label: "Crime", movie: ["Crime"], tv: ["Crime"] },
  { label: "Documentary", movie: ["Documentary"], tv: ["Documentary"] },
  { label: "Drama", movie: ["Drama"], tv: ["Drama"] },
  { label: "Family", movie: ["Family"], tv: ["Family"] },
  { label: "History", movie: ["History"], tv: ["History"] },
  { label: "Horror", movie: ["Horror"], tv: [] },
  { label: "Mystery", movie: ["Mystery"], tv: ["Mystery"] },
  { label: "Romance", movie: ["Romance"], tv: ["Romance"] },
  { label: "Sci-Fi & Fantasy", movie: ["Science Fiction", "Fantasy"], tv: ["Sci-Fi & Fantasy"] },
  { label: "Thriller", movie: ["Thriller"], tv: [] },
  { label: "War & Politics", movie: ["War"], tv: ["War & Politics"] },
  { label: "Western", movie: ["Western"], tv: ["Western"] },
];

const canonicalGenre = (name) => MERGED_GENRE_GROUPS.find((group) => [...group.movie, ...group.tv].includes(name))?.label ?? name;

const NavIcon = ({ name }) => {
  if (name === "clock") return <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>;
  if (name === "grid") return <><rect x="3.5" y="3.5" width="7" height="7" rx="1.25" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.25" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.25" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.25" /></>;
  return <><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H20v16H5.5A1.5 1.5 0 0 1 4 18.5z" /><path d="M4 18.5A1.5 1.5 0 0 1 5.5 17H20" /></>;
};

const readGenreBatch = async (type, genreIds, cursor, amount) => {
  if (!genreIds.length || amount <= 0) return { items: [], cursor };

  const nextCursor = { ...cursor, cache: [...cursor.cache] };
  const items = [];

  while (items.length < amount) {
    if (nextCursor.offset >= nextCursor.cache.length) {
      if (nextCursor.page > Math.min(nextCursor.totalPages, 5)) break;
      const data = await getTitlesByGenre(type, genreIds, nextCursor.page);
      nextCursor.cache = data.results ?? [];
      nextCursor.offset = 0;
      nextCursor.totalPages = Math.min(data.total_pages ?? 1, 5);
      if (!nextCursor.cache.length) {
        nextCursor.page = nextCursor.totalPages + 1;
        break;
      }
    }

    const batch = nextCursor.cache.slice(nextCursor.offset, nextCursor.offset + amount - items.length);
    items.push(...batch.map((item) => ({ ...item, media_type: type })));
    nextCursor.offset += batch.length;

    if (nextCursor.offset >= nextCursor.cache.length) {
      nextCursor.page += 1;
      nextCursor.offset = 0;
      nextCursor.cache = [];
    }
    if (!batch.length) break;
  }

  return { items, cursor: nextCursor };
};

const hasMoreInCursor = (cursor) => cursor.cache.length > cursor.offset || cursor.page <= Math.min(cursor.totalPages, 5);

const shuffleTitles = (items) => {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
};

const Collection = () => {
  const [activeSection, setActiveSection] = useState("collection");
  const [collections, setCollections] = useState(getCollections);
  const [watchLaterItems, setWatchLaterItems] = useState(getWatchLater);
  const [activeCollectionId, setActiveCollectionId] = useState("favorites");
  const [createOpen, setCreateOpen] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [collectionError, setCollectionError] = useState("");
  const [mediaType, setMediaType] = useState("all");
  const [genres, setGenres] = useState({ movie: [], tv: [] });
  const [genresLoading, setGenresLoading] = useState(false);
  const [genresError, setGenresError] = useState(false);
  const [genreRetry, setGenreRetry] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genreTitles, setGenreTitles] = useState([]);
  const [cursors, setCursors] = useState(makeCursors);
  const [titlesLoading, setTitlesLoading] = useState(false);
  const [titlesError, setTitlesError] = useState(false);
  const titleRequest = useRef(0);

  useEffect(() => {
    const refreshSavedLists = () => {
      setCollections(getCollections());
      setWatchLaterItems(getWatchLater());
    };
    window.addEventListener(SAVED_LISTS_EVENT, refreshSavedLists);
    window.addEventListener("storage", refreshSavedLists);
    return () => {
      window.removeEventListener(SAVED_LISTS_EVENT, refreshSavedLists);
      window.removeEventListener("storage", refreshSavedLists);
    };
  }, []);

  const submitCollection = (event) => {
    event.preventDefault();
    try {
      const collection = createCollection(collectionName);
      setCollections(getCollections());
      setActiveCollectionId(collection.id);
      setCollectionName("");
      setCollectionError("");
      setCreateOpen(false);
    } catch (error) {
      setCollectionError(error.message || "Could not create this collection.");
    }
  };

  useEffect(() => {
    if (activeSection !== "genres" || (genres.movie.length && genres.tv.length)) return;
    let active = true;

    Promise.allSettled([getGenres("movie"), getGenres("tv")]).then((results) => {
      if (!active) return;
      const movieGenres = results[0].status === "fulfilled" ? results[0].value.genres ?? [] : [];
      const tvGenres = results[1].status === "fulfilled" ? results[1].value.genres ?? [] : [];
      setGenres({ movie: movieGenres, tv: tvGenres });
      setGenresError(!movieGenres.length && !tvGenres.length);
      setGenresLoading(false);
    });

    return () => { active = false; };
  }, [activeSection, genreRetry, genres.movie.length, genres.tv.length]);

  const getGenreIds = (type, name, mode = mediaType) => {
    const mergedGroup = MERGED_GENRE_GROUPS.find((group) => group.label === name);
    const terms = mergedGroup && (mode === "all" || name === mergedGroup.label)
      ? mergedGroup[type]
      : [name];
    return terms.map((term) => genres[type].find((genre) => genre.name === term)?.id).filter(Boolean);
  };

  const loadGenre = async (name, type = mediaType) => {
    const requestId = titleRequest.current + 1;
    titleRequest.current = requestId;
    setSelectedGenre(name);
    setGenreTitles([]);
    setCursors(makeCursors());
    setTitlesLoading(true);
    setTitlesError(false);

    const sourceTypes = type === "all" ? ["movie", "tv"] : [type];
    const availableTypes = sourceTypes.filter((source) => getGenreIds(source, name, type).length);
    if (!availableTypes.length) {
      setTitlesLoading(false);
      return;
    }

    const amount = type === "all" && availableTypes.length === 2 ? PAGE_SIZE / 2 : PAGE_SIZE;
    const results = await Promise.allSettled(availableTypes.map((source) =>
      readGenreBatch(source, getGenreIds(source, name, type), makeCursor(), amount),
    ));
    if (titleRequest.current !== requestId) return;

    const nextCursors = makeCursors();
    const titles = [];
    let failures = 0;
    results.forEach((result, index) => {
      const source = availableTypes[index];
      if (result.status === "fulfilled") {
        titles.push(...result.value.items);
        nextCursors[source] = result.value.cursor;
      } else {
        failures += 1;
      }
    });
    setCursors(nextCursors);
    setGenreTitles(type === "all" ? shuffleTitles(titles) : titles);
    setTitlesError(failures === results.length && !titles.length);
    setTitlesLoading(false);
  };

  const loadMore = async () => {
    if (!selectedGenre || titlesLoading || genreTitles.length >= MAX_TITLES) return;
    const requestId = titleRequest.current + 1;
    titleRequest.current = requestId;
    setTitlesLoading(true);
    setTitlesError(false);

    const remaining = Math.min(PAGE_SIZE, MAX_TITLES - genreTitles.length);
    let batches;
    if (mediaType === "all") {
      const movieIds = getGenreIds("movie", selectedGenre, mediaType);
      const tvIds = getGenreIds("tv", selectedGenre, mediaType);
      const movieMore = movieIds.length > 0 && hasMoreInCursor(cursors.movie);
      const tvMore = tvIds.length > 0 && hasMoreInCursor(cursors.tv);
      let movieAmount = movieMore && tvMore ? Math.ceil(remaining / 2) : movieMore ? remaining : 0;
      let tvAmount = tvMore && movieMore ? remaining - movieAmount : tvMore ? remaining : 0;
      if (movieAmount + tvAmount < remaining) {
        if (movieMore) movieAmount = remaining - tvAmount;
        else if (tvMore) tvAmount = remaining - movieAmount;
      }
      const sources = [
        ...(movieAmount ? [{ type: "movie", ids: movieIds, amount: movieAmount }] : []),
        ...(tvAmount ? [{ type: "tv", ids: tvIds, amount: tvAmount }] : []),
      ];
      batches = await Promise.allSettled(sources.map((source) =>
        readGenreBatch(source.type, source.ids, cursors[source.type], source.amount),
      ));
      if (titleRequest.current !== requestId) return;
      const nextCursors = { ...cursors };
      const additions = [];
      let failed = 0;
      batches.forEach((result, index) => {
        if (result.status === "fulfilled") {
          nextCursors[sources[index].type] = result.value.cursor;
          additions.push(...result.value.items);
        } else failed += 1;
      });
      setCursors(nextCursors);
      setGenreTitles((current) => [...current, ...shuffleTitles(additions)].slice(0, MAX_TITLES));
      setTitlesError(failed === batches.length && batches.length > 0 && !genreTitles.length);
    } else {
      const genreIds = getGenreIds(mediaType, selectedGenre, mediaType);
      try {
        const result = await readGenreBatch(mediaType, genreIds, cursors[mediaType], remaining);
        if (titleRequest.current !== requestId) return;
        setCursors((current) => ({ ...current, [mediaType]: result.cursor }));
        setGenreTitles((current) => [...current, ...result.items].slice(0, MAX_TITLES));
      } catch {
        if (titleRequest.current === requestId) setTitlesError(!genreTitles.length);
      }
    }

    setTitlesLoading(false);
  };

  const clearGenre = () => {
    titleRequest.current += 1;
    setSelectedGenre(null);
    setGenreTitles([]);
    setCursors(makeCursors());
    setTitlesLoading(false);
    setTitlesError(false);
  };

  const chooseMediaType = (type) => {
    setMediaType(type);
    if (selectedGenre) loadGenre(canonicalGenre(selectedGenre), type);
  };

  const visibleGenres = mediaType === "all"
    ? [...new Set([...genres.movie, ...genres.tv].map((genre) => canonicalGenre(genre.name)))]
    : genres[mediaType].map((genre) => genre.name);
  const canLoadMore = selectedGenre && genreTitles.length < MAX_TITLES && (mediaType === "all"
    ? (getGenreIds("movie", selectedGenre, mediaType).length > 0 && hasMoreInCursor(cursors.movie)) || (getGenreIds("tv", selectedGenre, mediaType).length > 0 && hasMoreInCursor(cursors.tv))
    : hasMoreInCursor(cursors[mediaType]));

  return (
    <main className="min-h-[75vh] bg-[#080808] pb-10">
      <div className="mx-auto max-w-[1720px] px-4 py-7 sm:px-6 sm:py-10 lg:px-10">
        <header className="catalog-enter relative mb-6 overflow-hidden rounded-3xl border border-white/[0.08] bg-[radial-gradient(ellipse_at_85%_10%,rgba(239,93,18,0.17),transparent_42%),linear-gradient(120deg,#181411,#0d0d0d_68%)] px-5 py-7 sm:mb-8 sm:px-8 sm:py-9 lg:px-10">
          <div className="relative z-10 max-w-3xl">
            <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400 sm:text-xs">
              <span className="h-px w-7 bg-orange-500" /> Your collection
            </p>
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">Your personal screen room.</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">Keep your favorites close, line up your next watch, or find something new by genre.</p>
          </div>
          <div aria-hidden="true" className="absolute -right-12 -top-20 h-56 w-56 rounded-full border border-orange-500/10 sm:h-72 sm:w-72" />
          <div aria-hidden="true" className="absolute -right-1 -top-8 h-40 w-40 rounded-full border border-orange-500/[0.07] sm:h-52 sm:w-52" />
        </header>

        <div className="grid gap-5 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-8">
          <aside className="h-fit rounded-2xl border border-white/[0.08] bg-[#101010] p-2.5 md:sticky md:top-24 md:p-3" aria-label="Collection navigation">
            <p className="hidden px-3 pb-3 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-600 md:block">Your space</p>
            <nav className="movie-scroll flex gap-1 overflow-x-auto md:flex-col md:overflow-visible">
              {NAV_ITEMS.map((item) => {
                const active = activeSection === item.id;
                return (
                  <button key={item.id} type="button" onClick={() => { setActiveSection(item.id); clearGenre(); if (item.id === "genres" && !genres.movie.length && !genres.tv.length) { setGenresLoading(true); setGenresError(false); } }} aria-current={active ? "page" : undefined} className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition md:w-full ${active ? "bg-orange-500/10 text-orange-300" : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"}`}>
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><NavIcon name={item.icon} /></svg>
                    <span>{item.label}</span>
                    {active && <span className="ml-auto hidden h-1.5 w-1.5 rounded-full bg-orange-400 md:block" />}
                  </button>
                );
              })}
            </nav>
            <div className="mt-3 hidden rounded-xl border border-white/[0.06] bg-black/30 p-3 md:block">
              <p className="text-xs font-semibold text-zinc-300">Made for your next favorite</p>
              <p className="mt-1 text-[11px] leading-5 text-zinc-600">Browse by genre or explore what’s popular this week.</p>
            </div>
          </aside>

          <section className="min-w-0" aria-live="polite">
            {activeSection === "collection" ? (
              <div className="rounded-3xl border border-white/[0.08] bg-[#101010] p-4 sm:p-6 lg:p-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-400">Your saved titles</p><h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">My Collection</h2><p className="mt-2 text-sm text-zinc-500">Keep movies and series together in your own spaces.</p></div>
                  <button type="button" onClick={() => { setCollectionError(""); setCreateOpen(true); }} className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"><span className="text-xl leading-none">+</span> New collection</button>
                </div>

                <div className="movie-scroll mt-6 flex gap-3 overflow-x-auto pb-2" aria-label="Your collections">
                  {collections.map((collection) => {
                    const active = collection.id === activeCollectionId;
                    return <button key={collection.id} type="button" onClick={() => setActiveCollectionId(collection.id)} aria-pressed={active} className={`min-w-40 rounded-2xl border p-4 text-left transition sm:min-w-48 ${active ? "border-orange-500/60 bg-orange-500/[0.09]" : "border-white/[0.08] bg-black/25 hover:border-white/20"}`}><span className="flex items-center justify-between gap-3"><span className="truncate text-sm font-bold text-white">{collection.name}</span>{collection.isDefault && <span className="text-orange-400" aria-label="Default collection">★</span>}</span><span className="mt-2 block text-xs text-zinc-500">{collection.items.length} {collection.items.length === 1 ? "title" : "titles"}</span></button>;
                  })}
                </div>

                {(() => {
                  const selected = collections.find((collection) => collection.id === activeCollectionId) || collections[0];
                  return <div className="mt-7 border-t border-white/[0.08] pt-6">
                    <div className="mb-5 flex items-center justify-between gap-3"><h3 className="text-xl font-black text-white">{selected?.name || "Favorites"}</h3><span className="text-xs text-zinc-500">{selected?.items.length || 0} saved</span></div>
                    {selected?.items.length ? <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">{selected.items.map((item) => <div key={`${item.media_type}-${item.id}`} className="relative"><Card item={item} layout="grid" showMediaTypeBadge /><button type="button" aria-label={`Remove ${item.title || item.name} from ${selected.name}`} title="Remove from collection" onClick={() => { removeTitleFromCollection(selected.id, item); setCollections(getCollections()); }} className="absolute right-2 top-2 z-30 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/80 text-lg text-white transition hover:border-red-400 hover:bg-red-500">×</button></div>)}</div> : <div className="rounded-2xl border border-white/[0.07] bg-black/25 px-5 py-10 text-center"><p className="font-bold text-white">This collection is ready for your favorites.</p><p className="mt-2 text-sm text-zinc-500">Open a movie or series and choose Add to Collection.</p><Link to="/movies" className="mt-5 inline-flex rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-400">Explore movies</Link></div>}
                  </div>;
                })()}
              </div>
            ) : activeSection === "watch-later" ? (
              <div className="rounded-3xl border border-white/[0.08] bg-[#101010] p-4 sm:p-6 lg:p-8">
                <div className="mb-6"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-400">For another time</p><h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">Watch Later</h2><p className="mt-2 text-sm text-zinc-500">Titles you’ve saved for your next movie night.</p></div>
                {watchLaterItems.length ? <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">{watchLaterItems.map((item) => <div key={`${item.media_type}-${item.id}`} className="relative"><Card item={item} layout="grid" showMediaTypeBadge /><button type="button" aria-label={`Remove ${item.title || item.name} from Watch Later`} onClick={() => { removeFromWatchLater(item); setWatchLaterItems(getWatchLater()); }} className="absolute right-2 top-2 z-30 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/80 text-lg text-white transition hover:border-red-400 hover:bg-red-500">×</button></div>)}</div> : <div className="rounded-2xl border border-white/[0.07] bg-black/25 px-5 py-10 text-center"><p className="font-bold text-white">Your watch queue is empty.</p><p className="mt-2 text-sm text-zinc-500">Choose Watch Later on a title to save it here.</p><Link to="/movies" className="mt-5 inline-flex rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-400">Explore movies</Link></div>}
              </div>
            ) : (
              <div className="rounded-3xl border border-white/[0.08] bg-[#101010] p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-400">Find your kind of story</p><h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">Browse by genre</h2></div>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Choose media type">
                    {[["all", "All"], ["movie", "Movies"], ["tv", "TV Shows"]].map(([type, label]) => (
                      <button key={type} type="button" onClick={() => chooseMediaType(type)} aria-pressed={mediaType === type} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition sm:py-2.5 sm:text-sm ${mediaType === type ? "border-orange-500 bg-orange-500 text-white" : "border-white/10 bg-white/[0.035] text-zinc-300 hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-white"}`}>{label}</button>
                    ))}
                  </div>
                </div>

                {genresLoading ? (
                  <div className="flex min-h-40 items-center justify-center text-sm text-zinc-500"><span className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-orange-500 border-r-transparent" />Loading genres…</div>
                ) : genresError ? (
                  <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-8 text-center text-sm text-zinc-400">Genres are unavailable right now. <button type="button" onClick={() => { setGenresLoading(true); setGenresError(false); setGenreRetry((value) => value + 1); }} className="ml-1 font-bold text-orange-300 hover:text-orange-200">Try again</button></div>
                ) : (
                  <div className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-2.5">
                    {visibleGenres.map((genre) => (
                      <button key={genre} type="button" onClick={() => loadGenre(genre)} aria-pressed={selectedGenre === genre} className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition sm:px-4 sm:py-2.5 sm:text-sm ${selectedGenre === genre ? "border-orange-400 bg-orange-500 text-white" : "border-white/10 bg-white/[0.03] text-zinc-300 hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-white"}`}>{genre}</button>
                    ))}
                  </div>
                )}

                {selectedGenre && (
                  <div className="mt-8 border-t border-white/[0.08] pt-6 sm:mt-10 sm:pt-8">
                    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                      <div><h3 className="text-xl font-black text-white sm:text-2xl">{selectedGenre} <span className="text-orange-400">picks</span></h3></div>
                      <button type="button" onClick={clearGenre} className="text-xs font-semibold text-zinc-500 transition hover:text-white">Clear genre</button>
                    </div>
                    {titlesLoading && !genreTitles.length ? (
                      <div className="flex min-h-32 items-center justify-center text-sm text-zinc-500"><span className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-orange-500 border-r-transparent" />Finding titles…</div>
                    ) : titlesError ? (
                      <p className="rounded-xl border border-white/10 bg-black/30 px-4 py-8 text-center text-sm text-zinc-400">Couldn’t load titles for this genre. Choose it again to retry.</p>
                    ) : genreTitles.length ? (
                      <>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                          {genreTitles.map((item) => <Card key={`${item.media_type}-${item.id}`} item={item} layout="grid" showMediaTypeBadge />)}
                        </div>
                        {titlesLoading && <p role="status" className="mt-5 text-center text-xs text-zinc-500">Loading more titles…</p>}
                        {canLoadMore && <div className="mt-7 flex justify-center"><button type="button" onClick={loadMore} disabled={titlesLoading} className="inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-6 py-3 text-sm font-bold text-orange-200 transition hover:border-orange-400 hover:bg-orange-500 hover:text-white disabled:cursor-wait disabled:opacity-60">{titlesLoading ? "Loading…" : "Load more"}<span aria-hidden="true">↓</span></button></div>}
                        {!canLoadMore && genreTitles.length > 0 && <p className="mt-7 text-center text-xs text-zinc-600">You’ve reached the end of this collection.</p>}
                      </>
                    ) : (
                      <p className="rounded-xl border border-white/10 bg-black/30 px-4 py-8 text-center text-sm text-zinc-400">No titles found for this genre right now.</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
      {createOpen && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) setCreateOpen(false); }}>
        <div role="dialog" aria-modal="true" aria-labelledby="create-collection-title" className="w-full max-w-md rounded-3xl border border-white/10 bg-[#151515] p-5 shadow-2xl shadow-black/70 sm:p-7">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-400">Make it yours</p><h2 id="create-collection-title" className="mt-2 text-2xl font-black text-white">New collection</h2><p className="mt-2 text-sm leading-6 text-zinc-400">Give this collection a name, then save movies and series to it.</p>
          <form onSubmit={submitCollection} className="mt-5"><label htmlFor="collection-name" className="mb-2 block text-xs font-semibold text-zinc-300">Collection name</label><input id="collection-name" autoFocus maxLength={40} value={collectionName} onChange={(event) => setCollectionName(event.target.value)} placeholder="e.g. Friday night picks" className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-500" />{collectionError && <p role="alert" className="mt-2 text-xs text-red-300">{collectionError}</p>}<div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setCreateOpen(false)} className="rounded-full border border-white/10 px-4 py-2.5 text-sm font-semibold text-zinc-300 transition hover:bg-white/[0.06]">Cancel</button><button type="submit" className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-400">Create collection</button></div></form>
        </div>
      </div>}
    </main>
  );
};

export default Collection;
