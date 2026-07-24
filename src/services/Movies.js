import { fetchData } from "./api";

export const getMovies = async (category, page = 1) => {
  return await fetchData(`/movie/${category}?language=en-US&page=${page}`);
};

export const getDiscoverMovies = async (page = 1) => {
  return await fetchData(
    `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`
  );
};