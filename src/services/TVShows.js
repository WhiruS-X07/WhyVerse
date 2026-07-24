import { fetchData } from "./api";

export const getTVShows = async (category, page = 1) => {
  return await fetchData(`/tv/${category}?language=en-US&page=${page}`);
};

export const getDiscoverTV = async (page = 1) => {
  return await fetchData(
    `/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`,
  );
};
