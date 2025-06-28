
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const SupervisorDashboard = () => {
  const { user, logout } = useAuth();
  const [status, setStatus] = useState('active');
  
  return (
    <div className="supervisor-dashboard">
      <header className="dashboard-header">
        <h1>Supervisor Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user.name}</span>
          <div className="status-toggle">
            <span style={{ color: '#3E362E', fontWeight: '500' }}>Status:</span>
            <button 
              className={`status-indicator ${status}`}
              onClick={() => {
                const statuses = ['active', 'away', 'offline'];
                const currentIndex = statuses.indexOf(status);
                const nextIndex = (currentIndex + 1) % statuses.length;
                setStatus(statuses[nextIndex]);
              }}
            >
              <div className="status-dot"></div>
              {status === 'active' ? 'Active' : status === 'away' ? 'Away' : 'Offline'}
            </button>
          </div>
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
