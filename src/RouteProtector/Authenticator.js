import { Navigate } from "react-router-dom";

const Authenticator = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    console.log('navigating to login page')
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};
export default Authenticator