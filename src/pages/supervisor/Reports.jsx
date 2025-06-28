
import React from 'react';

const Reports = () => {
  const reports = [
    {
      id: 1,
      title: 'Weekly Progress Report',
      date: '2024-04-10',
      type: 'Weekly',
      status: 'Generated'
    },
    {
      id: 2,
      title: 'Monthly Summary',
      date: '2024-04-01',
      type: 'Monthly',
      status: 'Generated'
    },
    {
      id: 3,
      title: 'Safety Report',
      date: '2024-04-08',
      type: 'Safety',
      status: 'Generated'
    }
  ];

  return (
    <div className="reports">
      <div className="page-header">
        <h1>Reports</h1>
        <button className="btn-primary">Generate New Report</button>
      </div>

      <div className="reports-list">
        {reports.map(report => (
          <div key={report.id} className="report-item">
            <div className="report-info">
              <h3>{report.title}</h3>
              <p><strong>Type:</strong> {report.type}</p>
              <p><strong>Date:</strong> {report.date}</p>
              <p><strong>Status:</strong> {report.status}</p>
            </div>
            <div className="report-actions">
              <button className="btn-primary">Download</button>
              <button className="btn-secondary">View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
