import { useEffect, useState } from "react";
import Row from "../media/MediaRow";

const CatalogPage = ({ eyebrow, title, description, sections }) => {
  const [collections, setCollections] = useState({});
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let active = true;

    const loadSections = async () => {
      const results = await Promise.allSettled(sections.map((section) => section.load()));
      if (!active) return;

      const nextCollections = {};
      results.forEach((result, index) => {
        nextCollections[sections[index].key] = result.status === "fulfilled"
          ? result.value?.results ?? []
          : [];
      });

      setCollections(nextCollections);
      setHasError(results.every((result) => result.status === "rejected"));
      setLoading(false);
    };

    loadSections();
    return () => { active = false; };
  }, [sections]);

  if (loading) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center bg-[#080808]">
        <div className="relative h-12 w-12" role="status" aria-label={`Loading ${title}`}>
          <span className="absolute inset-0 animate-ping rounded-full bg-orange-500/15 motion-reduce:animate-none" />
          <span className="absolute inset-2 animate-spin rounded-full border-2 border-orange-500 border-r-transparent motion-reduce:animate-none" />
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex min-h-[65vh] flex-col items-center justify-center gap-4 px-5 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-400">{eyebrow}</p>
        <h1 className="text-3xl font-black text-white">The catalog couldn’t load</h1>
        <p className="max-w-md text-sm leading-6 text-zinc-400">Check your connection and TMDB configuration, then try again.</p>
        <button onClick={() => window.location.reload()} className="rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-400">Try again</button>
      </div>
    );
  }

  const availableSections = sections.filter((section) => collections[section.key]?.length);

  return (
    <main className="min-h-screen overflow-hidden bg-[#080808] pb-10">
      <div className="relative mx-auto max-w-[1720px] px-4 pt-7 sm:px-6 sm:pt-10 lg:px-10">
        <header className="catalog-enter relative mb-6 overflow-hidden rounded-3xl border border-white/[0.08] bg-[radial-gradient(ellipse_at_85%_10%,rgba(239,93,18,0.17),transparent_42%),linear-gradient(120deg,#181411,#0d0d0d_68%)] px-5 py-7 sm:mb-8 sm:px-8 sm:py-9 lg:px-10">
          <div className="relative z-10 max-w-3xl">
            <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400 sm:text-xs">
              <span className="h-px w-7 bg-orange-500" /> {eyebrow}
            </p>
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">{title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">{description}</p>
          </div>
          <div aria-hidden="true" className="absolute -right-12 -top-20 h-56 w-56 rounded-full border border-orange-500/10 sm:h-72 sm:w-72" />
          <div aria-hidden="true" className="absolute -right-1 -top-8 h-40 w-40 rounded-full border border-orange-500/[0.07] sm:h-52 sm:w-52" />
        </header>

        {availableSections.length ? (
          <div className="space-y-2 sm:space-y-4">
            {availableSections.map((section, index) => (
              <div id={section.key} key={section.key} className="catalog-enter scroll-mt-28" style={{ animationDelay: `${Math.min(index * 70, 420)}ms` }}>
                <Row title={section.title} icon={section.icon} items={collections[section.key]} type={section.type} category={section.category} />
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-white/10 bg-zinc-900/60 px-5 py-12 text-center text-sm text-zinc-400">No titles are available in these collections right now.</p>
        )}
      </div>
    </main>
  );
};

export default CatalogPage;
