import React from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "./features/userSlice";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(selectUserInfo);
  return (
    <Route
      {...rest}
      render={(props) =>
        user?.role === "Manager" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
