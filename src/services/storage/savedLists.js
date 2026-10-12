const COLLECTIONS_KEY = "whyverse:collections:v1";
const WATCH_LATER_KEY = "whyverse:watch-later:v1";
export const SAVED_LISTS_EVENT = "whyverse:saved-lists-updated";
const FAVORITES = { id: "favorites", name: "Favorites", items: [], isDefault: true };

const notify = () => window.dispatchEvent(new Event(SAVED_LISTS_EVENT));
const safeRead = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const normalizeTitle = (item) => ({
  id: String(item.id),
  media_type: item.media_type || (item.title ? "movie" : "tv"),
  title: item.title || undefined,
  name: item.name || undefined,
  poster_path: item.poster_path || null,
  backdrop_path: item.backdrop_path || null,
  vote_average: Number(item.vote_average) || 0,
  overview: item.overview || "",
  release_date: item.release_date || "",
  first_air_date: item.first_air_date || "",
});

const persistCollections = (collections) => {
  try {
    localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections));
    notify();
  } catch {
    // Leave the current UI state usable if browser storage is unavailable.
  }
};

export const getCollections = () => {
  const stored = safeRead(COLLECTIONS_KEY, []);
  const collections = Array.isArray(stored) ? stored : [];
  const favorites = collections.find((collection) => collection.id === FAVORITES.id);

  if (!favorites) {
    const initialized = [{ ...FAVORITES }, ...collections];
    persistCollections(initialized);
    return initialized;
  }

  return collections.map((collection) => ({
    ...collection,
    items: Array.isArray(collection.items) ? collection.items : [],
    isDefault: collection.id === FAVORITES.id,
  }));
};

export const createCollection = (name) => {
  const cleanName = name.trim();
  if (!cleanName) throw new Error("Enter a collection name.");

  const collection = {
    id: globalThis.crypto?.randomUUID?.() || `collection-${Date.now()}`,
    name: cleanName,
    items: [],
    isDefault: false,
  };
  persistCollections([...getCollections(), collection]);
  return collection;
};

export const toggleTitleInCollection = (collectionId, item) => {
  const title = normalizeTitle(item);
  let added = false;
  const next = getCollections().map((collection) => {
    if (collection.id !== collectionId) return collection;
    const exists = collection.items.some((saved) => saved.id === title.id && saved.media_type === title.media_type);
    added = !exists;
    return {
      ...collection,
      items: exists
        ? collection.items.filter((saved) => saved.id !== title.id || saved.media_type !== title.media_type)
        : [title, ...collection.items],
    };
  });
  persistCollections(next);
  return added;
};

export const getWatchLater = () => {
  const stored = safeRead(WATCH_LATER_KEY, []);
  return Array.isArray(stored) ? stored : [];
};

export const toggleWatchLater = (item) => {
  const title = normalizeTitle(item);
  const current = getWatchLater();
  const exists = current.some((saved) => saved.id === title.id && saved.media_type === title.media_type);
  const next = exists
    ? current.filter((saved) => saved.id !== title.id || saved.media_type !== title.media_type)
    : [title, ...current];

  try {
    localStorage.setItem(WATCH_LATER_KEY, JSON.stringify(next));
    notify();
  } catch {
    // Leave the current UI state usable if browser storage is unavailable.
  }
  return !exists;
};

export const removeTitleFromCollection = (collectionId, item) => {
  const id = String(item.id);
  const type = item.media_type || (item.title ? "movie" : "tv");
  const next = getCollections().map((collection) => collection.id === collectionId
    ? { ...collection, items: collection.items.filter((saved) => saved.id !== id || saved.media_type !== type) }
    : collection);
  persistCollections(next);
};

export const removeFromWatchLater = (item) => {
  const id = String(item.id);
  const type = item.media_type || (item.title ? "movie" : "tv");
  const next = getWatchLater().filter((saved) => saved.id !== id || saved.media_type !== type);
  try {
    localStorage.setItem(WATCH_LATER_KEY, JSON.stringify(next));
    notify();
  } catch {
    // Leave the current UI state usable if browser storage is unavailable.
  }
};
