import { Navigate } from "react-router-dom";
import auth from "../services/authService";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = auth.getAuthToken();
  if (!token) return (
    <Navigate to='/login' replace />
  )
  return <Outlet />;
}

export default ProtectedRoute;