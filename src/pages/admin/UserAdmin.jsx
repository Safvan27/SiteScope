import React, { useState } from 'react';
import DashboardHeader from '../../components/common/DashboardHeader';

const UserAdmin = () => {
  const [users] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      role: 'supervisor',
      status: 'active',
      sites: ['Downtown Office Complex']
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane@example.com',
      role: 'supervisor',
      status: 'active',
      sites: ['Residential Tower']
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'client',
      status: 'active',
      sites: ['Downtown Office Complex']
    }
  ]);

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return '#dc3545';
      case 'supervisor': return '#007bff';
      case 'client': return '#28a745';
      default: return '#6c757d';
    }
  };

  return (
    <div className="admin-dashboard">
      <DashboardHeader title="User Administration" />
      <div className="dashboard-content">

      <div className="users-grid">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <div className="user-header">
              <h3>{user.name}</h3>
              <span 
                className="role-badge"
                style={{ backgroundColor: getRoleColor(user.role) }}
              >
                {user.role.toUpperCase()}
              </span>
            </div>
            <div className="user-details">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Status:</strong> {user.status}</p>
              <p><strong>Sites:</strong> {user.sites.join(', ')}</p>
            </div>
            <div className="user-actions">
              <button className="btn-secondary">Edit</button>
              <button className="btn-danger">Deactivate</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default UserAdmin;