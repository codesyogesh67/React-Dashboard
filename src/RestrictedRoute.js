import React from "react";
import { Route, Redirect } from "react-router-dom";

const RestrictedRoute = ({ ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return <Redirect to="/" />;
      }}
    />
  );
};

export default RestrictedRoute;
