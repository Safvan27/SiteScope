
import React from 'react';

const SiteManager = ({ sites, onDeleteSite }) => {
  return (
    <div className="site-manager">
      <div className="sites-table">
        <table>
          <thead>
            <tr>
              <th>Site Name</th>
              <th>Location</th>
              <th>Status</th>
              <th>Supervisor</th>
              <th>Client</th>
              <th>Budget</th>
              <th>Timeline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sites.map(site => (
              <tr key={site.id}>
                <td>{site.name}</td>
                <td>{site.location}</td>
                <td>
                  <span className={`status ${site.status}`}>
                    {site.status.replace('_', ' ')}
                  </span>
                </td>
                <td>{site.supervisor}</td>
                <td>{site.client}</td>
                <td>${site.budget?.toLocaleString()}</td>
                <td>{site.startDate} - {site.endDate}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-edit">Edit</button>
                    <button className="btn-view">View</button>
                    <button 
                      className="btn-delete"
                      onClick={() => onDeleteSite(site.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SiteManager;
