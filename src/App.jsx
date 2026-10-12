import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import AppLayout from "./layout/AppLayout";
import ExplorePage from "./pages/explore/ExplorePage";
import MoviesPage from "./pages/catalog/MoviesPage";
import TVShowsPage from "./pages/catalog/TVShowsPage";
import PeoplePage from "./pages/catalog/PeoplePage";
import CatalogViewPage from "./pages/catalog/CatalogViewPage";
import CollectionPage from "./pages/collection/CollectionPage";
import TitleDetailsPage from "./pages/details/TitleDetailsPage";
import PersonDetailsPage from "./pages/details/PersonDetailsPage";
import LoginPage from "./pages/auth/LoginPage";
import SearchPage from "./pages/search/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <ExplorePage />,
      },
      {
        path: "movies",
        element: <MoviesPage />,
      },
      {
        path: "tvshows",
        element: <TVShowsPage />,
      },
      {
        path: "people",
        element: <PeoplePage />,
      },
      {
        path: "collection",
        element: <CollectionPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "library",
        element: <Navigate to="/collection" replace />,
      },
      {
        path: "details/:type/:id",
        element: <TitleDetailsPage />,
      },
      {
        path: "person/:id",
        element: <PersonDetailsPage />,
      },
      {
        path: "view/:type/:category",
        element: <CatalogViewPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
