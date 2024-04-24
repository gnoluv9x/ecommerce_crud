import { getUserInfos, isAuthenticated } from "./util";
import { Navigate } from "react-router-dom";

const PrivateRoute = props => {
  if (isAuthenticated() && getUserInfos()?.user?.permission === 0) {
    return props.children;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
