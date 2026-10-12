import { Link } from "react-router-dom";

import { SectionHeading } from "./DetailUI";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const ProductionStudios = ({ data }) => (
  <section className="min-w-0">
    <SectionHeading><span className="text-white">Production</span>{" "}<span className="text-orange-500">Studios</span></SectionHeading>
    {data.production_companies?.length ? (
      <div className="movie-scroll flex gap-3 overflow-x-auto pb-3 sm:gap-4">
        {data.production_companies.map((company) => <div key={company.id} className="w-36 shrink-0 rounded-2xl border border-white/[0.08] bg-[#151515] p-4 transition hover:border-orange-500/50 sm:w-40">
          {company.logo_path ? <img src={`${IMAGE_BASE_URL}/w300${company.logo_path}`} alt={company.name} className="mx-auto h-12 object-contain" loading="lazy" onError={(event) => { event.currentTarget.style.visibility = "hidden"; }} /> : <div className="flex h-12 items-center justify-center text-sm text-orange-400">Studio</div>}
          <h3 className="mt-3 line-clamp-2 text-center text-sm font-bold">{company.name}</h3>
          <p className="mt-1 text-center text-xs text-gray-400">{company.origin_country || "Unknown"}</p>
        </div>)}
      </div>
    ) : <p className="text-sm text-zinc-500">No production studio information available.</p>}
  </section>
);

const DetailSidebar = ({ data }) => {
  const cast = data.aggregate_credits?.cast ?? data.credits?.cast ?? [];
  const keyCrew = (data.credits?.crew ?? [])
    .filter((member) => ["Director", "Writer", "Screenplay", "Story", "Producer", "Executive Producer", "Creator"].includes(member.job))
    .filter((member, index, crew) => crew.findIndex((person) => person.id === member.id && person.job === member.job) === index)
    .slice(0, 10);
  return (
  <aside className="min-w-0 space-y-12 sm:space-y-14">
    {!!keyCrew.length && (
      <section>
        <SectionHeading>
          <span className="text-white">Key</span>{" "}
          <span className="text-orange-500">Crew</span>
        </SectionHeading>
        <div className="movie-scroll flex gap-3 overflow-x-auto pb-3 sm:gap-4">
          {keyCrew.map((member) => (
            <Link key={`${member.id}-${member.job}`} to={`/person/${member.id}`} aria-label={`View ${member.name}, ${member.job}`} className="group w-28 shrink-0 text-center sm:w-32">
              {member.profile_path ? (
                <img src={`${IMAGE_BASE_URL}/w300${member.profile_path}`} alt={`${member.name}`} loading="lazy" className="mx-auto h-24 w-24 rounded-full border-2 border-zinc-700 object-cover transition group-hover:scale-105 group-hover:border-orange-500 sm:h-28 sm:w-28" onError={(event) => { event.currentTarget.style.visibility = "hidden"; }} />
              ) : (
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-zinc-700 bg-zinc-800 px-2 text-xs text-orange-400 sm:h-28 sm:w-28">No photo</div>
              )}
              <p className="mt-3 line-clamp-2 text-sm font-bold text-white transition group-hover:text-orange-300">{member.name}</p>
              <p className="mt-1 line-clamp-2 text-xs text-gray-400">{member.job}</p>
            </Link>
          ))}
        </div>
      </section>
    )}

    <section>
      <SectionHeading>
        <span className="text-white">Top</span>{" "}
        <span className="text-orange-500">Cast</span>
      </SectionHeading>

      {cast.length ? (
        <div className="movie-scroll flex gap-3 overflow-x-auto pt-1 pb-4 sm:gap-5">
          {cast.slice(0, 12).map((actor) => (
            <Link key={actor.id} to={`/person/${actor.id}`} aria-label={`View ${actor.name}`} className="group w-28 shrink-0 text-center sm:w-32">
              {actor.profile_path ? (
                <img
                  src={`${IMAGE_BASE_URL}/w300${actor.profile_path}`}
                  alt={actor.name}
                  className="mx-auto h-24 w-24 rounded-full border-2 border-zinc-700 object-cover transition group-hover:scale-105 group-hover:border-orange-500 sm:h-28 sm:w-28"
                  onError={(event) => {
                    event.currentTarget.style.visibility = "hidden";
                  }}
                />
              ) : (
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-zinc-700 bg-zinc-800 text-sm text-orange-400 sm:h-28 sm:w-28">
                  No photo
                </div>
              )}
              <h3 className="mt-4 line-clamp-2 text-sm font-bold transition group-hover:text-orange-300">{actor.name}</h3>
              <p className="mt-1 line-clamp-2 text-xs text-gray-400">
                {actor.character || actor.roles?.map((role) => role.character).filter(Boolean).slice(0, 2).join(", ") || "Unknown Character"}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-zinc-400">No cast information available.</p>
      )}
    </section>
  </aside>
  );
};

export default DetailSidebar;
