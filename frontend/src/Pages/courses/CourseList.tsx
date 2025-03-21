import React, { useEffect, useState } from 'react';
import {
  Typography,
  Paper,
  Box,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import { getCourses } from '../../Service/api.ts'; // Asegúrate de importar tu servicio de API
import { Link } from 'react-router-dom';

interface Course {
  id: number;
  name: string;
  description?: string;
  capacity: number;
  createdAt: string;
  updatedAt: string;
}

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Carga la lista de cursos al montar el componente
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        setError('Error al cargar la lista de cursos.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 800, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Cursos
      </Typography>
      <List>
        {courses.map((course) => (
          <ListItem key={course.id}>
            <ListItemText
              primary={course.name}
              secondary={`Capacidad: ${course.capacity} | Creado: ${new Date(
                course.createdAt,
              ).toLocaleDateString()}`}
            />
            <Button
              component={Link}
              to={`/courses/${course.id}`}
              variant="contained"
              color="primary"
            >
              Ver detalles
            </Button>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default CourseList;