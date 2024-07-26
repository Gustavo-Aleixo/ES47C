import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useStore } from '../store/useStore'
import { ProtectedRoute } from "./ProtectedRoute";
import { HomePage } from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import { ProfilePage } from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";

const Routes = () => {
  const { isAuthenticated } = useStore();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/about-us",
      element: <div>About Us</div>,
    }
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: < ProtectedRoute />,
      children: [
        {
          path: "/home",
          element: <HomePage />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        }
      ]
    }
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    }
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!isAuthenticated ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
