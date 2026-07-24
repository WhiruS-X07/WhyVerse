import { useEffect, useState } from "react";

import { getTVShows, getDiscoverTV } from "../services/TVShows";

import HeroBanner from "../components/HeroBanner";
import Row from "../components/Row";

const TVShows = () => {
  const [airingToday, setAiringToday] = useState([]);
  const [onTheAir, setOnTheAir] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [topRatedTV, setTopRatedTV] = useState([]);
  const [discoverTV, setDiscoverTV] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        const [
          airingTodayData,
          onTheAirData,
          popularTVData,
          topRatedTVData,
          discoverTVData,
        ] = await Promise.all([
          getTVShows("airing_today"),
          getTVShows("on_the_air"),
          getTVShows("popular"),
          getTVShows("top_rated"),
          getDiscoverTV(),
        ]);

        setAiringToday(airingTodayData.results);
        setOnTheAir(onTheAirData.results);
        setPopularTV(popularTVData.results);
        setTopRatedTV(topRatedTVData.results);
        setDiscoverTV(discoverTVData.results);
      } catch (error) {
        console.error("Error fetching TV shows:", error);
        setError("Failed to load TV shows.");
      } finally {
        setLoading(false);
      }
    };

    fetchTVShows();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#EF5D12] border-t-transparent sm:h-12 sm:w-12"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-2xl font-bold text-white">Something went wrong</h2>

        <p className="text-slate-400">{error}</p>

        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-[#EF5D12] px-5 py-2 text-white transition hover:bg-[#F97316]"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 xl:px-10">
      <HeroBanner items={popularTV} />

      <div className="mt-10 space-y-10 sm:space-y-12 lg:mt-12 lg:space-y-14">
        <Row
          title="Discover"
          icon="discover"
          items={discoverTV}
          type="tv"
          category="discover"
        />

        <Row
          title="Popular TV Shows"
          icon="tv"
          items={popularTV}
          type="tv"
          category="popular"
        />

        <Row
          title="Airing Today"
          icon="airing"
          items={airingToday}
          type="tv"
          category="airing_today"
        />

        <Row
          title="On The Air"
          icon="broadcast"
          items={onTheAir}
          type="tv"
          category="on_the_air"
        />

        <Row
          title="Top Rated TV Shows"
          icon="star"
          items={topRatedTV}
          type="tv"
          category="top_rated"
        />
      </div>
    </div>
  );
};

export default TVShows;
