import React, { useState } from 'react';
import { SiteManager, SiteForm } from '../../components/admin';

const SiteManagement = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [sites, setSites] = useState([
    {
      id: 1,
      name: 'Downtown Office Complex',
      location: 'New York, NY',
      status: 'in_progress',
      supervisor: 'John Smith',
      client: 'ABC Corp',
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      budget: 2500000
    },
    {
      id: 2,
      name: 'Residential Tower',
      location: 'Los Angeles, CA',
      status: 'in_progress',
      supervisor: 'Jane Doe',
      client: 'XYZ Developers',
      startDate: '2024-02-01',
      endDate: '2024-08-15',
      budget: 5000000
    }
  ]);

  const handleCreateSite = (siteData) => {
    const newSite = {
      ...siteData,
      id: sites.length + 1
    };
    setSites([...sites, newSite]);
    setShowCreateForm(false);
  };

  const handleDeleteSite = (siteId) => {
    setSites(sites.filter(site => site.id !== siteId));
  };

  return (
    <div className="admin-dashboard">
      <DashboardHeader title="Site Management" />
      <div className="dashboard-content">
      <div className="page-header">
        <h1>Site Management</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowCreateForm(true)}
        >
          Create New Site
        </button>
      </div>

      {showCreateForm && (
        <div className="modal-overlay">
          <div className="modal">
            <SiteForm 
              onSubmit={handleCreateSite}
              onCancel={() => setShowCreateForm(false)}
            />
          </div>
        </div>
      )}

      <SiteManager 
        sites={sites}
        onDeleteSite={handleDeleteSite}
      />
       </div>
    </div>
  );
};

export default SiteManagement;