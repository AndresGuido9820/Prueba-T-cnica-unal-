import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Paper,
  Box,
  Button,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { getCourseById } from '../../Service/api.ts'; // Asegúrate de importar tu servicio de API

interface Course {
  id: number;
  name: string;
  description?: string;
  capacity: number;
  createdAt: string;
  updatedAt: string;
}

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Carga los detalles del curso al montar el componente
  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const data = await getCourseById(Number(id));
        setCourse(data);
      } catch (err) {
        setError('Error al cargar los detalles del curso.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // Maneja la navegación de regreso
  const handleGoBack = () => {
    navigate(-1); // Navega a la página anterior
  };

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

  if (!course) {
    return (
      <Box mt={4}>
        <Alert severity="warning">No se encontraron datos del curso.</Alert>
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Detalles del Curso
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Nombre" secondary={course.name} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Descripción" secondary={course.description || 'N/A'} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Capacidad" secondary={course.capacity} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Fecha de creación"
            secondary={new Date(course.createdAt).toLocaleDateString()}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Última actualización"
            secondary={new Date(course.updatedAt).toLocaleDateString()}
          />
        </ListItem>
      </List>
      <Box mt={3}>
        <Button variant="contained" color="primary" onClick={handleGoBack}>
          Volver
        </Button>
      </Box>
    </Paper>
  );
};

export default CourseDetails;