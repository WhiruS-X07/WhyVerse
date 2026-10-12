import { Link } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const PeopleCard = ({ title, items = [] }) => (
  <>
    <header className="relative mb-8 overflow-hidden rounded-3xl border border-white/[0.08] bg-[radial-gradient(ellipse_at_85%_15%,rgba(239,93,18,0.18),transparent_42%),linear-gradient(120deg,#151515,#0b0b0b_70%)] px-5 py-7 sm:mb-10 sm:px-8 sm:py-9 lg:px-10">
      <div className="relative z-10 max-w-2xl">
        <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-orange-400 sm:text-xs">
          <span className="h-px w-7 bg-orange-500" /> Faces behind the stories
        </p>
        <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title.split(" ")[0]} <span className="text-orange-500">{title.split(" ").slice(1).join(" ")}</span>
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">
          Meet the actors, filmmakers, and creative minds bringing your favorite stories to life.
        </p>
      </div>
      <div aria-hidden="true" className="absolute -right-8 -top-14 h-56 w-56 rounded-full border border-orange-500/10 sm:h-72 sm:w-72" />
      <div aria-hidden="true" className="absolute -right-1 -top-7 h-44 w-44 rounded-full border border-orange-500/[0.07] sm:h-56 sm:w-56" />
    </header>

    {items.length ? (
      <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-8 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {items.map((item, index) => (
          <Link
            key={item.id}
            to={`/person/${item.id}`}
            aria-label={`View ${item.name}${item.known_for_department ? `, ${item.known_for_department}` : ""}`}
            className="group relative block min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-900 shadow-lg shadow-black/20 transition duration-300 group-hover:-translate-y-1 group-hover:border-orange-500/50 group-hover:shadow-orange-950/30 motion-reduce:transition-none">
              <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_35%,rgba(239,93,18,0.19),transparent_45%),linear-gradient(145deg,#27211e,#111)] text-5xl font-black text-white/20" aria-hidden="true">
                {item.name?.charAt(0) || "?"}
              </div>
              {item.profile_path && (
                <img
                  src={`${IMAGE_BASE_URL}${item.profile_path}`}
                  alt={item.name}
                  loading={index < 6 ? "eager" : "lazy"}
                  className="absolute inset-0 h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
                  onError={(event) => { event.currentTarget.style.display = "none"; }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-90" />
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.18em] text-orange-400 sm:text-[10px]">
                  {item.known_for_department || "Featured talent"}
                </p>
                <h2 className="line-clamp-2 text-sm font-bold leading-snug text-white sm:text-base lg:text-lg">{item.name}</h2>
                <div className="mt-2 h-px w-8 bg-orange-500 transition-all duration-300 group-hover:w-14 group-focus-visible:w-14" />
              </div>
              {item.known_for?.length > 0 && (
                <div className="absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-black via-black/95 to-transparent px-3 pb-[4.4rem] pt-12 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:px-4 sm:pb-[5.2rem]">
                  <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-orange-400">Known for</p>
                  <ul className="space-y-1">
                    {item.known_for.slice(0, 2).map((work) => (
                      <li key={work.id} className="line-clamp-1 text-[11px] text-zinc-200 sm:text-xs">{work.title || work.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    ) : (
      <p className="rounded-2xl border border-white/10 bg-zinc-900/60 px-5 py-12 text-center text-zinc-400">
        No people are available right now.
      </p>
    )}
  </>
);

export default PeopleCard;
