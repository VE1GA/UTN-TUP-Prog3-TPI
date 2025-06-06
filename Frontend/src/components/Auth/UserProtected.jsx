import { Navigate } from "react-router";

const UserProtected = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/iniciar_sesion" replace />;
  }
  return children;
};

export default UserProtected;
