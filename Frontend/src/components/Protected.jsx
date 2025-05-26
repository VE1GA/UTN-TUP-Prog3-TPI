import React from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router";

export const Protected = (isLoggedIn, children) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
