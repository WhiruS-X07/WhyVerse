import { fetchData } from "./apiClient";

export const getPeople = async (page = 1) => {
  return await fetchData(`/person/popular?language=en-US&page=${page}`);
};

export const getPeopleDetails = async (personId) => {
  return await fetchData(`/person/${personId}?language=en-US&append_to_response=combined_credits,external_ids,images`);
};
