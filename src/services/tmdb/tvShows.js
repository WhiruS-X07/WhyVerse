import { fetchData } from "./apiClient";

export const getTVShows = async (category, page = 1) => {
  return await fetchData(`/tv/${category}?language=en-US&page=${page}`);
};

export const getDiscoverTV = async (page = 1) => {
  return await fetchData(
    `/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`,
  );
};

export const getUpcomingTV = async (page = 1) => {
  const today = new Date().toISOString().slice(0, 10);
  return fetchData(
    `/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&first_air_date.gte=${today}&sort_by=popularity.desc`,
  );
};

export const getNostalgicTV = async (page = 1) => {
  return fetchData(
    `/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&first_air_date.lte=2010-12-31&sort_by=popularity.desc&vote_count.gte=300`,
  );
};
