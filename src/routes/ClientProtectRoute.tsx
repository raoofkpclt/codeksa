import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const ClientProtectedRoute = ({ children }: Props) => {
  const token = localStorage.getItem("clientToken");
const role = localStorage.getItem("role");

if (!token) {
  return <Navigate to="/client/login" replace />;
}

if (role !== "client") {
  return <Navigate to="/admin/login" replace />;
}

return <>{children}</>;
};

export default ClientProtectedRoute;