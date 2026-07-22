import { useEffect, useState } from "react";

import {
  getAiringTodayTV,
  getOnTheAirTV,
  getPopularTV,
  getTopRatedTV,
  getDiscoverTV,
} from "../services/TVShows";

import HeroBanner from "../components/HeroBanner";
import Row from "../components/Row";

const TVShows = () => {
  const [airingToday, setAiringToday] = useState([]);
  const [onTheAir, setOnTheAir] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [topRatedTV, setTopRatedTV] = useState([]);
  const [discoverTV, setDiscoverTV] = useState([]);

  useEffect(() => {
    const fetchTVShows = async () => {
      setAiringToday(await getAiringTodayTV());
      setOnTheAir(await getOnTheAirTV());
      setPopularTV(await getPopularTV());
      setTopRatedTV(await getTopRatedTV());
      setDiscoverTV(await getDiscoverTV());
    };

    fetchTVShows();
  }, []);

  return (
    <div className="mx-auto max-w-screen-2xl px-6 py-8">
      <HeroBanner items={popularTV} />

      <div className="mt-12 space-y-14">
        <Row title="Discover" icon="discover" items={discoverTV} />

        <Row title="Popular TV Shows" icon="tv" items={popularTV} />

        <Row title="Airing Today" icon="airing" items={airingToday} />

        <Row title="On The Air" icon="broadcast" items={onTheAir} />

        <Row title="Top Rated TV Shows" icon="star" items={topRatedTV} />
      </div>
    </div>
  );
};

export default TVShows;
