import { fetchData } from "./apiClient";

const normalize = (value) => (value || "")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLocaleLowerCase()
  .replace(/[^a-z0-9]+/g, " ")
  .trim();

const getMatchRank = (item, query) => {
  const normalized = normalize(query);
  const title = normalize(item.title || item.name || "");

  if (title === normalized) return 3;
  if (title.startsWith(normalized)) return 2;
  if (title.includes(normalized)) return 1;
  return 0;
};

const editDistance = (left, right) => {
  const row = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let i = 1; i <= left.length; i += 1) {
    let diagonal = row[0];
    row[0] = i;
    for (let j = 1; j <= right.length; j += 1) {
      const above = row[j];
      row[j] = Math.min(
        row[j] + 1,
        row[j - 1] + 1,
        diagonal + (left[i - 1] === right[j - 1] ? 0 : 1),
      );
      diagonal = above;
    }
  }
  return row[right.length];
};

const getTitleTokens = (item) => normalize([
  item.title,
  item.name,
  item.original_title,
  item.original_name,
].filter(Boolean).join(" ")).split(" ").filter((token) => token.length > 1);

const getFuzzyDistance = (item, query) => {
  const queryTokens = normalize(query).split(" ").filter((token) => token.length > 1);
  const titleTokens = getTitleTokens(item);
  if (!queryTokens.length || !titleTokens.length) return Infinity;

  const distances = queryTokens.map((token) => Math.min(
    ...titleTokens.map((titleToken) => editDistance(token, titleToken)),
  ));
  // Allow a couple of edits in longer words. This covers common typos such as
  // "avengors" / "avengor" while keeping short searches precise.
  const withinTypoRange = distances.every((distance, index) => {
    const length = queryTokens[index].length;
    const maxDistance = length >= 6 ? 2 : 1;
    return distance <= maxDistance;
  });
  return withinTypoRange ? distances.reduce((sum, distance) => sum + distance, 0) : Infinity;
};

const fetchSearchPage = (query, page, signal) => {
  const params = new URLSearchParams({
    query: query.trim(),
    include_adult: "false",
    language: "en-US",
    page: String(page),
  });
  return fetchData(`/search/multi?${params.toString()}`, { signal });
};

const getFallbackQueries = (query) => {
  const words = normalize(query).split(" ").filter(Boolean);
  const firstWord = words[0] || "";
  const fallbacks = [];
  const add = (value) => {
    const candidate = value.trim();
    if (candidate.length >= 2 && normalize(candidate) !== normalize(query) && !fallbacks.includes(candidate)) {
      fallbacks.push(candidate);
    }
  };

  // A short leading fragment gives TMDB a chance to return candidates even
  // when the typo is later in the word (for example, "avengors" -> "aven").
  if (firstWord.length >= 4) add(firstWord.slice(0, 4));
  if (firstWord.length >= 3) add(firstWord.slice(0, 3));
  return fallbacks;
};

export const searchTitlesAndPeople = async (query, page = 1, signal) => {
  const data = await fetchSearchPage(query, page, signal);
  const results = [...(data.results ?? [])];

  const alreadyHasCloseMatch = results.some((item) => Number.isFinite(getFuzzyDistance(item, query)));
  if ((results.length && alreadyHasCloseMatch)
    || normalize(query).replace(/ /g, "").length < 4
    || signal?.aborted) {
    return {
      ...data,
      results: results.sort((a, b) => getMatchRank(b, query) - getMatchRank(a, query)
        || (b.popularity ?? 0) - (a.popularity ?? 0)),
      used_fuzzy_match: false,
    };
  }

  const fallbackQueries = getFallbackQueries(query);
  const fallbackPages = await Promise.all(fallbackQueries.map((candidate) =>
    fetchSearchPage(candidate, 1, signal).catch(() => null),
  ));
  if (signal?.aborted) return { ...data, results: [], used_fuzzy_match: false };

  const unique = new Map();
  fallbackPages.forEach((fallback) => {
    (fallback?.results ?? []).forEach((item) => {
      const distance = getFuzzyDistance(item, query);
      if (Number.isFinite(distance)) {
        const key = `${item.media_type}-${item.id}`;
        const previous = unique.get(key);
        if (!previous || distance < previous.fuzzy_distance) {
          unique.set(key, { ...item, fuzzy_distance: distance });
        }
      }
    });
  });

  const closeMatches = [...unique.values()].sort((a, b) =>
    a.fuzzy_distance - b.fuzzy_distance || (b.popularity ?? 0) - (a.popularity ?? 0));
  const matchedResults = closeMatches.length ? closeMatches : results;

  return {
    ...data,
    total_results: matchedResults.length,
    total_pages: matchedResults.length ? 1 : data.total_pages,
    results: closeMatches.length
      ? closeMatches.map((item) => {
        const result = { ...item };
        delete result.fuzzy_distance;
        return result;
      })
      : results.sort((a, b) => getMatchRank(b, query) - getMatchRank(a, query)
        || (b.popularity ?? 0) - (a.popularity ?? 0)),
    used_fuzzy_match: closeMatches.length > 0,
  };
};
