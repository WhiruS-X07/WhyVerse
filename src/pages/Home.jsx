import { useEffect, useState } from "react";

import HeroBanner from "../components/HeroBanner";
import Row from "../components/Row";

import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
} from "../services/Movies";

import {
  getPopularTV,
  getTopRatedTV,
  getAiringTodayTV,
  getOnTheAirTV,
} from "../services/TVShows";

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

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // Movies
        setPopularMovies(await getPopularMovies());
        setTopRatedMovies(await getTopRatedMovies());
        setUpcomingMovies(await getUpcomingMovies());
        setNowPlayingMovies(await getNowPlayingMovies());

        // TV Shows
        setPopularTV(await getPopularTV());
        setTopRatedTV(await getTopRatedTV());
        setAiringTodayTV(await getAiringTodayTV());
        setOnTheAirTV(await getOnTheAirTV());
      } catch (error) {
        console.error("Error fetching home data:", error);
      }
    };

    fetchHomeData();
  }, []);
  return (
    <div className="mx-auto max-w-screen-2xl px-6 py-8">
      {/* Hero Banner */}
      <HeroBanner items={popularMovies} />
      
      {/* Upcoming */}
      <div className="mt-14">
        <Row title="Upcoming Movies" icon="upcoming" items={upcomingMovies} />
      </div>

      {/* Movies */}
      <div className="mt-12 space-y-14">
        <Row title="Trending Movies" icon="popular" items={popularMovies} />

        <Row title="Now Playing" icon="play" items={nowPlayingMovies} />

        <Row title="Top Rated Movies" icon="star" items={topRatedMovies} />
      </div>

      {/* TV Shows */}
      <div className="mt-14 space-y-14">
        <Row title="Popular TV Shows" icon="tv" items={popularTV} />

        <Row title="Airing Today" icon="airing" items={airingTodayTV} />

        <Row title="On The Air" icon="broadcast" items={onTheAirTV} />

        <Row title="Top Rated TV Shows" icon="star" items={topRatedTV} />
      </div>

      
    </div>
  );
};

export default Home;
