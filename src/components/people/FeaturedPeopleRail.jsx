import { Link } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w342";

const PeopleRail = ({ items = [] }) => {
  if (!items.length) return null;

  return (
    <section className="mb-10 pt-2 sm:mb-12 lg:mb-16 lg:pt-3" aria-labelledby="people-rail-title">
      <div className="mb-5 flex items-end justify-between gap-4 sm:mb-7">
        <div>
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-400">The faces behind the stories</p>
          <h2 id="people-rail-title" className="text-xl font-black tracking-tight text-white sm:text-2xl lg:text-3xl">People to know</h2>
          <div className="mt-2 h-1 w-16 rounded-full bg-orange-500 sm:w-20" />
        </div>
        <Link to="/people" className="shrink-0 rounded-full border border-white/10 px-3.5 py-2 text-xs font-semibold text-zinc-300 transition hover:border-orange-500/50 hover:text-white sm:px-4 sm:text-sm">
          Meet everyone <span aria-hidden="true" className="ml-1 text-orange-400">→</span>
        </Link>
      </div>

      <div className="movie-scroll flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-4 sm:gap-4">
        {items.map((person, index) => (
          <Link key={person.id} to={`/person/${person.id}`} className="group w-[132px] flex-none snap-start sm:w-[158px] lg:w-[174px]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/[0.08] bg-[radial-gradient(circle_at_50%_30%,rgba(239,93,18,0.2),transparent_45%),linear-gradient(145deg,#27211e,#111)] transition duration-300 group-hover:-translate-y-1 group-hover:border-orange-500/50 group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-orange-400 motion-reduce:transition-none">
              <div className="absolute inset-0 flex items-center justify-center text-4xl font-black text-white/20" aria-hidden="true">{person.name?.charAt(0) || "?"}</div>
              {person.profile_path && <img src={`${IMAGE_BASE_URL}${person.profile_path}`} alt={person.name} loading={index < 6 ? "eager" : "lazy"} className="absolute inset-0 h-full w-full object-cover object-top transition duration-500 group-hover:scale-105 motion-reduce:transition-none" onError={(event) => { event.currentTarget.style.display = "none"; }} />}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <span className="absolute bottom-2 left-2 rounded-full border border-white/15 bg-black/55 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-orange-300 backdrop-blur-sm">{person.known_for_department || "Artist"}</span>
            </div>
            <h3 className="mt-2.5 line-clamp-1 text-sm font-bold text-white transition-colors group-hover:text-orange-300 sm:text-base">{person.name}</h3>
            <p className="mt-0.5 line-clamp-1 text-[11px] text-zinc-500 sm:text-xs">{person.known_for?.[0]?.title || person.known_for?.[0]?.name || "Explore their work"}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PeopleRail;
