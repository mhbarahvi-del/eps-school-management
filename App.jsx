import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import StudentPanel from './StudentPanel';
import StudentRegister from './StudentRegister';
import './App.css';

function App() {
  const [currentModule, setCurrentModule] = useState('dashboard');
  const [currentView, setCurrentView] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleStudentNavigation = (view) => {
    setCurrentView(view);
  };

  const handleBackToPanel = () => {
    setCurrentView(null);
  };

  const renderModule = () => {
    // Student module with sub-navigation
    if (currentModule === 'students') {
      if (currentView === 'register') {
        return <StudentRegister onBack={handleBackToPanel} />;
      }
      if (currentView === 'list') {
        return (
          <div className="coming-soon">
            <h2>📋 Registration List</h2>
            <p>Coming Soon...</p>
            <button onClick={handleBackToPanel} className="back-btn">
              ← Back to Student Panel
            </button>
          </div>
        );
      }
      // Default: Show Student Panel
      return <StudentPanel onNavigate={handleStudentNavigation} />;
    }

    // Other modules
    switch(currentModule) {
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

  // Reset view when changing modules
  const handleModuleChange = (module) => {
    setCurrentModule(module);
    setCurrentView(null);
  };

  return (
    <div className="app-container">
      <Sidebar 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        currentModule={currentModule}
        onNavigate={handleModuleChange}
      />
      
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        {renderModule()}
      </div>
    </div>
  );
}

export default App;
