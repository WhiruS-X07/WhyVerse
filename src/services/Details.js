import { fetchData } from "./api";

/* =========================
   Movie Details
========================= */

export const getMovieDetails = async (movieId) => {
  const data = await fetchData(
    `/movie/${movieId}?language=en-US&append_to_response=videos,credits,recommendations,similar`
  );

  console.log(data);
  return data;
};

/* =========================
   TV Show Details
========================= */

export const getTVDetails = async (tvShowId) => {
  const data = await fetchData(
    `/tv/${tvShowId}?language=en-US&append_to_response=videos,credits,recommendations,similar`
  );

  console.log(data);
  return data;
};

/* =========================
   Movie Collection
   (Harry Potter, MCU, etc.)
========================= */

export const getMovieCollection = async (collectionId) => {
  const data = await fetchData(
    `/collection/${collectionId}?language=en-US`
  );

  console.log(data);
  return data;
};

/* =========================
   TV Season Details
========================= */

export const getTVSeason = async (tvId, seasonNumber) => {
  const data = await fetchData(
    `/tv/${tvId}/season/${seasonNumber}?language=en-US`
  );

  console.log(data);
  return data;
};

/* =========================
   Watch Providers
========================= */

export const getMovieWatchProviders = async (movieId) => {
  const data = await fetchData(
    `/movie/${movieId}/watch/providers`
  );

  console.log(data);
  return data;
};

export const getTVWatchProviders = async (tvShowId) => {
  const data = await fetchData(
    `/tv/${tvShowId}/watch/providers`
  );

  console.log(data);
  return data;
};

/* =========================
   Images
========================= */

export const getMovieImages = async (movieId) => {
  const data = await fetchData(
    `/movie/${movieId}/images`
  );

  console.log(data);
  return data;
};

export const getTVImages = async (tvShowId) => {
  const data = await fetchData(
    `/tv/${tvShowId}/images`
  );

  console.log(data);
  return data;
};

/* =========================
   Keywords
========================= */

export const getMovieKeywords = async (movieId) => {
  const data = await fetchData(
    `/movie/${movieId}/keywords`
  );

  console.log(data);
  return data;
};

export const getTVKeywords = async (tvShowId) => {
  const data = await fetchData(
    `/tv/${tvShowId}/keywords`
  );

  console.log(data);
  return data;
};

/* =========================
   Reviews
========================= */

export const getMovieReviews = async (movieId) => {
  const data = await fetchData(
    `/movie/${movieId}/reviews`
  );

  console.log(data);
  return data;
};

export const getTVReviews = async (tvShowId) => {
  const data = await fetchData(
    `/tv/${tvShowId}/reviews`
  );

  console.log(data);
  return data;
};

/* =========================
   External IDs
========================= */

export const getMovieExternalIds = async (movieId) => {
  const data = await fetchData(
    `/movie/${movieId}/external_ids`
  );

  console.log(data);
  return data;
};

export const getTVExternalIds = async (tvShowId) => {
  const data = await fetchData(
    `/tv/${tvShowId}/external_ids`
  );

  console.log(data);
  return data;
};

/* =========================
   Movie Release Dates
========================= */

export const getMovieReleaseDates = async (movieId) => {
  const data = await fetchData(
    `/movie/${movieId}/release_dates`
  );

  console.log(data);
  return data;
};

/* =========================
   TV Content Ratings
========================= */

export const getTVContentRatings = async (tvShowId) => {
  const data = await fetchData(
    `/tv/${tvShowId}/content_ratings`
  );

  console.log(data);
  return data;
};