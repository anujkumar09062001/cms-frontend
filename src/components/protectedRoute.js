import { Navigate } from "react-router-dom";
import auth from "./services/authService";

const ProtectedRoute = ({ children }) => {
  const token = auth.getAuthToken();
  if (!token) return (
    <Navigate to='/login/' replace />
  )
  return children;
}

export default ProtectedRoute;