import { fetchData } from "./apiClient";

const MOVIE_DETAIL_APPEND = "videos,credits,images,recommendations,similar,external_ids,keywords,release_dates";
const TV_DETAIL_APPEND = "videos,credits,images,recommendations,similar,external_ids,keywords,content_ratings,aggregate_credits";

/* =========================
   Movie Details
========================= */

export const getMovieDetails = async (movieId) => {
  const data = await fetchData(
    `/movie/${movieId}?language=en-US&append_to_response=${MOVIE_DETAIL_APPEND}`
  );
  const collectionDetails = data.belongs_to_collection?.id
    ? await getMovieCollection(data.belongs_to_collection.id).catch(() => null)
    : null;
  return {
    ...data,
    collection_details: collectionDetails,
  };
};

/* =========================
   TV Show Details
========================= */

export const getTVDetails = async (tvShowId) => {
  const data = await fetchData(
    `/tv/${tvShowId}?language=en-US&append_to_response=${TV_DETAIL_APPEND}`
  );
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

  return data;
};

/* =========================
   TV Season Details
========================= */

export const getTVSeason = async (tvId, seasonNumber) => {
  const data = await fetchData(
    `/tv/${tvId}/season/${seasonNumber}?language=en-US`
  );

  return data;
};

/* =========================
   External IDs
========================= */

export const getMovieExternalIds = async (movieId) => {
  const data = await fetchData(
    `/movie/${movieId}/external_ids`
  );

  return data;
};

export const getTVExternalIds = async (tvShowId) => {
  const data = await fetchData(
    `/tv/${tvShowId}/external_ids`
  );

  return data;
};

