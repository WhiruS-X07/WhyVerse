import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./layout/Layout";
import {
  Home,
  Movies,
  TVShows,
  People,
  Details,
  PersonDetails,
  View,
} from "./pages/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "movies",
        element: <Movies />,
      },
      {
        path: "tvshows",
        element: <TVShows />,
      },
      {
        path: "people",
        element: <People />,
      },
      {
        path: "details/:type/:id",
        element: <Details />,
      },
      {
        path: "person/:id",
        element: <PersonDetails />,
      },
      {
        path: "view/:type/:category",
        element: <View />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
