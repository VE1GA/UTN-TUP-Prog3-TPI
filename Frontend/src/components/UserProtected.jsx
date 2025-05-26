import { Navigate } from "react-router";

const UserProtected = ({ isLoggedIn, children }) => {
  console.log(isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/iniciar_sesion" replace />;
  }
  return children;
};

export default UserProtected;
