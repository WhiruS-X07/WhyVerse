import { SectionHeading } from "./DetailUI";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
const REGION_LABELS = { IN: "India", US: "United States" };
const RELEASE_TYPES = { 1: "Premiere", 2: "Limited Theatrical", 3: "Theatrical", 4: "Digital", 5: "Physical", 6: "TV" };

const SocialIcon = ({ label }) => {
  const common = { viewBox: "0 0 24 24", className: "h-4 w-4 shrink-0", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  if (label === "Instagram") return <svg {...common}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.6" cy="6.7" r=".8" fill="currentColor" stroke="none" /></svg>;
  if (label === "Facebook") return <svg {...common} fill="currentColor" stroke="none"><path d="M13.4 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.2V13H10v8h3.4Z" /></svg>;
  return <svg {...common} fill="currentColor" stroke="none"><path d="M18.9 3h2.8l-6.1 7 7.2 11h-5.6l-4.4-6.7L7 21H4.2l6.5-7.5L3.8 3h5.8l4 6.2L18.9 3Zm-1 16h1.5L8.1 4.9H6.5L17.9 19Z" /></svg>;
};

const DetailAdditional = ({ data, type }) => {
  const contentRating = type === "movie"
    ? data.release_dates?.results?.find((entry) => entry.iso_3166_1 === "IN")?.release_dates?.find((entry) => entry.certification)?.certification
      || data.release_dates?.results?.find((entry) => entry.iso_3166_1 === "US")?.release_dates?.find((entry) => entry.certification)?.certification
    : data.content_ratings?.results?.find((entry) => entry.iso_3166_1 === "IN")?.rating
      || data.content_ratings?.results?.find((entry) => entry.iso_3166_1 === "US")?.rating;
  const releaseEntries = type === "movie"
    ? (data.release_dates?.results ?? []).filter((entry) => entry.iso_3166_1 === "IN" || entry.iso_3166_1 === "US").flatMap((entry) => entry.release_dates?.filter((release) => release.release_date).map((release) => ({ region: entry.iso_3166_1, date: release.release_date.slice(0, 10), type: RELEASE_TYPES[release.type] || "Release" })) ?? []).slice(0, 4)
    : [];
  const images = data.images?.backdrops?.filter((image) => image.file_path).slice(0, 12) ?? [];
  const externalIds = data.external_ids ?? {};
  const socialLinks = [
    ["Instagram", externalIds.instagram_id ? `https://www.instagram.com/${externalIds.instagram_id}` : null],
    ["Facebook", externalIds.facebook_id ? `https://www.facebook.com/${externalIds.facebook_id}` : null],
    ["X / Twitter", externalIds.twitter_id ? `https://x.com/${externalIds.twitter_id}` : null],
  ].filter(([, href]) => href);

  return (
    <div className="min-w-0 space-y-14">
      {!!(releaseEntries.length || contentRating) && (
        <section>
          <SectionHeading><span className="text-white">Release</span>{" "}<span className="text-orange-500">Information</span></SectionHeading>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {contentRating && <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4"><p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Content rating</p><p className="mt-2 text-sm font-bold text-white">{contentRating}</p><p className="mt-1 text-xs text-zinc-500">India or US rating</p></div>}
            {releaseEntries.map((entry, index) => <div key={`${entry.region}-${entry.date}-${index}`} className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4"><p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{entry.type} · {REGION_LABELS[entry.region] || entry.region}</p><p className="mt-2 text-sm font-bold text-white">{entry.date}</p></div>)}
          </div>
        </section>
      )}

      {!!images.length && (
        <section className="min-w-0">
          <SectionHeading><span className="text-white">Image</span>{" "}<span className="text-orange-500">Gallery</span></SectionHeading>
          <div className="movie-scroll flex min-w-0 gap-3 overflow-x-auto pb-4">{images.map((image) => <img key={image.file_path} src={`${IMAGE_BASE_URL}/w780${image.file_path}`} alt={`${data.title || data.name} scene`} loading="lazy" className="h-36 w-auto max-w-[85vw] shrink-0 rounded-xl object-cover sm:h-48" />)}</div>
        </section>
      )}

      {!!socialLinks.length && (
        <section>
          <SectionHeading><span className="text-white">External</span>{" "}<span className="text-orange-500">Links</span></SectionHeading>
          <div className="flex flex-wrap gap-3">{socialLinks.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={`${label} (opens in a new tab)`} className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-orange-500/50 hover:text-orange-300"><SocialIcon label={label} />{label}</a>)}</div>
        </section>
      )}
    </div>
  );
};

export default DetailAdditional;
