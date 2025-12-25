import React from 'react';

function Sidebar({ isOpen, onToggle, currentModule, onNavigate }) {
  const menuItems = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'students', icon: '👨‍🎓', label: 'Students' },
    { id: 'employees', icon: '👨‍💼', label: 'Employees' },
    { id: 'attendance', icon: '📋', label: 'Attendance' },
    { id: 'fee', icon: '💰', label: 'Fee Management' },
    { id: 'exam', icon: '📝', label: 'Exams' },
    { id: 'reports', icon: '📊', label: 'Reports' },
    { id: 'settings', icon: '⚙️', label: 'Settings' }
  ];

  return (
    <>
      <button 
        className={`sidebar-toggle ${isOpen ? 'open' : ''}`}
        onClick={onToggle}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>🏫 EPS School</h2>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`sidebar-item ${currentModule === item.id ? 'active' : ''}`}
              onClick={() => {
                onNavigate(item.id);
                if (window.innerWidth <= 768) {
                  onToggle();
                }
              }}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p>Version 1.0</p>
          <p>© 2025 EPS School</p>
        </div>
      </div>

      {isOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={onToggle}
        />
      )}
    </>
  );
}

export default Sidebar;
