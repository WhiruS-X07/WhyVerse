import { fetchData } from "./apiClient";

export const getMovies = async (category, page = 1) => {
  return await fetchData(`/movie/${category}?language=en-US&page=${page}`);
};

export const getDiscoverMovies = async (page = 1) => {
  return await fetchData(
    `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`
  );
};

export const getNostalgicMovies = async (page = 1) => {
  return fetchData(
    `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&primary_release_date.lte=2005-12-31&sort_by=popularity.desc&vote_count.gte=500`,
  );
};
