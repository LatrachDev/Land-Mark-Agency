import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/404" replace />;
  // Outlet renders the child components nested inside this protected route, i.e., the protected page(s).
};

export default ProtectedRoute;
