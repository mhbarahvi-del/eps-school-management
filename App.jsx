import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    class: '',
    rollNumber: '',
    phone: '',
    address: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://https://eps-school-management.vercel.app/api:5000';

  // Fetch all students
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/students`);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
    setLoading(false);
  };

  // Search students
  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim()) {
      try {
        const response = await fetch(`${API_URL}/api/students/search/${e.target.value}`);
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error searching:', error);
      }
    } else {
      fetchStudents();
    }
  };

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or Update student
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert('Please fill name and email');
      return;
    }

    try {
      let response;
      if (editingId) {
        response = await fetch(`${API_URL}/api/students/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        response = await fetch(`${API_URL}/api/students`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }

      if (response.ok) {
        fetchStudents();
        setFormData({ name: '', email: '', class: '', rollNumber: '', phone: '', address: '' });
        setEditingId(null);
        alert(editingId ? 'Student updated!' : 'Student added!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving student');
    }
  };

  // Edit student
  const handleEdit = (student) => {
    setFormData(student);
    setEditingId(student.id);
    window.scrollTo(0, 0);
  };

  // Delete student
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        const response = await fetch(`${API_URL}/api/students/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          fetchStudents();
          alert('Student deleted!');
        }
      } catch (error) {
        console.error('Error deleting:', error);
        alert('Error deleting student');
      }
    }
  };

  // Load students on mount
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>📚 School Management System</h1>
        <p>Student Management Module</p>
      </header>

      <div className="container">
        {/* Add/Edit Form */}
        <div className="form-section">
          <h2>{editingId ? '✏️ Edit Student' : '➕ Add New Student'}</h2>
          <form onSubmit={handleSubmit} className="form">
            <input
              type="text"
              name="name"
              placeholder="Student Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="class"
              placeholder="Class (e.g., 10-A)"
              value={formData.class}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="rollNumber"
              placeholder="Roll Number"
              value={formData.rollNumber}
              onChange={handleInputChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              rows="3"
            />
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update Student' : 'Add Student'}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ name: '', email: '', class: '', rollNumber: '', phone: '', address: '' });
                }}
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        {/* Search Bar */}
        <div className="search-section">
          <input
            type="text"
            placeholder="🔍 Search by name, email, or roll number"
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        {/* Students List */}
        <div className="list-section">
          <h2>📋 All Students ({students.length})</h2>
          {loading ? (
            <p className="loading">Loading...</p>
          ) : students.length === 0 ? (
            <p className="empty">No students found. Add one to get started!</p>
          ) : (
            <div className="table-responsive">
              <table className="students-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Class</th>
                    <th>Roll #</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.class || '-'}</td>
                      <td>{student.rollnumber || '-'}</td>
                      <td>{student.phone || '-'}</td>
                      <td className="actions">
                        <button className="btn btn-edit" onClick={() => handleEdit(student)}>
                          Edit
                        </button>
                        <button className="btn btn-delete" onClick={() => handleDelete(student.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
