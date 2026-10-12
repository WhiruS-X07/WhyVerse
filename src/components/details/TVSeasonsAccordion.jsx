import { useState } from "react";

import { getTVSeason } from "../../services/tmdb/titleDetails";
import { SectionHeading } from "./DetailUI";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const TVSeasons = ({ data }) => {
  const seasons = data.seasons?.filter((season) => season.season_number > 0) ?? [];
  const [openSeason, setOpenSeason] = useState(null);
  const [seasonData, setSeasonData] = useState({});
  const [loadingSeason, setLoadingSeason] = useState(null);
  const [failedSeason, setFailedSeason] = useState(null);

  if (!seasons.length) return null;

  const loadSeason = async (seasonNumber) => {
    setFailedSeason(null);
    if (seasonData[seasonNumber]) return;
    setLoadingSeason(seasonNumber);
    try {
      const result = await getTVSeason(data.id, seasonNumber);
      setSeasonData((current) => ({ ...current, [seasonNumber]: result }));
    } catch {
      setFailedSeason(seasonNumber);
    } finally {
      setLoadingSeason(null);
    }
  };

  const toggleSeason = async (seasonNumber) => {
    if (openSeason === seasonNumber) {
      setOpenSeason(null);
      return;
    }
    setOpenSeason(seasonNumber);
    await loadSeason(seasonNumber);
  };

  return (
    <section className="min-w-0">
      <SectionHeading><span className="text-white">Seasons</span>{" "}<span className="text-orange-500">& Episodes</span></SectionHeading>
      <div className="space-y-3">
        {seasons.map((season) => {
          const expanded = openSeason === season.season_number;
          const details = seasonData[season.season_number];
          return (
            <article key={season.id} className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70">
              <button type="button" onClick={() => toggleSeason(season.season_number)} aria-expanded={expanded} className="flex w-full min-w-0 items-center gap-4 p-3 text-left transition hover:bg-white/[0.03] sm:gap-5 sm:p-4">
                {season.poster_path ? <img src={`${IMAGE_BASE_URL}/w185${season.poster_path}`} alt="" className="h-20 w-14 shrink-0 rounded-lg object-cover sm:h-24 sm:w-16" loading="lazy" /> : <div className="flex h-20 w-14 shrink-0 items-center justify-center rounded-lg bg-black/40 text-xs text-zinc-500 sm:h-24 sm:w-16">Season</div>}
                <span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold text-white sm:text-base">{season.name}</span><span className="mt-1 block text-xs text-zinc-400">{season.episode_count ?? 0} episodes{season.air_date ? ` · ${season.air_date.slice(0, 4)}` : ""}</span><span className="mt-2 line-clamp-2 text-xs leading-5 text-zinc-500">{season.overview || "Explore the episodes in this season."}</span></span>
                <span aria-hidden="true" className={`shrink-0 text-xl text-orange-400 transition-transform ${expanded ? "rotate-180" : ""}`}>⌄</span>
              </button>
              {expanded && <div className="border-t border-white/[0.07] p-3 sm:p-4">
                {loadingSeason === season.season_number ? <p role="status" className="py-4 text-center text-sm text-zinc-500">Loading episodes…</p>
                  : failedSeason === season.season_number ? <div className="py-4 text-center text-sm text-zinc-400">Episodes are unavailable right now. <button type="button" onClick={() => loadSeason(season.season_number)} className="font-semibold text-orange-300 hover:text-orange-200">Try again</button></div>
                    : <div className="space-y-2">{(details?.episodes ?? []).map((episode) => <div key={episode.id} className="flex min-w-0 gap-3 rounded-xl bg-black/25 p-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-xs font-bold text-orange-300">{episode.episode_number}</span><div className="min-w-0"><h4 className="break-words text-sm font-semibold text-white">{episode.name}</h4><p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-500">{episode.overview || "No episode overview available."}</p></div></div>)}{details && !details.episodes?.length && <p className="py-3 text-center text-sm text-zinc-500">No episode details are available.</p>}</div>}
              </div>}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default TVSeasons;
