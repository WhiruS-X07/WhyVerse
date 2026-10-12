import { fetchData } from "./apiClient";

const getMediaPath = (type) => {
  if (type !== "movie" && type !== "tv") {
    throw new Error("Genre media type must be movie or tv.");
  }

  return type;
};

export const getGenres = async (type) => {
  const mediaType = getMediaPath(type);
  return fetchData(`/genre/${mediaType}/list?language=en-US`);
};

export const getTitlesByGenre = async (type, genreId, page = 1) => {
  const mediaType = getMediaPath(type);
  const genreIds = Array.isArray(genreId) ? genreId : [genreId];
  const genreFilter = genreIds.filter(Boolean).join("|");
  return fetchData(
    `/discover/${mediaType}?include_adult=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${encodeURIComponent(genreFilter)}`,
  );
};
