import { useEffect, useState } from "react";

import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  getDiscoverMovies,
} from "../services/Movies";

import HeroBanner from "../components/HeroBanner";
import Row from "../components/Row";

const Movies = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [discoverMovies, setDiscoverMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      setPopularMovies(await getPopularMovies());
      setTopRatedMovies(await getTopRatedMovies());
      setUpcomingMovies(await getUpcomingMovies());
      setNowPlayingMovies(await getNowPlayingMovies());
      setDiscoverMovies(await getDiscoverMovies());
    };

    fetchMovies();
  }, []);

  return (
    <div className="mx-auto max-w-screen-2xl px-6 py-8">
      <HeroBanner items={topRatedMovies} />

      <div className="mt-12 space-y-14">
        <Row title="Popular Movies" icon="popular" items={popularMovies} />

        <Row title="Now Playing" icon="play" items={nowPlayingMovies} />

        <Row title="Top Rated Movies" icon="star" items={topRatedMovies} />

        <Row title="Upcoming Movies" icon="upcoming" items={upcomingMovies} />

        <Row title="Discover" icon="discover" items={discoverMovies} />
      </div>
    </div>
  );
};

export default Movies;
