
import React from 'react';
import { useAuth } from '../../context/AuthContext';

const ProjectProgress = () => {
  const { user } = useAuth();

  return (
    <div className="project-progress">
      <h1>Project Progress</h1>
      <div className="progress-content">
        <div className="project-details">
          <h2>Downtown Office Complex</h2>
          <div className="progress-overview">
            <div className="progress-section">
              <h3>Overall Progress</h3>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '65%'}}></div>
              </div>
              <span className="progress-text">65% Complete</span>
            </div>
            
            <div className="milestone-list">
              <h3>Project Milestones</h3>
              <div className="milestone completed">
                <span className="milestone-name">Foundation</span>
                <span className="milestone-status">✓ Completed</span>
              </div>
              <div className="milestone completed">
                <span className="milestone-name">Structure</span>
                <span className="milestone-status">✓ Completed</span>
              </div>
              <div className="milestone in-progress">
                <span className="milestone-name">Interior Work</span>
                <span className="milestone-status">🔄 In Progress</span>
              </div>
              <div className="milestone pending">
                <span className="milestone-name">Final Inspection</span>
                <span className="milestone-status">⏳ Pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectProgress;
