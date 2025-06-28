
import React from 'react';
import { useAuth } from '../../context/AuthContext';

const SupervisorDashboard = () => {
  const { user, logout } = useAuth();
  
  return (
    <div className="supervisor-dashboard">
      <header className="dashboard-header">
        <h1>Supervisor Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user.name}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </header>
      
      <div className="dashboard-content">
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Active Projects</h3>
            <div className="card-content">
              <div className="stat-number">3</div>
              <p>Projects in progress</p>
            </div>
          </div>
          
          <div className="dashboard-card">
            <h3>Tasks Today</h3>
            <div className="card-content">
              <div className="stat-number">12</div>
              <p>Tasks to complete</p>
            </div>
          </div>
          
          <div className="dashboard-card">
            <h3>Progress Updates</h3>
            <div className="card-content">
              <div className="stat-number">5</div>
              <p>Updates pending</p>
            </div>
          </div>
          
          <div className="dashboard-card">
            <h3>Photos Uploaded</h3>
            <div className="card-content">
              <div className="stat-number">28</div>
              <p>This week</p>
            </div>
          </div>
        </div>
        
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button className="action-btn">Update Progress</button>
            <button className="action-btn">Upload Photos</button>
            <button className="action-btn">Manage Tasks</button>
            <button className="action-btn">Submit Report</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupervisorDashboard;
