
import React, { useState } from 'react';

const PhotoManagement = () => {
  const [photos] = useState([
    {
      id: 1,
      url: 'https://via.placeholder.com/300x200/667eea/white?text=Foundation',
      title: 'Foundation Complete',
      date: '2024-02-01',
      phase: 'Foundation'
    },
    {
      id: 2,
      url: 'https://via.placeholder.com/300x200/764ba2/white?text=Structure',
      title: 'Steel Framework',
      date: '2024-03-15',
      phase: 'Structure'
    }
  ]);

  return (
    <div className="photo-management">
      <div className="page-header">
        <h1>Photo Management</h1>
        <button className="btn-primary">Upload New Photos</button>
      </div>

      <div className="photo-grid">
        {photos.map(photo => (
          <div key={photo.id} className="photo-card">
            <img src={photo.url} alt={photo.title} />
            <div className="photo-details">
              <h3>{photo.title}</h3>
              <p><strong>Phase:</strong> {photo.phase}</p>
              <p><strong>Date:</strong> {photo.date}</p>
              <div className="photo-actions">
                <button className="btn-secondary">Edit</button>
                <button className="btn-danger">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoManagement;
