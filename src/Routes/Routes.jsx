import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home";
import ErrorPage from "../Pages/ErroPage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import AddArtwork from "../Pages/AddArtwork";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage></ErrorPage>,
   
    children: [
      { path: "/", element: <Home /> },
      {path: "login", element:<LoginPage></LoginPage>},
      {path:"register", element: <RegisterPage></RegisterPage>},
      {path: "add-art", element: <AddArtwork></AddArtwork>}
    ],
  },
]);

export default router;