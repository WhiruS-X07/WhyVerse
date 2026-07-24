import { useEffect, useState } from "react";

import { getMovies, getDiscoverMovies } from "../services/Movies";

import HeroBanner from "../components/HeroBanner";
import Row from "../components/Row";

const Movies = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [discoverMovies, setDiscoverMovies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [
          popularMoviesData,
          topRatedMoviesData,
          upcomingMoviesData,
          nowPlayingMoviesData,
          discoverMoviesData,
        ] = await Promise.all([
          getMovies("popular"),
          getMovies("top_rated"),
          getMovies("upcoming"),
          getMovies("now_playing"),
          getDiscoverMovies(),
        ]);

        setPopularMovies(popularMoviesData.results);
        setTopRatedMovies(topRatedMoviesData.results);
        setUpcomingMovies(upcomingMoviesData.results);
        setNowPlayingMovies(nowPlayingMoviesData.results);
        setDiscoverMovies(discoverMoviesData.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
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
      {/* Hero Banner */}
      <HeroBanner items={topRatedMovies} />

      {/* Movie Rows */}
      <div className="mt-10 space-y-10 sm:space-y-12 lg:mt-12 lg:space-y-14">
        <Row
          title="Popular Movies"
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

        <Row
          title="Upcoming Movies"
          icon="upcoming"
          items={upcomingMovies}
          type="movie"
          category="upcoming"
        />

        <Row
          title="Discover Movies"
          icon="discover"
          items={discoverMovies}
          type="movie"
          category="discover"
        />
      </div>
    </div>
  );
};

export default Movies;
