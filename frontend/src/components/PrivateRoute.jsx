import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children, role }) {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  if (!token || !userStr) return <Navigate to="/login" />;
  const user = JSON.parse(userStr);
  if (role && user.role !== role) return <Navigate to="/login" />;
  return children;
}
