
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { USER_ROLES } from '../../types';

const DashboardHeader = ({ title, showBackButton = true }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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

  const handleBackToDashboard = () => {
    navigate(getDashboardRoute());
  };

  return (
    <header className="dashboard-header">
      <div className="header-left">
        {showBackButton && (
          <button onClick={handleBackToDashboard} className="back-btn">
            ← Back to Dashboard
          </button>
        )}
        <h1>{title}</h1>
      </div>
      <div className="user-info">
        <span>Welcome, {user.name}</span>
        {user.role === USER_ROLES.SUPERVISOR && (
          <div className="status-toggle">
            <span style={{ color: '#3E362E', fontWeight: '500' }}>Status:</span>
            <select 
              defaultValue="active"
              className="status-select active"
            >
              <option value="active">🟢 Active</option>
              <option value="away">🟡 Away</option>
              <option value="offline">🔴 Offline</option>
            </select>
          </div>
        )}
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>
    </header>
  );
};

export default DashboardHeader;
