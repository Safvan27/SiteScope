
import React, { useState, useEffect } from 'react';
import { SiteOverview, AdminStats } from '../../components/admin';

const AdminDashboard = () => {
  const [sites, setSites] = useState([]);
  const [stats, setStats] = useState({
    totalSites: 0,
    activeSites: 0,
    completedSites: 0,
    totalUsers: 0
  });

  useEffect(() => {
    // Mock data - replace with actual API calls
    setSites([
      {
        id: 1,
        name: 'Downtown Office Complex',
        location: 'New York, NY',
        status: 'in_progress',
        progress: 65,
        supervisor: 'John Smith',
        client: 'ABC Corp',
        startDate: '2024-01-15',
        endDate: '2024-06-30'
      },
      {
        id: 2,
        name: 'Residential Tower',
        location: 'Los Angeles, CA',
        status: 'in_progress',
        progress: 30,
        supervisor: 'Jane Doe',
        client: 'XYZ Developers',
        startDate: '2024-02-01',
        endDate: '2024-08-15'
      },
      {
        id: 3,
        name: 'Shopping Mall Renovation',
        location: 'Chicago, IL',
        status: 'completed',
        progress: 100,
        supervisor: 'Mike Johnson',
        client: 'Retail Holdings',
        startDate: '2023-09-01',
        endDate: '2024-01-31'
      }
    ]);

    setStats({
      totalSites: 3,
      activeSites: 2,
      completedSites: 1,
      totalUsers: 12
    });
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <AdminStats stats={stats} />
      <div className="sites-overview">
        <h2>Construction Sites Overview</h2>
        <SiteOverview sites={sites} />
      </div>
    </div>
  );
};

export default AdminDashboard;
