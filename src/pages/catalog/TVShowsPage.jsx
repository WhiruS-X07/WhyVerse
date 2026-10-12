import CatalogPage from "../../components/catalog/CatalogPage";
import { getDiscoverTV, getNostalgicTV, getTVShows, getUpcomingTV } from "../../services/tmdb/tvShows";
import { getTrending } from "../../services/tmdb/trending";

const TV_SECTIONS = [
  { key: "upcoming", title: "Coming Soon", icon: "upcoming", type: "tv", category: "upcoming", load: () => getUpcomingTV() },
  { key: "airing-today", title: "New Episodes Today", icon: "airing", type: "tv", category: "airing_today", load: () => getTVShows("airing_today") },
  { key: "nostalgic", title: "Series Worth Revisiting", icon: "discover", type: "tv", category: "nostalgic", load: () => getNostalgicTV() },
  { key: "on-the-air", title: "Currently On Air", icon: "broadcast", type: "tv", category: "on_the_air", load: () => getTVShows("on_the_air") },
  { key: "trending", title: "Trending This Week", icon: "popular", type: "tv", category: "trending", load: () => getTrending("tv") },
  { key: "popular", title: "Popular Series", icon: "tv", type: "tv", category: "popular", load: () => getTVShows("popular") },
  { key: "top-rated", title: "All-Time Favorites", icon: "star", type: "tv", category: "top_rated", load: () => getTVShows("top_rated") },
  { key: "discover", title: "More to Discover", icon: "discover", type: "tv", category: "discover", load: () => getDiscoverTV() },
];

const TVShows = () => (
  <CatalogPage
    eyebrow="The series collection"
    title="Stories worth staying in for."
    description="See what’s coming soon, catch today’s episodes, revisit unforgettable series, and find your next long-running favorite."
    sections={TV_SECTIONS}
  />
);

export default TVShows;
