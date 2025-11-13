import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home";
import ErrorPage from "../Pages/ErroPage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import AddArtwork from "../Pages/AddArtwork";
import ExploreArtworks from "../Pages/ExploreArtworks";
import PrivateRoute from "../Components/PrivateRoute";
import ArtworkDetails from "../Pages/ArtworkDetails";
import MyArtwork from "../Pages/MyArtwork";
import MyFavorites from "../Pages/MyFavorites";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />, 

    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch("https://artverse-server.vercel.app/latest-arts"),
      },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        path: "add-art",
        element: (
          <PrivateRoute>
            <AddArtwork />
          </PrivateRoute>
        ),
      },
      {
        path: "all-art",
        element: <ExploreArtworks />,
        loader: () => fetch("https://artverse-server.vercel.app/all-arts"),
      },
      {
        path: "all-arts/:id",
        element: (
          <PrivateRoute>
            <ArtworkDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "myart",
        element: (
          <PrivateRoute>
            <MyArtwork />
          </PrivateRoute>
        ),
      },
      {
        path: "my-favorites",
        element: (
          <PrivateRoute>
            <MyFavorites />
          </PrivateRoute>
        ),
      },

      
      // { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;
