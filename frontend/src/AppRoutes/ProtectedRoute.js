import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, isAuthenticated }) => {
  if (isAuthenticated) {
    return element;
  }
  return <Navigate to={`/signin`} />;
};

export default ProtectedRoute;
