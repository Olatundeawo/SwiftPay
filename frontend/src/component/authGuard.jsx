import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      return (
        <Navigate
          to="/login"
          replace
          state={{ message: "Session expired. Please log in again." }}
        />
      );
    }

    useEffect(() => {
      const timeout = setTimeout(() => {
        localStorage.removeItem("token");
        navigate("/login", {
          replace: true,
          state: { message: "Session expired. Please log in again." },
        });
      }, (decoded.exp - currentTime) * 1000);

      return () => clearTimeout(timeout);
    }, [decoded.exp, currentTime, navigate]);

    return children;
  } catch (err) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
