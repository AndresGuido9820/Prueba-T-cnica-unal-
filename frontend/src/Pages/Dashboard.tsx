import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Typography,
  Grid,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { getStudents, getCourses } from '../Service/api.ts';

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface Course {
  id: number;
  name: string;
  description: string;
  capacity: number;
}

const Dashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsData, coursesData] = await Promise.all([
          getStudents(),
          getCourses(),
        ]);
        setStudents(studentsData);
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Sección de Estudiantes */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Students Overview
            </Typography>
            <Typography variant="body1" gutterBottom>
              Total Students: {students.length}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/students"
              sx={{ mr: 1 }}
            >
              View All Students
            </Button>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/students/new"
            >
              Add Student
            </Button>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">Recent Students:</Typography>
            <List dense>
              {students.slice(0, 5).map((student) => (
                <ListItem
                  key={student.id}
                  component={RouterLink}
                  to={`/students/${student.id}`}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <ListItemText
                    primary={`${student.firstName} ${student.lastName}`}
                    secondary={student.email}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Sección de Cursos */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Courses Overview
            </Typography>
            <Typography variant="body1" gutterBottom>
              Total Courses: {courses.length}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/courses"
              sx={{ mr: 1 }}
            >
              View All Courses
            </Button>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/courses/new"
            >
              Add Course
            </Button>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">Recent Courses:</Typography>
            <List dense>
              {courses.slice(0, 5).map((course) => (
                <ListItem
                  key={course.id}
                  component={RouterLink}
                  to={`/courses/${course.id}`}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <ListItemText
                    primary={course.name}
                    secondary={course.description}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Acciones rápidas */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="/students/new"
                >
                  Register Student
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="/courses/new"
                >
                  Create Course
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="/enrollments/new"
                >
                  New Enrollment
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;