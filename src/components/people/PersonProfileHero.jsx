import { useState } from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const formatDate = (value) => {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(date);
};

const getAge = (birthday, endDate) => {
  if (!birthday) return null;
  const birth = new Date(`${birthday}T00:00:00`);
  const end = endDate ? new Date(`${endDate}T00:00:00`) : new Date();
  if (Number.isNaN(birth.getTime()) || Number.isNaN(end.getTime()) || end < birth) return null;
  let age = end.getFullYear() - birth.getFullYear();
  if (end.getMonth() < birth.getMonth() || (end.getMonth() === birth.getMonth() && end.getDate() < birth.getDate())) age -= 1;
  return age;
};

const SocialIcon = ({ label }) => {
  const common = { viewBox: "0 0 24 24", className: "h-4 w-4 shrink-0", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };

  if (label === "IMDb") return <span aria-hidden="true" className="grid h-4 w-7 shrink-0 place-items-center rounded-[3px] border border-current text-[8px] font-black leading-none">IMDb</span>;
  if (label === "Instagram") return <svg {...common}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.6" cy="6.7" r=".8" fill="currentColor" stroke="none" /></svg>;
  if (label === "Facebook") return <svg {...common} fill="currentColor" stroke="none"><path d="M13.4 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.2V13H10v8h3.4Z" /></svg>;
  if (label === "X / Twitter") return <svg {...common} fill="currentColor" stroke="none"><path d="M18.9 3h2.8l-6.1 7 7.2 11h-5.6l-4.4-6.7L7 21H4.2l6.5-7.5L3.8 3h5.8l4 6.2L18.9 3Zm-1 16h1.5L8.1 4.9H6.5L17.9 19Z" /></svg>;
  return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18m0-18a15 15 0 0 0 0 18" /></svg>;
};

const PersonProfileHero = ({ person, movieCount, tvCount, creditCount }) => {
  const [showFullBio, setShowFullBio] = useState(false);
  const externalIds = person.external_ids ?? {};
  const age = getAge(person.birthday, person.deathday);
  const links = [
    ["IMDb", externalIds.imdb_id ? `https://www.imdb.com/name/${externalIds.imdb_id}` : null],
    ["Instagram", externalIds.instagram_id ? `https://www.instagram.com/${externalIds.instagram_id}` : null],
    ["Facebook", externalIds.facebook_id ? `https://www.facebook.com/${externalIds.facebook_id}` : null],
    ["X / Twitter", externalIds.twitter_id ? `https://x.com/${externalIds.twitter_id}` : null],
    ["Official site", person.homepage],
  ].filter(([, url]) => url);

  return (
    <section className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#111]">
      {person.profile_path && <img src={`${IMAGE_BASE_URL}/w1280${person.profile_path}`} alt="" aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full scale-110 object-cover object-[center_25%] opacity-20 blur-2xl" />}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_82%_12%,rgba(239,93,18,0.16),transparent_43%),linear-gradient(110deg,rgba(8,8,8,0.97),rgba(8,8,8,0.78)_55%,rgba(8,8,8,0.94))]" />
      <div className="grid min-w-0 gap-7 p-5 sm:gap-9 sm:p-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12 lg:p-10">
        <div className="mx-auto w-full max-w-[280px] lg:mx-0">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/50">
            <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_35%,rgba(239,93,18,0.22),transparent_42%),linear-gradient(145deg,#27211e,#111)] text-7xl font-black text-white/25" aria-hidden="true">{person.name?.charAt(0) || "?"}</div>
            {person.profile_path && <img src={`${IMAGE_BASE_URL}/w780${person.profile_path}`} alt={person.name} className="absolute inset-0 h-full w-full object-cover object-top" onError={(event) => { event.currentTarget.style.display = "none"; }} />}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true" />
          </div>
        </div>

        <div className="min-w-0 self-center py-1 sm:py-2">
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-orange-400 sm:text-xs"><span className="h-px w-7 bg-orange-500" />Behind the stories</p>
          <h1 className="mt-3 break-words text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">{person.name}</h1>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.15em] text-orange-300 sm:text-base">{person.known_for_department || "Film & television"}</p>

          <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-8 sm:max-w-xl sm:gap-3">
            {[["Credits", creditCount], ["Movies", movieCount], ["TV shows", tvCount]].map(([label, value]) => <div key={label} className="rounded-xl border border-white/[0.08] bg-black/30 px-3 py-3 sm:px-4"><p className="text-xl font-black text-white sm:text-2xl">{value}</p><p className="mt-1 text-[9px] font-bold uppercase tracking-[0.13em] text-zinc-500 sm:text-[10px]">{label}</p></div>)}
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {person.birthday && <div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500">Born</p><p className="mt-1 text-zinc-200">{formatDate(person.birthday)}{age != null && <span className="text-zinc-500"> · {person.deathday ? `aged ${age}` : `${age} years old`}</span>}</p></div>}
            {person.deathday && <div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500">Died</p><p className="mt-1 text-zinc-200">{formatDate(person.deathday)}</p></div>}
            {person.place_of_birth && <div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500">Place of birth</p><p className="mt-1 break-words text-zinc-200">{person.place_of_birth}</p></div>}
          </div>

          <div className="mt-7 max-w-3xl">
            <h2 className="text-lg font-bold text-white sm:text-xl">Biography</h2>
            <p className={`mt-3 whitespace-pre-line text-sm leading-7 text-zinc-300 sm:text-base sm:leading-8 ${showFullBio ? "" : "line-clamp-5"}`}>{person.biography || "No biography is available for this person yet."}</p>
            {person.biography?.length > 400 && <button type="button" onClick={() => setShowFullBio((value) => !value)} aria-expanded={showFullBio} className="mt-3 text-sm font-semibold text-orange-400 transition hover:text-orange-300">{showFullBio ? "Show less" : "Read full biography"}</button>}
          </div>

          {!!person.also_known_as?.length && <div className="mt-6"><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500">Also known as</p><div className="mt-2 flex flex-wrap gap-2">{person.also_known_as.slice(0, 5).map((name) => <span key={name} className="max-w-full break-words rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-zinc-300">{name}</span>)}</div></div>}

          {!!links.length && <div className="mt-6 flex flex-wrap gap-2">{links.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={`${label} (opens in a new tab)`} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-zinc-200 transition hover:border-orange-500/50 hover:text-orange-300"><SocialIcon label={label} />{label}</a>)}</div>}
        </div>
      </div>
    </section>
  );
};

export default PersonProfileHero;
