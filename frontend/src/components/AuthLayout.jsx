import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const AuthLayout = () => {
  const { user } = useAuthStore();

  // Redirect to donor dashboard only if email and password exist
  if (user?.email && user?.password) {
    return <Navigate to="/donor-dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Outlet /> {/* Renders Login/Signup pages */}
      </div>
    </div>
  );
};

export default AuthLayout;
