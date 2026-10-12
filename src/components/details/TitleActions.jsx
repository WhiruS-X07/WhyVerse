import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

import {
  getCollections,
  getWatchLater,
  SAVED_LISTS_EVENT,
  toggleTitleInCollection,
  toggleWatchLater,
} from "../../services/storage/savedLists";

const CollectionActions = ({ item }) => {
  const [collections, setCollections] = useState(getCollections);
  const [watchLater, setWatchLater] = useState(() => getWatchLater());
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 8 });
  const [feedback, setFeedback] = useState("");
  const collectionButtonRef = useRef(null);
  const menuRef = useRef(null);
  const mediaType = item.media_type || (item.title ? "movie" : "tv");

  useEffect(() => {
    const refresh = () => {
      setCollections(getCollections());
      setWatchLater(getWatchLater());
    };
    window.addEventListener(SAVED_LISTS_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(SAVED_LISTS_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnOutsideClick = (event) => {
      if (!menuRef.current?.contains(event.target) && !collectionButtonRef.current?.contains(event.target)) setMenuOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const closeOnScroll = () => setMenuOpen(false);
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    window.addEventListener("scroll", closeOnScroll);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("scroll", closeOnScroll);
    };
  }, [menuOpen]);

  const isInWatchLater = watchLater.some((saved) => saved.id === String(item.id) && saved.media_type === mediaType);
  const favorites = collections.find((collection) => collection.id === "favorites");
  const isFavorite = favorites?.items.some((saved) => saved.id === String(item.id) && saved.media_type === mediaType) ?? false;

  const handleFavorite = () => {
    const added = toggleTitleInCollection("favorites", { ...item, media_type: mediaType });
    setCollections(getCollections());
    setFeedback(added ? "Added to Favorites" : "Removed from Favorites");
  };

  const handleCollectionToggle = (collection) => {
    const added = toggleTitleInCollection(collection.id, { ...item, media_type: mediaType });
    setCollections(getCollections());
    setFeedback(added ? `Added to ${collection.name}` : `Removed from ${collection.name}`);
  };

  const handleWatchLater = () => {
    const added = toggleWatchLater({ ...item, media_type: mediaType });
    setWatchLater(getWatchLater());
    setFeedback(added ? "Added to Watch Later" : "Removed from Watch Later");
  };

  const toggleCollectionMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
      return;
    }
    const rect = collectionButtonRef.current?.getBoundingClientRect();
    if (rect) {
      const menuWidth = Math.min(304, window.innerWidth - 16);
      const openAbove = window.innerHeight - rect.bottom < 280;
      setMenuPosition({
        top: openAbove ? Math.max(8, rect.top - 352) : rect.bottom + 8,
        left: Math.max(8, Math.min(rect.left, window.innerWidth - menuWidth - 8)),
      });
    }
    setFeedback("");
    setMenuOpen(true);
  };

  return (
    <>
    <div className="movie-scroll flex w-full flex-nowrap items-center gap-2.5 overflow-x-auto pb-1 sm:gap-3">
      <button type="button" onClick={handleFavorite} aria-pressed={isFavorite} className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-2xl border px-3 py-3 text-sm font-semibold backdrop-blur-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 sm:px-5 ${isFavorite ? "border-pink-400/60 bg-pink-500/15 text-pink-200" : "border-white/15 bg-zinc-950/70 text-white hover:border-pink-400/60 hover:bg-pink-500/10"}`}>
        <svg className={`h-5 w-5 ${isFavorite ? "fill-pink-400 text-pink-400" : "text-pink-300"}`} viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.8 8.7c0 5.5-8.8 11-8.8 11s-8.8-5.5-8.8-11A4.7 4.7 0 0 1 12 6a4.7 4.7 0 0 1 8.8 2.7Z" /></svg>
        {isFavorite ? "Favorited" : "Favorite"}
      </button>

      <button type="button" onClick={handleWatchLater} aria-pressed={isInWatchLater} className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-2xl border px-3 py-3 text-sm font-semibold backdrop-blur-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 sm:px-5 ${isInWatchLater ? "border-orange-500/60 bg-orange-500/15 text-orange-200" : "border-white/15 bg-zinc-950/70 text-white hover:border-orange-500 hover:bg-orange-500/15"}`}>
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
        {isInWatchLater ? "In Watch Later" : "Watch Later"}
      </button>

      <div>
        <button ref={collectionButtonRef} type="button" onClick={toggleCollectionMenu} aria-expanded={menuOpen} aria-haspopup="menu" className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-2xl border border-white/15 bg-zinc-950/70 px-3 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:border-orange-500 hover:bg-orange-500/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 sm:px-5">
          <svg className="h-5 w-5 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
          Add to Collection
        </button>
      </div>

    </div>
    {menuOpen && createPortal(
          <div ref={menuRef} role="menu" aria-label="Choose a collection" style={{ top: menuPosition.top, left: menuPosition.left, maxHeight: "calc(100dvh - 1rem)" }} className="fixed z-[9999] w-[min(19rem,calc(100vw-1rem))] overflow-y-auto rounded-2xl border border-white/10 bg-[#151515] p-2 shadow-2xl shadow-black/80">
            <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">Save this title to</p>
            <div className="max-h-56 overflow-y-auto">
              {collections.filter((collection) => !collection.isDefault).map((collection) => {
                const saved = collection.items.some((entry) => entry.id === String(item.id) && entry.media_type === mediaType);
                return (
                  <button key={collection.id} type="button" role="menuitemcheckbox" aria-checked={saved} onClick={() => handleCollectionToggle(collection)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-zinc-200 transition hover:bg-white/[0.06]">
                    <span className={`flex h-5 w-5 items-center justify-center rounded-md border ${saved ? "border-orange-400 bg-orange-500 text-white" : "border-zinc-600 text-transparent"}`}>
                      {saved && <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m5 12 4 4L19 6" /></svg>}
                    </span>
                    <span className="min-w-0 flex-1 truncate">{collection.name}</span>
                    <span className="text-[10px] text-zinc-600">{collection.items.length}</span>
                  </button>
                );
              })}
            </div>
            {!collections.some((collection) => !collection.isDefault) && <p className="px-3 py-3 text-xs text-zinc-500">Create a collection to organize this title your way.</p>}
            <Link to="/collection" onClick={() => setMenuOpen(false)} className="mt-1 flex items-center gap-2 rounded-xl border-t border-white/[0.08] px-3 py-3 text-xs font-semibold text-orange-300 transition hover:bg-white/[0.04] hover:text-orange-200">
              <span className="text-base leading-none">+</span> Create a collection
            </Link>
            {feedback && <p role="status" className="px-3 pb-2 text-xs text-emerald-300">{feedback}</p>}
          </div>
        , document.body)}
    </>
  );
};

export default CollectionActions;
