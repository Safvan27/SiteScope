
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import { AdminDashboard } from './pages/admin';
import { SupervisorDashboard } from './pages/supervisor';
import { ClientDashboard } from './pages/client';
import { USER_ROLES } from './types';
import './App.css';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }
  
  // Redirect to appropriate dashboard based on role
  const getDashboardRoute = () => {
    switch (user.role) {
      case USER_ROLES.ADMIN:
        return '/admin/dashboard';
      case USER_ROLES.SUPERVISOR:
        return '/supervisor/dashboard';
      case USER_ROLES.CLIENT:
        return '/client/dashboard';
      default:
        return '/login';
    }
  };
  
  return (
    <Routes>
      <Route path="/" element={<Navigate to={getDashboardRoute()} replace />} />
      
      {/* Admin Routes */}
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Supervisor Routes */}
      <Route 
        path="/supervisor/dashboard" 
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.SUPERVISOR]}>
            <SupervisorDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Client Routes */}
      <Route 
        path="/client/dashboard" 
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.CLIENT]}>
            <ClientDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
      <Route path="*" element={<Navigate to={getDashboardRoute()} replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
