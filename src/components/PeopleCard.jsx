import { Link } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const PeopleCard = ({ title, items = [] }) => {
  if (!items.length) return null;

  return (
    <>
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
            <h1 className="text-4xl font-bold text-white">{title}</h1>

            <div className="mt-2 h-1 w-28 rounded-full bg-orange-500" />

            <p className="mt-3 text-zinc-400">
              Discover trending actors, actresses, directors, and creators.
            </p>
          </div>
        </div>
      </div>

      {/* People Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <Link
            key={item.id}
            to={`/person/${item.id}`}
            className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-orange-500 hover:shadow-orange-500/20"
          >
            <img
              src={
                item.profile_path
                  ? `${IMAGE_BASE_URL}${item.profile_path}`
                  : "https://placehold.co/500x750?text=No+Image"
              }
              alt={item.name}
              className="h-[420px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="absolute bottom-0 w-full translate-y-6 p-6 text-white transition-transform duration-500 group-hover:translate-y-0">
                <h2 className="text-2xl font-bold">{item.name}</h2>

                <p className="mt-1 text-sm font-medium text-orange-400">
                  {item.known_for_department}
                </p>

                <div className="mt-4">
                  <p className="mb-2 font-semibold">Known For</p>

                  <ul className="space-y-1 text-sm text-zinc-300">
                    {item.known_for.slice(0, 3).map((work) => (
                      <li key={work.id}>• {work.title || work.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default PeopleCard;
