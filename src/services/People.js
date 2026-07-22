import { fetchData } from "./api";

export const getPeople = async () => {
  const data = await fetchData("/person/popular?language=en-US&page=1");
  return data.results;
};

export const getPeopleDetails = async (personId) => {
  const data = await fetchData(`/person/${personId}?language=en-US`);
  console.log(data);
  return data;
};
