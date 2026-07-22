import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPeopleDetails } from "../services/People";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const PeopleDetails = () => {
  const { id } = useParams();

  const [person, setPerson] = useState(null);
  const [showBio, setShowBio] = useState(false);

  useEffect(() => {
    const fetchPeopleDetails = async () => {
      const data = await getPeopleDetails(id);
      setPerson(data);
    };

    fetchPeopleDetails();
  }, [id]);

  if (!person) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-2xl text-white">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Hero */}
        <div className="flex flex-col gap-10 lg:flex-row">
          {/* Left */}
          <div className="w-full lg:w-[350px]">
            <img
              src={`${IMAGE_BASE_URL}${person.profile_path}`}
              alt={person.name}
              className="w-full rounded-2xl object-cover shadow-2xl"
            />
          </div>

          {/* Right */}
          <div className="flex-1">
            <h1 className="text-5xl font-bold">{person.name}</h1>

            <p className="mt-2 text-xl font-medium text-orange-400">
              {person.known_for_department}
            </p>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 text-sm uppercase tracking-wider text-zinc-500">
                  Birthday
                </h3>

                <p className="text-zinc-300">
                  {person.birthday || "Unknown"}
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-sm uppercase tracking-wider text-zinc-500">
                  Place of Birth
                </h3>

                <p className="text-zinc-300">
                  {person.place_of_birth || "Unknown"}
                </p>
              </div>

              {person.imdb_id && (
                <div>
                  <h3 className="mb-2 text-sm uppercase tracking-wider text-zinc-500">
                    IMDb
                  </h3>

                  <a
                    href={`https://www.imdb.com/name/${person.imdb_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 transition hover:text-orange-300"
                  >
                    View IMDb Profile
                  </a>
                </div>
              )}

              {person.homepage && (
                <div>
                  <h3 className="mb-2 text-sm uppercase tracking-wider text-zinc-500">
                    Official Website
                  </h3>

                  <a
                    href={person.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 transition hover:text-orange-300"
                  >
                    Visit Website
                  </a>
                </div>
              )}
            </div>

            {/* Biography */}
            <div className="mt-10">
              <h2 className="mb-4 text-3xl font-bold">Biography</h2>

              <p
                className={`leading-8 text-zinc-300 ${
                  showBio ? "" : "line-clamp-4"
                }`}
              >
                {person.biography || "No biography available."}
              </p>

              {person.biography && (
                <button
                  onClick={() => setShowBio(!showBio)}
                  className="mt-4 font-medium text-orange-400 transition hover:text-orange-300"
                >
                  {showBio ? "Read Less" : "Read More"}
                </button>
              )}
            </div>

            {/* Also Known As */}
            {/* {person.also_known_as.length > 0 && (
              <div className="mt-10">
                <h2 className="mb-4 text-3xl font-bold">Also Known As</h2>

                <div className="flex flex-wrap gap-3">
                  {person.also_known_as.slice(0, 4).map((name, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )} */}
          </div>
        </div>

        {/* Known For */}
        {/* <div className="mt-16">
          <h2 className="mb-6 text-3xl font-bold">Known For</h2>

          <p className="text-zinc-400">
            Movie posters will be added here after fetching the person's movie
            credits.
          </p>
        </div> */}
      </div>
    </section>
  );
};

export default PeopleDetails;