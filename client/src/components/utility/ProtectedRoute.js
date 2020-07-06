import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({
  component: Component,
  auth,
  ...rest
}) {
  console.log(auth);
  return auth ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    <Redirect to="/" />
  );
}
