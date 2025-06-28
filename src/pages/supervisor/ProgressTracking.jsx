
import React, { useState } from 'react';

const ProgressTracking = () => {
  const [progress, setProgress] = useState({
    overall: 65,
    phases: [
      { name: 'Foundation', progress: 100, status: 'completed' },
      { name: 'Structure', progress: 100, status: 'completed' },
      { name: 'Electrical', progress: 75, status: 'in_progress' },
      { name: 'Plumbing', progress: 45, status: 'in_progress' },
      { name: 'Interior', progress: 20, status: 'in_progress' },
      { name: 'Finishing', progress: 0, status: 'pending' }
    ]
  });

  return (
    <div className="progress-tracking">
      <h1>Progress Tracking</h1>
      
      <div className="overall-progress">
        <h2>Overall Project Progress</h2>
        <div className="progress-section">
          <div className="progress-bar large">
            <div className="progress-fill" style={{width: `${progress.overall}%`}}></div>
          </div>
          <span className="progress-text">{progress.overall}% Complete</span>
        </div>
      </div>

      <div className="phases-progress">
        <h2>Phase Progress</h2>
        {progress.phases.map((phase, index) => (
          <div key={index} className="phase-item">
            <div className="phase-header">
              <span className="phase-name">{phase.name}</span>
              <span className="phase-percentage">{phase.progress}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: `${phase.progress}%`}}></div>
            </div>
            <span className="phase-status">{phase.status.replace('_', ' ').toUpperCase()}</span>
          </div>
        ))}
      </div>

      <div className="update-section">
        <h2>Update Progress</h2>
        <button className="btn-primary">Add Progress Update</button>
        <button className="btn-secondary">Upload Photos</button>
      </div>
    </div>
  );
};

export default ProgressTracking;
