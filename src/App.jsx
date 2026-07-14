import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./layout/Layout";
import { Home, Anime, Movies, TVShows } from "./components/component";
function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path: "movies",
          element: <Movies />
        },
        {
          path: "anime",
          element: <Anime />
        },
        {
          path: "tvshows",
          element: <TVShows />
        }
      ]
    }
  ]);

  return (  
   <>
    <RouterProvider router={router} />
   </>
  )
}

export default App
