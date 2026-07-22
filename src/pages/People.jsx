import { useState, useEffect } from "react";
import { getPeople } from "../services/People";
import PeopleCard from "../components/PeopleCard";

const People = () => {
  const [popularPeople, setPopularPeople] = useState([]);

  useEffect(() => {
    const fetchPeople = async () => {
      setPopularPeople(await getPeople());
    };

    fetchPeople();
  }, []);

  return (
    <section className="mx-auto max-w-screen-2xl px-6 py-8">
      <PeopleCard title="Popular People" items={popularPeople} />
    </section>
  );
};

export default People;
