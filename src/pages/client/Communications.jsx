
import React, { useState } from 'react';

const Communications = () => {
  const [messages] = useState([
    {
      id: 1,
      from: 'John Smith (Supervisor)',
      subject: 'Weekly Progress Update',
      date: '2024-04-10',
      content: 'This week we completed the electrical rough-in and started on plumbing.',
      read: true
    },
    {
      id: 2,
      from: 'System',
      subject: 'Milestone Achieved',
      date: '2024-04-08',
      content: 'Congratulations! The structure phase has been completed.',
      read: false
    },
    {
      id: 3,
      from: 'John Smith (Supervisor)',
      subject: 'Weather Delay Notice',
      date: '2024-04-05',
      content: 'Due to heavy rain, outdoor work will be delayed by 2 days.',
      read: true
    }
  ]);

  return (
    <div className="communications">
      <h1>Communications</h1>
      <div className="messages-list">
        {messages.map(message => (
          <div key={message.id} className={`message-item ${!message.read ? 'unread' : ''}`}>
            <div className="message-header">
              <span className="message-from">{message.from}</span>
              <span className="message-date">{message.date}</span>
            </div>
            <h3 className="message-subject">{message.subject}</h3>
            <p className="message-content">{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Communications;
