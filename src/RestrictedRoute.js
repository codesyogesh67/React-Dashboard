import React from "react";
import { Route, Navigate } from "react-router-dom";

const RestrictedRoute = ({ ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return <Navigate to="/" />;
      }}
    />
  );
};

export default RestrictedRoute;
