import { fetchData } from "./apiClient";

export const getTrending = async (mediaType, timeWindow = "week", page = 1) => {
  if (!["movie", "tv"].includes(mediaType)) {
    throw new Error("Trending media type must be movie or tv.");
  }

  if (!["day", "week"].includes(timeWindow)) {
    throw new Error("Trending time window must be day or week.");
  }

  return fetchData(`/trending/${mediaType}/${timeWindow}?language=en-US&page=${page}`);
};
