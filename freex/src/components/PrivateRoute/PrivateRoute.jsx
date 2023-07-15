import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../Context/AuthContext";
import Loader from "../UI/Loader/Loader.jsx";

const PrivateRoute = () => {
  const { currentUser, isAuth } = useAuth();
  const location = useLocation();

  if (isAuth === null) {
    return <Loader isLoading={isAuth} />;
  }

  return (
    <>
      {currentUser ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default PrivateRoute;
