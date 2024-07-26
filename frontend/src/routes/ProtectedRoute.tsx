import { Navigate, Outlet } from "react-router-dom";
import { useStore } from '../store/useStore'
import { Navigation } from '../components/Navigation';

export const ProtectedRoute = () => {

  const isAuthenticated: boolean = useStore(({ isAuthenticated }) => isAuthenticated);

  if (!isAuthenticated)
    return <Navigate to="/login" />;
  else
    return (
      <>
        <Navigation />
        <Outlet />
      </>
    )
};

