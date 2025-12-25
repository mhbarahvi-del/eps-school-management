import React, { useState } from 'react';
import Dashboard from './Dashboard';
import StudentModule from './StudentModule';
import './App.css';

function App() {
  const [currentModule, setCurrentModule] = useState('dashboard');

  const renderModule = () => {
    switch(currentModule) {
      case 'students':
        return <StudentModule onBack={() => setCurrentModule('dashboard')} />;
      case 'employees':
        return (
          <div className="coming-soon">
            <button onClick={() => setCurrentModule('dashboard')} className="back-btn">← Back</button>
            <h2>👨‍💼 Employee Management</h2>
            <p>Coming Soon...</p>
          </div>
        );
      case 'attendance':
        return (
          <div className="coming-soon">
            <button onClick={() => setCurrentModule('dashboard')} className="back-btn">← Back</button>
            <h2>📋 Attendance</h2>
            <p>Coming Soon...</p>
          </div>
        );
      case 'fee':
        return (
          <div className="coming-soon">
            <button onClick={() => setCurrentModule('dashboard')} className="back-btn">← Back</button>
            <h2>💰 Fee Management</h2>
            <p>Coming Soon...</p>
          </div>
        );
      case 'exam':
        return (
          <div className="coming-soon">
            <button onClick={() => setCurrentModule('dashboard')} className="back-btn">← Back</button>
            <h2>📝 Exam Management</h2>
            <p>Coming Soon...</p>
          </div>
        );
      default:
        return <Dashboard onNavigate={setCurrentModule} />;
    }
  };

  return (
    <div className="app">
      {renderModule()}
    </div>
  );
}

export default App;
