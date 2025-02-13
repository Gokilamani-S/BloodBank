import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const AuthLayout = () => {
  const { user } = useAuthStore();

  // Redirect logged-in users to the correct dashboard
  if (user?.role) {
    const dashboardRoute =
      user.role === "admin"
        ? "/admin-dashboard"
        : user.role === "manager"
        ? "/manager-dashboard"
        : user.role === "donor"
        ? "/donor-dashboard"
        : "/login"; // Default fallback

    return <Navigate to={dashboardRoute} replace />;
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
