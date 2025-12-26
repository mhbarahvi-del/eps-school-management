require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increased limit for photo uploads
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to database:', err.stack);
  } else {
    console.log('Database connected successfully');
    release();
  }
});

// Create students table with new comprehensive schema
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    registrationNo VARCHAR(50) UNIQUE NOT NULL,
    studentType VARCHAR(20),
    class VARCHAR(50),
    studentName VARCHAR(100) NOT NULL,
    fatherName VARCHAR(100) NOT NULL,
    motherName VARCHAR(100),
    fatherContact1 VARCHAR(20) NOT NULL,
    fatherContact2 VARCHAR(20),
    dob DATE,
    dobWords VARCHAR(100),
    gender VARCHAR(20),
    admissionDate DATE DEFAULT CURRENT_DATE,
    feeCategory VARCHAR(50),
    busVan VARCHAR(10),
    hostel VARCHAR(10),
    library VARCHAR(10),
    smsContact VARCHAR(20),
    address TEXT,
    village VARCHAR(100),
    district VARCHAR(100),
    state VARCHAR(100),
    studentPhoto TEXT,
    fatherPhoto TEXT,
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

pool.query(createTableQuery)
  .then(() => console.log('Students table ready'))
  .catch(err => console.error('Error creating table:', err));

// API Routes

// Get all students
app.get('/api/students', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get single student by ID
app.get('/api/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add new student
app.post('/api/students', async (req, res) => {
  try {
    const {
      registrationNo, studentType, class: studentClass, studentName,
      fatherName, motherName, fatherContact1, fatherContact2,
      dob, dobWords, gender, admissionDate, feeCategory,
      busVan, hostel, library, smsContact, address,
      village, district, state, studentPhoto, fatherPhoto, remarks
    } = req.body;

    // Validation
    if (!registrationNo || !studentName || !fatherName || !fatherContact1) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const result = await pool.query(
      `INSERT INTO students (
        registrationNo, studentType, class, studentName, fatherName, motherName,
        fatherContact1, fatherContact2, dob, dobWords, gender, admissionDate,
        feeCategory, busVan, hostel, library, smsContact, address,
        village, district, state, studentPhoto, fatherPhoto, remarks
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
      RETURNING *`,
      [registrationNo, studentType, studentClass, studentName, fatherName, motherName,
       fatherContact1, fatherContact2, dob, dobWords, gender, admissionDate,
       feeCategory, busVan, hostel, library, smsContact, address,
       village, district, state, studentPhoto, fatherPhoto, remarks]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding student:', error);
    if (error.code === '23505') {
      res.status(400).json({ error: 'Registration number already exists' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// Update student
app.put('/api/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      registrationNo, studentType, class: studentClass, studentName,
      fatherName, motherName, fatherContact1, fatherContact2,
      dob, dobWords, gender, admissionDate, feeCategory,
      busVan, hostel, library, smsContact, address,
      village, district, state, studentPhoto, fatherPhoto, remarks
    } = req.body;

    const result = await pool.query(
      `UPDATE students SET 
        registrationNo = $1, studentType = $2, class = $3, studentName = $4,
        fatherName = $5, motherName = $6, fatherContact1 = $7, fatherContact2 = $8,
        dob = $9, dobWords = $10, gender = $11, admissionDate = $12,
        feeCategory = $13, busVan = $14, hostel = $15, library = $16,
        smsContact = $17, address = $18, village = $19, district = $20,
        state = $21, studentPhoto = $22, fatherPhoto = $23, remarks = $24,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $25
      RETURNING *`,
      [registrationNo, studentType, studentClass, studentName, fatherName, motherName,
       fatherContact1, fatherContact2, dob, dobWords, gender, admissionDate,
       feeCategory, busVan, hostel, library, smsContact, address,
       village, district, state, studentPhoto, fatherPhoto, remarks, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete student
app.delete('/api/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM students WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    res.json({ message: 'Student deleted successfully', student: result.rows[0] });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: error.message });
  }
});

// Search students
app.get('/api/students/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const result = await pool.query(
      `SELECT * FROM students 
       WHERE studentName ILIKE $1 
       OR registrationNo ILIKE $1 
       OR fatherName ILIKE $1
       OR fatherContact1 ILIKE $1
       ORDER BY created_at DESC`,
      [`%${query}%`]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error searching students:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
