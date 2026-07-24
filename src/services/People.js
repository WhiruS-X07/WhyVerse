import { fetchData } from "./api";

export const getPeople = async (page = 1) => {
  return await fetchData(`/person/popular?language=en-US&page=${page}`);
};

export const getPeopleDetails = async (personId) => {
  return await fetchData(`/person/${personId}?language=en-US`);
};
