import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const user = localStorage.getItem('user');

  return user ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
