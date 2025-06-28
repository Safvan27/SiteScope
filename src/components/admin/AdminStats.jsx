
import React from 'react';

const AdminStats = ({ stats }) => {
  return (
    <div className="admin-stats">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.totalSites}</h3>
          <p>Total Sites</p>
        </div>
        <div className="stat-card">
          <h3>{stats.activeSites}</h3>
          <p>Active Sites</p>
        </div>
        <div className="stat-card">
          <h3>{stats.completedSites}</h3>
          <p>Completed Sites</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalUsers}</h3>
          <p>Total Users</p>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
