
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PhotoUploadComponent from '../../components/supervisor/PhotoUploadComponent';

const PhotoManagement = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upload');

  // Mock photo gallery data
  const mockPhotos = [
    { id: 1, name: 'Foundation_Progress_01.jpg', date: '2024-01-15', category: 'progress', size: '2.4 MB' },
    { id: 2, name: 'Steel_Framework_02.jpg', date: '2024-01-16', category: 'progress', size: '3.1 MB' },
    { id: 3, name: 'Safety_Check_01.jpg', date: '2024-01-17', category: 'safety', size: '1.8 MB' },
    { id: 4, name: 'Materials_Delivery.jpg', date: '2024-01-18', category: 'materials', size: '2.9 MB' },
    { id: 5, name: 'Quality_Inspection.jpg', date: '2024-01-19', category: 'quality', size: '2.2 MB' },
  ];

  return (
    <div className="supervisor-dashboard">
      <header className="dashboard-header">
        <h1>Photo Management</h1>
        <div className="user-info">
          <span>Welcome, {user.name}</span>
          <button onClick={() => navigate('/supervisor/dashboard')} className="back-btn">Back to Dashboard</button>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </header>
      
      <div className="dashboard-content">
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            Upload Photos
          </button>
          <button 
            className={`tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            Photo Gallery
          </button>
        </div>

        {activeTab === 'upload' && (
          <div className="tab-content">
            <PhotoUploadComponent />
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="tab-content">
            <div className="photo-gallery">
              <h3>Uploaded Photos</h3>
              <div className="photo-grid">
                {mockPhotos.map(photo => (
                  <div key={photo.id} className="photo-card">
                    <div className="photo-placeholder">
                      <span>📷</span>
                    </div>
                    <div className="photo-info">
                      <h4>{photo.name}</h4>
                      <p>Category: {photo.category}</p>
                      <p>Date: {photo.date}</p>
                      <p>Size: {photo.size}</p>
                      <div className="photo-actions">
                        <button className="view-btn">View</button>
                        <button className="delete-btn">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoManagement;
