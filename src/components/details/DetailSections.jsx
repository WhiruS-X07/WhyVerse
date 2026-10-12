import { InfoCard, SectionHeading } from "./DetailUI";

const CompactList = ({ items }) => {
  const visibleItems = items.slice(0, 4);
  const remainingCount = items.length - visibleItems.length;
  return (
    <div className="mt-3 min-w-0 sm:mt-4">
      <ul className="flex min-w-0 flex-wrap gap-2">
        {visibleItems.map((item, index) => <li key={`${item}-${index}`} className="max-w-full break-words rounded-lg border border-white/[0.07] bg-black/20 px-3 py-2 text-sm font-semibold leading-5 text-white">{item}</li>)}
        {remainingCount > 0 && <li className="flex items-center rounded-lg border border-orange-500/20 bg-orange-500/[0.08] px-3 py-2 text-sm font-bold text-orange-300">+{remainingCount} more</li>}
      </ul>
    </div>
  );
};

export const DetailStory = ({ data }) => (
  <section className="min-w-0">
    <SectionHeading><span className="text-white">The</span>{" "}<span className="text-orange-500">Story</span></SectionHeading>
    <p className="max-w-3xl text-sm leading-7 text-zinc-300 sm:text-base sm:leading-8">{data.overview || "No story overview available."}</p>
  </section>
);

export const DetailFacts = ({ data, type }) => {
  const facts = type === "movie"
    ? [["Status", data.status], ["Collection", data.belongs_to_collection?.name || "Standalone Movie"], ["Country", data.production_countries?.map((country) => country.name) || []], ["Languages", data.spoken_languages?.map((language) => language.english_name) || []]]
    : [["Status", data.status], ["Seasons", data.number_of_seasons], ["Network", data.networks?.map((network) => network.name) || []], ["Episodes", data.number_of_episodes]];

  return (
    <section className="min-w-0">
      <SectionHeading><span className="text-white">Quick</span>{" "}<span className="text-orange-500">Facts</span></SectionHeading>
      <div className="grid min-w-0 gap-3 sm:grid-cols-2 sm:gap-4">
        {facts.map(([label, value]) => <InfoCard key={label} label={label}>{Array.isArray(value) ? (value.length ? <CompactList items={value} /> : <h3 className="mt-3 text-base font-bold text-white">Not Available</h3>) : <h3 className="mt-3 break-words text-base font-bold text-white sm:text-lg">{value || "Not Available"}</h3>}</InfoCard>)}
      </div>
    </section>
  );
};

export const DetailProduction = ({ data, type }) => {
  const items = type === "movie"
    ? [["Budget", data.budget ? `$${data.budget.toLocaleString()}` : "Not Available"], ["Box Office", data.revenue ? `$${data.revenue.toLocaleString()}` : "Not Available"], ["Official Site", data.homepage, "Visit Website"], ["IMDb", data.imdb_id ? `https://www.imdb.com/title/${data.imdb_id}` : null, "View on IMDb"]]
    : [["Created By", data.created_by?.map((creator) => creator.name) || []], ["Last Air Date", data.last_air_date], ["Official Site", data.homepage, "Visit Website"]];

  return (
    <section className="min-w-0">
      <SectionHeading><span className="text-white">Production</span>{" "}<span className="text-orange-500">Details</span></SectionHeading>
      <div className="grid min-w-0 gap-3 sm:grid-cols-2 sm:gap-4">
        {items.map(([label, value, linkLabel]) => <InfoCard key={label} label={label}>{linkLabel && value ? <a href={value} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 break-all font-semibold text-orange-400 transition hover:text-orange-300 sm:mt-4">{linkLabel}<svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 3h7v7M10 14 21 3" /><path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" /></svg></a> : <h3 className="mt-3 break-words text-base font-bold text-white sm:mt-4 sm:text-lg">{linkLabel ? "Not Available" : Array.isArray(value) ? (value.join(", ") || "Not Available") : value || "Not Available"}</h3>}</InfoCard>)}
      </div>
    </section>
  );
};

