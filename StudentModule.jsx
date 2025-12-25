import React, { useState, useEffect } from 'react';

const API_URL = 'https://eps-school-management.vercel.app';

function StudentModule({ onBack }) {
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
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/students`);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId 
        ? `${API_URL}/api/students/${editingId}`
        : `${API_URL}/api/students`;
      
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert(editingId ? 'Student updated!' : 'Student added!');
        setFormData({ name: '', email: '', class: '', rollNumber: '', phone: '', address: '' });
        setEditingId(null);
        fetchStudents();
      }
    } catch (error) {
      alert('Error saving student');
      console.error(error);
    }
  };

  const handleEdit = (student) => {
    setFormData(student);
    setEditingId(student.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student?')) return;
    
    try {
      await fetch(`${API_URL}/api/students/${id}`, { method: 'DELETE' });
      alert('Student deleted!');
      fetchStudents();
    } catch (error) {
      alert('Error deleting student');
    }
  };

  const filteredStudents = students.filter(student =>
    student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollnumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="student-module">
      <div className="module-header">
        <button onClick={onBack} className="back-btn">← Back to Dashboard</button>
        <h2>👨‍🎓 Student Management</h2>
      </div>

      <div className="form-container">
        <h3>{editingId ? 'Edit Student' : 'Add New Student'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Student Name *"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <input
              type="text"
              placeholder="Class"
              value={formData.class}
              onChange={(e) => setFormData({...formData, class: e.target.value})}
            />
            <input
              type="text"
              placeholder="Roll Number"
              value={formData.rollNumber}
              onChange={(e) => setFormData({...formData, rollNumber: e.target.value})}
            />
            <input
              type="tel"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
            <input
              type="text"
              placeholder="Address"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {editingId ? 'Update Student' : 'Add Student'}
            </button>
            {editingId && (
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ name: '', email: '', class: '', rollNumber: '', phone: '', address: '' });
                }}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>All Students ({filteredStudents.length})</h3>
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {loading ? (
          <p>Loading students...</p>
        ) : filteredStudents.length === 0 ? (
          <p>No students found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Class</th>
                <th>Roll No</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.class}</td>
                  <td>{student.rollnumber}</td>
                  <td>{student.phone}</td>
                  <td>
                    <button onClick={() => handleEdit(student)} className="btn-edit">Edit</button>
                    <button onClick={() => handleDelete(student.id)} className="btn-delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default StudentModule;
