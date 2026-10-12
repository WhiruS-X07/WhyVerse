import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import HeroBanner from "../../components/explore/ExploreHero";
import Row from "../../components/media/MediaRow";
import PeopleRail from "../../components/people/FeaturedPeopleRail";
import { getMovies } from "../../services/tmdb/movies";
import { getTVShows } from "../../services/tmdb/tvShows";
import { getPeople } from "../../services/tmdb/people";
import { getTrending } from "../../services/tmdb/trending";

const Explore = () => {
  const [catalog, setCatalog] = useState({
    featured: [],
    movies: [],
    releases: [],
    playing: [],
    tv: [],
    trendingTV: [],
    people: [],
  });
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let active = true;

    const loadExplore = async () => {
      const results = await Promise.allSettled([
        getTrending("movie"),
        getMovies("upcoming"),
        getMovies("now_playing"),
        getTVShows("popular"),
        getPeople(1),
        getTrending("tv"),
      ]);

      if (!active) return;

      const values = results.map((result) =>
        result.status === "fulfilled" ? result.value?.results ?? [] : [],
      );
      setCatalog({
        featured: values[0].slice(0, 8),
        movies: values[0],
        releases: values[1],
        playing: values[2],
        tv: values[3],
        people: values[4].slice(0, 20),
        trendingTV: values[5],
      });
      setHasError(results.every((result) => result.status === "rejected"));
      setLoading(false);
    };

    loadExplore();
    return () => { active = false; };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#080808]">
        <div className="relative h-14 w-14" role="status" aria-label="Loading Explore">
          <span className="absolute inset-0 animate-ping rounded-full bg-orange-500/20 motion-reduce:animate-none" />
          <span className="absolute inset-2 rounded-full border-2 border-orange-500 border-r-transparent animate-spin motion-reduce:animate-none" />
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex min-h-[65vh] flex-col items-center justify-center gap-4 px-5 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-orange-400">Explore WhyVerse</p>
        <h1 className="text-3xl font-black text-white">We couldn’t load the catalog</h1>
        <p className="max-w-md text-sm leading-6 text-zinc-400">Check your connection and TMDB configuration, then try loading the page again.</p>
        <button onClick={() => window.location.reload()} className="rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-400">Try again</button>
      </div>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#080808] pb-10">
      <div className="pointer-events-none absolute inset-x-0 top-20 -z-0 h-[34rem] bg-[radial-gradient(ellipse_at_50%_0%,rgba(239,93,18,0.1),transparent_65%)]" />
      <div className="relative z-10 mx-auto max-w-[1720px] px-4 pt-5 sm:px-6 sm:pt-8 lg:px-10">
        <div className="mb-4 flex items-center justify-between sm:mb-6">
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-400 sm:text-xs">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500" /> Your next watch starts here
          </p>
          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600 sm:block">Movies · Series · People</span>
        </div>

        <section aria-label="Featured movies" className="explore-enter">
          <HeroBanner items={catalog.featured} />
        </section>

        <div id="trending" className="mt-8 sm:mt-12">
          <Row title="Trending This Week" icon="popular" items={catalog.movies} type="movie" category="trending" />
        </div>
        <div id="movies">
          <Row title="In Theaters Now" icon="play" items={catalog.playing} type="movie" category="now_playing" />
          <Row title="Coming Soon" icon="upcoming" items={catalog.releases} type="movie" category="upcoming" />
        </div>
        <div id="series">
          <Row title="Trending TV This Week" icon="tv" items={catalog.trendingTV} type="tv" category="trending" />
          <Row title="Popular Series" icon="broadcast" items={catalog.tv} type="tv" category="popular" />
        </div>
        <div id="people">
          <PeopleRail items={catalog.people} />
        </div>

        <section className="explore-enter relative mt-8 overflow-hidden rounded-3xl border border-white/[0.08] bg-[linear-gradient(110deg,#19110d,#111_58%,#17100c)] px-5 py-7 sm:mt-12 sm:px-8 sm:py-9">
          <div className="absolute -right-16 -top-28 h-64 w-64 rounded-full border border-orange-500/10 sm:h-80 sm:w-80" />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-orange-400">Keep exploring</p>
              <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">Find your next favorite.</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">Browse the full movie and television catalogs, then save the titles you want to come back to.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/movies" className="rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-orange-400">Browse movies</Link>
              <Link to="/tvshows" className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white transition hover:border-orange-500/50 hover:bg-white/[0.08]">Browse series</Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Explore;
