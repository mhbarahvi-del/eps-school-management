import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import StudentModule from './StudentModule';
import './App.css';

function App() {
  const [currentModule, setCurrentModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderModule = () => {
    switch(currentModule) {
      case 'students':
        return <StudentModule onBack={() => setCurrentModule('dashboard')} />;
      case 'employees':
        return (
          <div className="coming-soon">
            <h2>👨‍💼 Employee Management</h2>
            <p>Coming Soon...</p>
          </div>
        );
      case 'attendance':
        return (
          <div className="coming-soon">
            <h2>📋 Attendance</h2>
            <p>Coming Soon...</p>
          </div>
        );
      case 'fee':
        return (
          <div className="coming-soon">
            <h2>💰 Fee Management</h2>
            <p>Coming Soon...</p>
          </div>
        );
      case 'exam':
        return (
          <div className="coming-soon">
            <h2>📝 Exam Management</h2>
            <p>Coming Soon...</p>
          </div>
        );
      case 'reports':
        return (
          <div className="coming-soon">
            <h2>📊 Reports</h2>
            <p>Coming Soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="coming-soon">
            <h2>⚙️ Settings</h2>
            <p>Coming Soon...</p>
          </div>
        );
      default:
        return <Dashboard onNavigate={setCurrentModule} />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        currentModule={currentModule}
        onNavigate={setCurrentModule}
      />
      
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        {renderModule()}
      </div>
    </div>
  );
}

export default App;
