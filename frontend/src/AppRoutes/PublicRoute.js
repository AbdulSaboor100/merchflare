import React from "react";
import { Route, Navigate } from "react-router-dom";

const PublicRoute = ({ element, isNotAuthenticated }) => {
  if (isNotAuthenticated) {
    return <Navigate to={`/`} />;
  }
  return element;
};

export default PublicRoute;
