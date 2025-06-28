
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user.name}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </header>
      
      <div className="dashboard-content">
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Total Sites</h3>
            <div className="card-content">
              <div className="stat-number">15</div>
              <p>Construction sites</p>
            </div>
          </div>
          
          <div className="dashboard-card">
            <h3>Active Supervisors</h3>
            <div className="card-content">
              <div className="stat-number">8</div>
              <p>Currently working</p>
            </div>
          </div>
          
          <div className="dashboard-card">
            <h3>Total Clients</h3>
            <div className="card-content">
              <div className="stat-number">12</div>
              <p>Active projects</p>
            </div>
          </div>
          
          <div className="dashboard-card">
            <h3>Monthly Revenue</h3>
            <div className="card-content">
              <div className="stat-number">$250K</div>
              <p>This month</p>
            </div>
          </div>
        </div>
        
        <div className="quick-actions">
          <h3>Admin Actions</h3>
          <div className="action-buttons">
            <button className="action-btn" onClick={() => navigate('/admin/sites')}>Manage Sites</button>
            <button className="action-btn" onClick={() => navigate('/admin/users')}>User Management</button>
            <button className="action-btn" onClick={() => navigate('/admin/settings')}>System Settings</button>
            <button className="action-btn" onClick={() => navigate('/admin/reports')}>Reports</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
