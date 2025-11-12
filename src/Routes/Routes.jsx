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

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage></ErrorPage>,
   
    children: [
      { path: "/", element: <Home />,loader: ()=>fetch('http://localhost:3000/latest-arts') },
      {path: "login", element:<LoginPage></LoginPage>},
      {path:"register", element: <RegisterPage></RegisterPage>},
      {path: "add-art", element: <PrivateRoute><AddArtwork></AddArtwork></PrivateRoute>},
      {path: "all-arts", element: <PrivateRoute><ExploreArtworks></ExploreArtworks></PrivateRoute>,
        loader: ()=> fetch('http://localhost:3000/all-arts')
      },
      {path: '/all-arts/:id', element: <PrivateRoute><ArtworkDetails></ArtworkDetails></PrivateRoute>},
      {path: 'myart', element: <PrivateRoute><MyArtwork></MyArtwork></PrivateRoute>
      }
    ],
  },
]);

export default router;