import { Navigate, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { useStore } from '../store/useStore'
import { HomePage } from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import { ProfilePage } from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import { Navigation } from "../components/Navigation";
import WorkshopPage from "../pages/WorkshopPage";
import ProfessorPage from "../pages/ProfessorPage";

const Routes = () => {

  const { isAuthenticated } = useStore();


  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: (
        <>
          <Navigation />
          <Outlet />
        </>
      ),
      children: [
        { path: "/home", element: <HomePage /> },
        { path: "/profile", element: <ProfilePage /> },
        { path: "/professor", element: <ProfessorPage /> },
        { path: "/workshop", element: <WorkshopPage /> },
        { path: "/", element: <Navigate to="/home" /> }
      ]
    }
  ];



  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    { path: "/", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> }
  ];



  // Define public routes accessible to all users
  const routesForPublic = [
    { path: "/about", element: <div>About Us</div> },
    { path: "*", element: <Navigate to={isAuthenticated ? "/home" : "/"} /> }
  ];



  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...(isAuthenticated ? routesForAuthenticatedOnly : routesForNotAuthenticatedOnly),
    ...routesForPublic
  ]);



  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
