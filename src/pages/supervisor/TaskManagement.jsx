
import React, { useState } from 'react';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Install Electrical Wiring',
      status: 'in_progress',
      assignee: 'Mike Johnson',
      dueDate: '2024-04-15',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Plumbing Installation',
      status: 'pending',
      assignee: 'Sarah Wilson',
      dueDate: '2024-04-20',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Drywall Installation',
      status: 'completed',
      assignee: 'Tom Brown',
      dueDate: '2024-04-10',
      priority: 'low'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#28a745';
      case 'in_progress': return '#007bff';
      case 'pending': return '#ffc107';
      case 'blocked': return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <div className="task-management">
      <div className="page-header">
        <h1>Task Management</h1>
        <button className="btn-primary">Add New Task</button>
      </div>
      
      <div className="tasks-list">
        {tasks.map(task => (
          <div key={task.id} className="task-item">
            <div className="task-header">
              <h3>{task.title}</h3>
              <span 
                className="status-badge"
                style={{ backgroundColor: getStatusColor(task.status) }}
              >
                {task.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <div className="task-details">
              <p><strong>Assignee:</strong> {task.assignee}</p>
              <p><strong>Due Date:</strong> {task.dueDate}</p>
              <p><strong>Priority:</strong> {task.priority}</p>
            </div>
            <div className="task-actions">
              <button className="btn-secondary">Edit</button>
              <button className="btn-primary">Update Status</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManagement;
