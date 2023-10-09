import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// will remove later
// import { useUserContext } from "../context/user_context";

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useAuth0();
  //second ... means spread the rest
  //react dom version :5
  // return (
  //   <Route
  //     {...rest}
  //     render={() => {
  //       return user ? children : <Redirect to="/"></Redirect>;
  //     }}
  //   ></Route>
  // );

  //react version 6:
  if (!user) {
    return <Navigate to="/"></Navigate>;
  }
  //如果chidlren存在，那么久return children
  return children;
};
export default PrivateRoute;
