
import React from 'react';

const SiteOverview = ({ sites }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#28a745';
      case 'in_progress': return '#007bff';
      case 'on_hold': return '#ffc107';
      case 'not_started': return '#6c757d';
      default: return '#6c757d';
    }
  };

  return (
    <div className="site-overview">
      <div className="sites-grid">
        {sites.map(site => (
          <div key={site.id} className="site-card">
            <div className="site-header">
              <h3>{site.name}</h3>
              <span 
                className="status-badge"
                style={{ backgroundColor: getStatusColor(site.status) }}
              >
                {site.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <div className="site-details">
              <p><strong>Location:</strong> {site.location}</p>
              <p><strong>Supervisor:</strong> {site.supervisor}</p>
              <p><strong>Client:</strong> {site.client}</p>
              <p><strong>Progress:</strong> {site.progress}%</p>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${site.progress}%` }}
                ></div>
              </div>
              <p><strong>Timeline:</strong> {site.startDate} - {site.endDate}</p>
            </div>
            <div className="site-actions">
              <button className="btn-primary">View Details</button>
              <button className="btn-secondary">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SiteOverview;
