import { useEffect, useState } from "react";

import HeroBanner from "../components/HeroBanner";
import Row from "../components/Row";

import { getMovies } from "../services/Movies";
import { getTVShows } from "../services/TVShows";

const Home = () => {
  // Movies
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

  // TV Shows
  const [popularTV, setPopularTV] = useState([]);
  const [topRatedTV, setTopRatedTV] = useState([]);
  const [airingTodayTV, setAiringTodayTV] = useState([]);
  const [onTheAirTV, setOnTheAirTV] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [
          popularMoviesData,
          topRatedMoviesData,
          upcomingMoviesData,
          nowPlayingMoviesData,
          popularTVData,
          topRatedTVData,
          airingTodayTVData,
          onTheAirTVData,
        ] = await Promise.all([
          getMovies("popular"),
          getMovies("top_rated"),
          getMovies("upcoming"),
          getMovies("now_playing"),
          getTVShows("popular"),
          getTVShows("top_rated"),
          getTVShows("airing_today"),
          getTVShows("on_the_air"),
        ]);

        setPopularMovies(popularMoviesData.results);
        setTopRatedMovies(topRatedMoviesData.results);
        setUpcomingMovies(upcomingMoviesData.results);
        setNowPlayingMovies(nowPlayingMoviesData.results);

        setPopularTV(popularTVData.results);
        setTopRatedTV(topRatedTVData.results);
        setAiringTodayTV(airingTodayTVData.results);
        setOnTheAirTV(onTheAirTVData.results);
      } catch (error) {
        console.error("Error fetching home data:", error);
        setError("Failed to load home data.");
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#EF5D12] border-t-transparent"></div>
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
      {/* Hero Banner */}
      <HeroBanner items={popularMovies} />

      {/* Upcoming */}
      <div className="mt-10 sm:mt-12 lg:mt-14">
        <Row
          title="Upcoming Movies"
          icon="upcoming"
          items={upcomingMovies}
          type="movie"
          category="upcoming"
        />
      </div>

      {/* Movies */}
      <div className="mt-10 space-y-10 sm:space-y-12 lg:mt-12 lg:space-y-14">
        <Row
          title="Trending Movies"
          icon="popular"
          items={popularMovies}
          type="movie"
          category="popular"
        />

        <Row
          title="Now Playing"
          icon="play"
          items={nowPlayingMovies}
          type="movie"
          category="now_playing"
        />

        <Row
          title="Top Rated Movies"
          icon="star"
          items={topRatedMovies}
          type="movie"
          category="top_rated"
        />
      </div>

      {/* TV Shows */}
      <div className="mt-10 space-y-10 sm:mt-12 sm:space-y-12 lg:mt-14 lg:space-y-14">
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
          items={airingTodayTV}
          type="tv"
          category="airing_today"
        />

        <Row
          title="On The Air"
          icon="broadcast"
          items={onTheAirTV}
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

export default Home;
