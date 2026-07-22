import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import { Home, People, Movies, TVShows, Details, PersonDetails } from "./pages/pages";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "movies",
          element: <Movies />,
        },
        {
          path: "people",
          element: <People />,
        },
        {
          path: "tvshows",
          element: <TVShows />,
        },
        {
          path: "details/:type/:id",
          element: <Details />,
        },
        {
          path: "person/:id",
          element: <PersonDetails />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
