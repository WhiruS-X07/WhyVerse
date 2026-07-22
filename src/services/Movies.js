import { fetchData } from "./api";

export const getPopularMovies = async () => {
  const data = await fetchData("/movie/popular?language=en-US&page=1");
  return data.results;
};

export const getTopRatedMovies = async () => {
  const data = await fetchData("/movie/top_rated?language=en-US&page=1");
  return data.results;
};

export const getUpcomingMovies = async () => {
  const data = await fetchData("/movie/upcoming?language=en-US&page=1");
  return data.results;
};

export const getNowPlayingMovies = async () => {
  const data = await fetchData("/movie/now_playing?language=en-US&page=1");
  return data.results;
};

export const getDiscoverMovies = async () => {
  const data = await fetchData(
    "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"
  );

  return data.results;
};
