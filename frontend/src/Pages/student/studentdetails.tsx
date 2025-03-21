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
import { getStudentById } from '../../Service/api.ts'; // Asegúrate de importar tu servicio de API

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
  enrollmentDate?: string;
  status?: string;
}

const StudentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtiene el ID del estudiante de la URL
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Carga los detalles del estudiante al montar el componente
  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);
      try {
        const data = await getStudentById(Number(id));
        setStudent(data);
      } catch (err) {
        setError('Error al cargar los detalles del estudiante.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
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

  if (!student) {
    return (
      <Box mt={4}>
        <Alert severity="warning">No se encontraron datos del estudiante.</Alert>
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Detalles del Estudiante
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Nombre" secondary={`${student.firstName} ${student.lastName}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Correo electrónico" secondary={student.email} />
        </ListItem>
        {student.phone && (
          <ListItem>
            <ListItemText primary="Teléfono" secondary={student.phone} />
          </ListItem>
        )}
        {student.address && (
          <ListItem>
            <ListItemText primary="Dirección" secondary={student.address} />
          </ListItem>
        )}
        {student.dateOfBirth && (
          <ListItem>
            <ListItemText primary="Fecha de nacimiento" secondary={student.dateOfBirth} />
          </ListItem>
        )}
        {student.gender && (
          <ListItem>
            <ListItemText primary="Género" secondary={student.gender} />
          </ListItem>
        )}
        {student.enrollmentDate && (
          <ListItem>
            <ListItemText primary="Fecha de inscripción" secondary={student.enrollmentDate} />
          </ListItem>
        )}
        {student.status && (
          <ListItem>
            <ListItemText primary="Estado" secondary={student.status} />
          </ListItem>
        )}
      </List>
      <Box mt={3}>
        <Button variant="contained" color="primary" onClick={handleGoBack}>
          Volver
        </Button>
      </Box>
    </Paper>
  );
};

export default StudentDetails;