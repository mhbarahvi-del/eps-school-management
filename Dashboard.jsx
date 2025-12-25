import React from 'react';

function Dashboard({ onNavigate }) {
  const modules = [
    {
      id: 'students',
      title: 'Student Management',
      icon: '👨‍🎓',
      description: 'Add, edit, view students',
      color: '#667eea'
    },
    {
      id: 'employees',
      title: 'Employee Management',
      icon: '👨‍💼',
      description: 'Manage staff and teachers',
      color: '#f093fb'
    },
    {
      id: 'attendance',
      title: 'Attendance',
      icon: '📋',
      description: 'Track daily attendance',
      color: '#4facfe'
    },
    {
      id: 'fee',
      title: 'Fee Management',
      icon: '💰',
      description: 'Manage fee collection',
      color: '#43e97b'
    },
    {
      id: 'exam',
      title: 'Exam Management',
      icon: '📝',
      description: 'Schedule and manage exams',
      color: '#fa709a'
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>🏫 School Management System</h1>
        <p>Select a module to get started</p>
      </div>
      
      <div className="module-grid">
        {modules.map((module) => (
          <div
            key={module.id}
            className="module-card"
            onClick={() => onNavigate(module.id)}
            style={{ borderColor: module.color }}
          >
            <div className="module-icon" style={{ background: module.color }}>
              {module.icon}
            </div>
            <h3>{module.title}</h3>
            <p>{module.description}</p>
            <button 
              className="module-btn"
              style={{ background: module.color }}
            >
              Open Module →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
