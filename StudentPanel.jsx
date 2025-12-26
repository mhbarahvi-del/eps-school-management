import React from 'react';
import { UserPlus, List } from 'lucide-react';

function StudentPanel({ onNavigate }) {
  const cards = [
    {
      id: 'register',
      title: 'Register Student',
      icon: UserPlus,
      description: 'Add new student with complete registration details',
      color: '#667eea',
      bgGradient: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'list',
      title: 'Registration List',
      icon: List,
      description: 'View, edit, delete and manage all registered students',
      color: '#f093fb',
      bgGradient: 'from-purple-500 to-pink-600'
    }
  ];

  return (
    <div className="student-panel">
      <div className="panel-header">
        <h2>👨‍🎓 Student Management</h2>
        <p>Select an option to continue</p>
      </div>

      <div className="cards-grid">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="panel-card"
              onClick={() => onNavigate(card.id)}
              style={{ borderColor: card.color }}
            >
              <div 
                className={`card-icon-wrapper bg-gradient-to-br ${card.bgGradient}`}
              >
                <Icon className="card-icon" size={40} />
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <button 
                className="card-button"
                style={{ background: card.color }}
              >
                Open →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StudentPanel;
