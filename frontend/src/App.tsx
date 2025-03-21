// frontend/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './Components/LyaoutComponent.tsx';
import Dashboard from './Pages/Dashboard.tsx';
import StudentList from './Pages/student/StudentList.tsx';
import StudentForm from './Pages/student/StudentForm.tsx';
import StudentDetails from './Pages/student/studentdetails.tsx';
import CourseList from './Pages/courses/CourseList.tsx';
import CourseForm from './Pages/courses/CourseForm.tsx';
import CourseDetails from './Pages/courses/CourseDetail.tsx';

import EnrollmentForm from './Pages/enrollments/EnrollmentForm.tsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            
            {/* Student routes */}
            <Route path="/students" element={<StudentList />} />
            <Route path="/students/new" element={<StudentForm />} />
            <Route path="/students/edit/:id" element={<StudentForm />} />
            <Route path="/students/:id" element={<StudentDetails />} />
            
            {/* Course routes */}
            <Route path="/courses" element={<CourseList />} />
            <Route path="/courses/new" element={<CourseForm />} />
            <Route path="/courses/edit/:id" element={<CourseForm />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            
            {/* Enrollment routes */}
            <Route path="/enrollments/new" element={<EnrollmentForm />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;