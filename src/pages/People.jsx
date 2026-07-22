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
      {/* Page Header */}
      <div className="mb-10">
        <div className="flex items-start gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mt-1 h-8 w-8 text-orange-500"
          >
            <path d="M12 2 2 7l10 5 10-5-10-5Zm0 7.18L4.21 7 12 3.82 19.79 7 12 9.18ZM2 11l10 5 10-5v2l-10 5-10-5v-2Zm0 6 10 5 10-5v2l-10 5-10-5v-2Z" />
          </svg>

          <div>
            <h1 className="text-4xl font-bold text-white">Popular People</h1>

            <div className="mt-2 h-1 w-28 rounded-full bg-orange-500" />

            <p className="mt-3 text-zinc-400">
              Discover trending actors, actresses, directors, and creators.
            </p>
          </div>
        </div>
      </div>
      {/* People Grid */}
      <PeopleCard items={popularPeople} />
    </section>
  );
};

export default People;
