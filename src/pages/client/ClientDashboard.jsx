
import React from 'react';
import { useAuth } from '../../context/AuthContext';

const ClientDashboard = () => {
  const { user, logout } = useAuth();
  
  return (
    <div className="client-dashboard">
      <header className="dashboard-header">
        <h1>Client Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user.name}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </header>
      
      <div className="dashboard-content">
        <div className="project-overview">
          <h3>Your Construction Project</h3>
          <div className="project-card">
            <h4>Downtown Office Complex</h4>
            <div className="progress-section">
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '65%'}}></div>
              </div>
              <span className="progress-text">65% Complete</span>
            </div>
            <div className="project-details">
              <p><strong>Supervisor:</strong> John Smith</p>
              <p><strong>Start Date:</strong> January 15, 2024</p>
              <p><strong>Expected Completion:</strong> June 30, 2024</p>
            </div>
          </div>
        </div>
        
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Recent Updates</h3>
            <div className="card-content">
              <div className="stat-number">3</div>
              <p>New updates this week</p>
            </div>
          </div>
          
          <div className="dashboard-card">
            <h3>Photos</h3>
            <div className="card-content">
              <div className="stat-number">45</div>
              <p>Total progress photos</p>
            </div>
          </div>
          
          <div className="dashboard-card">
            <h3>Timeline</h3>
            <div className="card-content">
              <div className="stat-number">On Track</div>
              <p>Project status</p>
            </div>
          </div>
        </div>
        
        <div className="quick-actions">
          <h3>Quick Access</h3>
          <div className="action-buttons">
            <button className="action-btn">View Progress</button>
            <button className="action-btn">Photo Gallery</button>
            <button className="action-btn">Timeline</button>
            <button className="action-btn">Contact Supervisor</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
