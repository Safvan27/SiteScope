import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import { AdminDashboard, UserAdmin, SystemSettings, SiteManagement } from './pages/admin';
import { SupervisorDashboard, TaskManagement, ProgressTracking, PhotoManagement, Reports } from './pages/supervisor';
import { ClientDashboard, ProjectProgress, Timeline, Gallery, Communications } from './pages/client';
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
      <Route 
        path="/admin/users" 
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
            <UserAdmin />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/settings" 
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
            <SystemSettings />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/sites" 
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
            <SiteManagement />
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
       <Route 
        path="/supervisor/tasks" 
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.SUPERVISOR]}>
            <TaskManagement />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/supervisor/progress" 
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.SUPERVISOR]}>
            <ProgressTracking />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/supervisor/photos" 
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.SUPERVISOR]}>
            <PhotoManagement />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/supervisor/reports" 
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.SUPERVISOR]}>
            <Reports />
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
      <Route 
        path="/client/projects" 
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.CLIENT]}>
            <ProjectProgress />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/client/timeline" 
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.CLIENT]}>
            <Timeline />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/client/gallery" 
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.CLIENT]}>
            <Gallery />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/client/communications" 
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.CLIENT]}>
            <Communications />
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