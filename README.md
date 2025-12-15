# School Management System - Student Module

## What This Does
- Add new students with name, email, class, roll number, phone, address
- View all students in a table
- Edit student details
- Delete students
- Search students by name, email, or roll number

## Files Included
1. `package.json` - Dependencies list
2. `server.js` - Backend API (Node.js + Express)
3. `App.jsx` - Frontend (React)
4. `App.css` - Styling
5. `.env` - Environment variables
6. `README.md` - This file

## Setup Steps

### Step 1: Create Railway Database
1. Go to railway.app
2. Create PostgreSQL database
3. Copy the connection string
4. Paste into `.env` file as `DATABASE_URL`

### Step 2: Deploy on Netlify
1. Push all files to GitHub
2. Go to netlify.com
3. Connect your GitHub repo
4. Set build command: `npm install && npm run build`
5. Deploy
6. You'll get a live URL

### Step 3: Prepare for Production
- The backend needs hosting too (Netlify for frontend + Railway for backend)
- Update `.env` with your Railway database URL
- Frontend will call backend API

## File Locations in GitHub
```
school-management-system/
├── package.json
├── server.js
├── App.jsx
├── App.css
├── .env
└── README.md
```

## Important Notes
- Keep `.env` file safe (contains database password)
- Don't share `.env` publicly
- Database creates table automatically on first run
- Works on phones, tablets, and computers

## Troubleshooting
- If students not showing: Check database connection in .env
- If forms not submitting: Check browser console for errors
- If styling looks wrong: Clear browser cache (Ctrl+Shift+Delete)

## Next Steps
After this module works:
1. Build Teacher Management
2. Build Class Management
3. Build Attendance System
4. Build Grade System

---
Questions? Ask Claude AI to help fix issues!
