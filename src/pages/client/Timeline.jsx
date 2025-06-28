
import React from 'react';

const Timeline = () => {
  const timelineEvents = [
    {
      date: '2024-01-15',
      title: 'Project Started',
      description: 'Construction officially began',
      type: 'milestone'
    },
    {
      date: '2024-02-01',
      title: 'Foundation Complete',
      description: 'Foundation work finished ahead of schedule',
      type: 'completion'
    },
    {
      date: '2024-03-15',
      title: 'Structure Work Started',
      description: 'Beginning structural framework',
      type: 'start'
    },
    {
      date: '2024-04-10',
      title: 'Progress Update',
      description: 'Structure 80% complete',
      type: 'update'
    }
  ];

  return (
    <div className="timeline">
      <h1>Project Timeline</h1>
      <div className="timeline-content">
        {timelineEvents.map((event, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content-item">
              <div className="timeline-date">{event.date}</div>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
