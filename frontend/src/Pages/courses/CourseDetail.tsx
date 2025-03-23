import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
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
import { getCourseDetails } from '../../Service/api.ts'; // Asegúrate de importar tu servicio de API

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  enrollmentDate: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface CourseDetailsResponse {
  course: {
    id: number;
    name: string;
    description?: string;
    capacity: number;
    createdAt: string;
    updatedAt: string;
  };
  enrollmentCount: number;
  students: Student[];
}

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [courseDetails, setCourseDetails] = useState<CourseDetailsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Carga los detalles del curso al montar el componente
  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      try {
        const data = await getCourseDetails(Number(id));
        setCourseDetails(data);
      } catch (err) {
        setError('Error al cargar los detalles del curso.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
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

  if (!courseDetails) {
    return (
      <Box mt={4}>
        <Alert severity="warning">No se encontraron datos del curso.</Alert>
      </Box>
    );
  }

  const { course, enrollmentCount, students } = courseDetails;

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 800, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Detalles del Curso
      </Typography>

      {/* Detalles del curso */}
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
            primary="Estudiantes Inscritos"
            secondary={`${enrollmentCount} de ${course.capacity}`}
          />
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

      {/* Lista de estudiantes con scroll bar */}
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Estudiantes Inscritos
      </Typography>
      <Box sx={{ maxHeight: 300, overflowY: 'auto', border: '1px solid #ccc', borderRadius: 1 }}>
        {students.length === 0 ? (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body1" color="textSecondary">
              No hay estudiantes inscritos actualmente.
            </Typography>
          </Box>
        ) : (
          <List>
            {students.map((student) => (
              <ListItem key={student.id} sx={{ borderBottom: '1px solid #eee' }}>
                <ListItemText
                  primary={`${student.firstName} ${student.lastName}`}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" display="block">
                        Email: {student.email}
                      </Typography>
                      <Typography component="span" variant="body2" display="block">
                        Teléfono: {student.phone}
                      </Typography>
                      <Typography component="span" variant="body2" display="block">
                        Estado: {student.status}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      {/* Botones de acción */}
      <Box mt={3}>
        <Button variant="contained" color="primary" onClick={handleGoBack}>
          Volver
        </Button>
        <Button
          variant="outlined"
          component={RouterLink}
          to={`/courses/edit/${course.id}`}
          sx={{ ml: 2 }}
        >
          Editar Curso
        </Button>
      </Box>
    </Paper>
  );
};

export default CourseDetails;