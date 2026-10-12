import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import PersonFilmography from "../../components/people/PersonFilmography";
import PersonProfileHero from "../../components/people/PersonProfileHero";
import { getPeopleDetails } from "../../services/tmdb/people";

const PersonDetails = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let active = true;
    const fetchPerson = async () => {
      setLoading(true);
      setError(null);
      setPerson(null);
      try {
        const data = await getPeopleDetails(id);
        if (active) setPerson(data);
      } catch {
        if (active) setError("Could not load this person's profile.");
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchPerson();
    return () => { active = false; };
  }, [id, retryKey]);

  const careerCounts = useMemo(() => {
    const all = [
      ...(person?.combined_credits?.cast ?? []),
      ...(person?.combined_credits?.crew ?? []),
    ];
    const uniqueCredits = new Map();
    all.forEach((credit) => {
      const mediaType = credit.media_type || (credit.title ? "movie" : "tv");
      uniqueCredits.set(`${mediaType}-${credit.id}`, mediaType);
    });
    const mediaTypes = [...uniqueCredits.values()];
    return {
      total: mediaTypes.length,
      movies: mediaTypes.filter((mediaType) => mediaType === "movie").length,
      tv: mediaTypes.filter((mediaType) => mediaType === "tv").length,
    };
  }, [person]);

  if (loading) {
    return <div className="flex min-h-[60vh] items-center justify-center bg-black text-white" role="status" aria-live="polite"><span className="mr-3 h-8 w-8 animate-spin rounded-full border-4 border-[#EF5D12] border-t-transparent" />Loading person profile…</div>;
  }

  if (error || !person) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-black px-4 text-center text-white">
        <h1 className="text-2xl font-bold">Person profile unavailable</h1>
        <p className="text-zinc-400">{error || "We couldn't find this person."}</p>
        <button type="button" onClick={() => setRetryKey((key) => key + 1)} className="rounded-full bg-[#EF5D12] px-5 py-3 font-semibold text-white transition hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300">Try again</button>
      </div>
    );
  }

  return (
    <main className="min-h-screen min-w-0 bg-black px-4 py-6 text-white sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-[1720px]">
        <PersonProfileHero person={person} movieCount={careerCounts.movies} tvCount={careerCounts.tv} creditCount={careerCounts.total} />
        <PersonFilmography person={person} />
      </div>
    </main>
  );
};

export default PersonDetails;
