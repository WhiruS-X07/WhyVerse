import CollectionActions from "./TitleActions";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
const metadataBadgeClass = "inline-flex min-h-8 items-center gap-1.5 rounded-full border border-white/15 bg-[#111]/90 px-3 py-1.5 text-[10px] text-zinc-200 shadow-sm shadow-black/20 backdrop-blur-md sm:text-sm";

const formatReleaseDate = (value) => {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(date);
};

const DetailHero = ({ data, mediaType, onTrailerOpen }) => {
  const trailer = data.videos?.results?.find(
    (video) => video.site === "YouTube" && video.type === "Trailer",
  );
  const title = data.title || data.name;
  const runtime = data.runtime || data.episode_run_time?.[0];
  const releaseDate = formatReleaseDate(data.release_date || data.first_air_date);
  const metadata = [
    releaseDate,
    runtime ? `${runtime} min` : data.number_of_seasons ? `${data.number_of_seasons} seasons` : null,
    data.original_language?.toUpperCase(),
  ].filter(Boolean);

  return (
    <section className="relative isolate flex min-h-[560px] w-full items-end overflow-hidden bg-[#090909] sm:min-h-[620px] lg:min-h-[680px]">
      {data.backdrop_path && (
        <img
          src={`${IMAGE_BASE_URL}/original${data.backdrop_path}`}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          onError={(event) => { event.currentTarget.style.display = "none"; }}
        />
      )}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#050505_0%,rgba(5,5,5,.93)_23%,rgba(5,5,5,.63)_58%,rgba(5,5,5,.28)_100%),linear-gradient(0deg,#000_0%,rgba(0,0,0,.83)_12%,transparent_72%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_10%,rgba(239,93,18,.16),transparent_40%)]" />

      <div className="mx-auto w-full max-w-[1480px] px-4 pb-9 pt-28 sm:px-6 sm:pb-12 lg:px-10 lg:pb-16">
        <div className="grid min-w-0 grid-cols-[104px_minmax(0,1fr)] items-end gap-4 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-7 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-11">
          <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-white/15 bg-zinc-900 shadow-2xl shadow-black/70 sm:rounded-2xl lg:rounded-3xl">
            {data.poster_path ? (
              <img
                src={`${IMAGE_BASE_URL}/w500${data.poster_path}`}
                alt={`${title} poster`}
                className="h-full w-full object-cover"
                onError={(event) => { event.currentTarget.style.display = "none"; }}
              />
            ) : (
              <div className="flex h-full items-center justify-center p-2 text-center text-xs font-bold text-zinc-500">Poster unavailable</div>
            )}
          </div>

          <div className="min-w-0 pb-0.5 sm:pb-1 lg:pb-2">
            <p className="text-[9px] font-bold uppercase tracking-[.24em] text-orange-400 sm:text-[11px]">
              WhyVerse <span className="px-1.5 text-zinc-600">/</span> {mediaType === "movie" ? "Movie" : "TV series"}
            </p>
            <h1 className="mt-2 break-words text-[1.65rem] font-black leading-[1.05] tracking-tight text-white sm:mt-3 sm:text-4xl lg:max-w-5xl lg:text-6xl lg:leading-[1.04]">
              {title}
            </h1>
            {data.tagline && <p className="mt-3 line-clamp-2 text-xs italic leading-5 text-zinc-300 sm:mt-4 sm:text-base sm:leading-7 lg:text-lg">“{data.tagline}”</p>}

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] text-zinc-300 sm:mt-5 sm:gap-x-4 sm:text-sm">
              {data.vote_average > 0 && (
                <span className={`${metadataBadgeClass} border-orange-400/35 font-bold text-white`}>
                  <svg className="h-3.5 w-3.5 fill-orange-400 text-orange-400" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2.8 2.8 5.7 6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3L3 9.4l6.3-.9L12 2.8Z" /></svg>
                  {data.vote_average.toFixed(1)}
                  {data.vote_count > 0 && <span className="font-medium text-zinc-400">· {data.vote_count.toLocaleString()}</span>}
                </span>
              )}
              {metadata.map((value) => (
                <span key={value} className={metadataBadgeClass}>
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                  {value}
                </span>
              ))}
              {data.status && <span className={metadataBadgeClass}>{data.status}</span>}
            </div>

            {!!data.genres?.length && (
              <div className="mt-4 hidden flex-wrap gap-2 sm:mt-5 sm:flex">
                {data.genres.map((genre) => <span key={genre.id} className="inline-flex min-h-8 items-center rounded-full border border-white/15 bg-[#111]/90 px-3 py-1.5 text-xs font-medium text-zinc-200 shadow-sm shadow-black/20 backdrop-blur-md">{genre.name}</span>)}
              </div>
            )}

            <div className="mt-5 sm:mt-6">
              <CollectionActions item={{ ...data, media_type: mediaType }} />
            </div>

            {(data.homepage || trailer) && (
              <div className="mt-3 flex flex-wrap gap-2.5 sm:mt-4 sm:gap-3">
                {data.homepage && (
                  <a href={data.homepage} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-orange-950/40 transition hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 sm:px-5 sm:text-sm">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 3h7v7M10 14 21 3" /><path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" /></svg>
                    Official site
                  </a>
                )}
                {trailer && (
                  <button type="button" onClick={() => onTrailerOpen(trailer)} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/20 bg-black/40 px-4 py-2.5 text-xs font-bold text-white backdrop-blur transition hover:border-orange-400 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 sm:px-5 sm:text-sm">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.8c0-.8.9-1.3 1.6-.9l9.1 5.2a1 1 0 0 1 0 1.8l-9.1 5.2c-.7.4-1.6-.1-1.6-.9V5.8Z" /></svg>
                    Watch trailer
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        {!!data.genres?.length && <div className="mt-5 flex flex-wrap gap-2 sm:hidden">{data.genres.map((genre) => <span key={genre.id} className="inline-flex min-h-8 items-center rounded-full border border-white/15 bg-[#111]/90 px-3 py-1.5 text-[10px] font-semibold text-zinc-200 shadow-sm shadow-black/20 backdrop-blur-md">{genre.name}</span>)}</div>}
      </div>
    </section>
  );
};

export default DetailHero;
