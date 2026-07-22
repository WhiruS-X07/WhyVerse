import { fetchData } from "./api";

export const getAiringTodayTV = async () => {
  const data = await fetchData("/tv/airing_today?language=en-US&page=1");
  console.log(data);
  return data.results;
};

export const getOnTheAirTV = async () => {
  const data = await fetchData("/tv/on_the_air?language=en-US&page=1");
  return data.results;
};

export const getPopularTV = async () => {
  const data = await fetchData("/tv/popular?language=en-US&page=1");
  return data.results;
};

export const getTopRatedTV = async () => {
  const data = await fetchData("/tv/top_rated?language=en-US&page=1");
  return data.results;
};

export const getDiscoverTV = async () => {
  const data = await fetchData("/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc");
  return data.results;
};