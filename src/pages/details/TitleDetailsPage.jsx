import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DetailHero from "../../components/details/DetailHero";
import { DetailFacts, DetailProduction, DetailStory } from "../../components/details/DetailSections";
import DetailSidebar, { ProductionStudios } from "../../components/details/DetailCredits";
import DetailAdditional from "../../components/details/DetailExtras";
import DetailRelated from "../../components/details/RelatedTitles";
import DetailReviews from "../../components/details/DetailReviews";
import TrailerModal from "../../components/details/TrailerModal";
import TVSeasons from "../../components/details/TVSeasonsAccordion";
import { getMovieDetails, getTVDetails } from "../../services/tmdb/titleDetails";

const Details = () => {
  const { type, id } = useParams();
  const [data, setData] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let active = true;

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      setData(null);
      setTrailer(null);

      try {
        if (type !== "movie" && type !== "tv") {
          throw new Error("Invalid media type.");
        }

        const details =
          type === "movie" ? await getMovieDetails(id) : await getTVDetails(id);
        if (active) setData(details);
      } catch {
        if (active) setError("Could not load this title's details.");
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchDetails();
    return () => {
      active = false;
    };
  }, [id, type, retryKey]);

  if (loading) {
    return (
      <div
        className="flex min-h-[60vh] items-center justify-center text-white"
        role="status"
        aria-live="polite"
      >
        <span className="mr-3 h-8 w-8 animate-spin rounded-full border-4 border-[#EF5D12] border-t-transparent" />
        Loading title details…
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center text-white">
        <h1 className="text-2xl font-bold">Title details unavailable</h1>
        <p className="text-zinc-400">
          {error || "We couldn't find this title."}
        </p>
        <button
          type="button"
          onClick={() => setRetryKey((key) => key + 1)}
          className="rounded-lg bg-[#EF5D12] px-5 py-3 font-semibold text-white transition hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-clip bg-black text-white">
      <DetailHero data={data} mediaType={type} onTrailerOpen={setTrailer} />

      <section className="mx-auto w-full max-w-[1480px] px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <div className="min-w-0 space-y-12 sm:space-y-16">
          <div className="grid min-w-0 gap-x-10 gap-y-12 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-14">
            <DetailStory data={data} />
            <ProductionStudios data={data} />
            <DetailFacts data={data} type={type} />
            <DetailProduction data={data} type={type} />
          </div>
          <DetailSidebar data={data} />
          {type === "tv" && <TVSeasons data={data} />}
          <DetailAdditional data={data} type={type} />
          <DetailRelated data={data} type={type} />
          <DetailReviews />
        </div>
      </section>

      <TrailerModal trailer={trailer} onClose={() => setTrailer(null)} />
    </div>
  );
};

export default Details;
