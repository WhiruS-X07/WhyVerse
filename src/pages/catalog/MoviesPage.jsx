import CatalogPage from "../../components/catalog/CatalogPage";
import { getMovies, getDiscoverMovies, getNostalgicMovies } from "../../services/tmdb/movies";
import { getTrending } from "../../services/tmdb/trending";

const MOVIE_SECTIONS = [
  { key: "upcoming", title: "Coming Soon", icon: "upcoming", type: "movie", category: "upcoming", load: () => getMovies("upcoming") },
  { key: "now-playing", title: "New Releases in Theaters", icon: "play", type: "movie", category: "now_playing", load: () => getMovies("now_playing") },
  { key: "nostalgic", title: "Throwback Favorites", icon: "discover", type: "movie", category: "nostalgic", load: () => getNostalgicMovies() },
  { key: "trending", title: "Trending This Week", icon: "popular", type: "movie", category: "trending", load: () => getTrending("movie") },
  { key: "popular", title: "Popular Movies", icon: "popular", type: "movie", category: "popular", load: () => getMovies("popular") },
  { key: "top-rated", title: "All-Time Favorites", icon: "star", type: "movie", category: "top_rated", load: () => getMovies("top_rated") },
  { key: "discover", title: "More to Discover", icon: "discover", type: "movie", category: "discover", load: () => getDiscoverMovies() },
];

const Movies = () => (
  <CatalogPage
    eyebrow="The movie collection"
    title="Movies for every mood."
    description="Find what’s coming next, catch the latest releases, revisit the classics, and see what everyone is watching."
    sections={MOVIE_SECTIONS}
  />
);

export default Movies;
