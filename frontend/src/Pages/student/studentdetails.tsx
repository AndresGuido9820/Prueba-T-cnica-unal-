import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
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
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { getStudentDetails } from '../../Service/api.ts'; // Asegúrate de importar tu servicio de API

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

interface Course {
  id: number;
  name: string;
  description: string;
  capacity: number;
  createdAt: string;
  updatedAt: string;
}

interface StudentDetailsResponse {
  student: Student;
  courses: Course[];
}

const StudentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtiene el ID del estudiante de la URL
  const navigate = useNavigate();
  const [studentDetails, setStudentDetails] = useState<StudentDetailsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Carga los detalles del estudiante al montar el componente
  useEffect(() => {
    const fetchStudentDetails = async () => {
      setLoading(true);
      try {
        const data = await getStudentDetails(Number(id));
        setStudentDetails(data);
      } catch (err) {
        setError('Error al cargar los detalles del estudiante.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetails();
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

  if (!studentDetails) {
    return (
      <Box mt={4}>
        <Alert severity="warning">No se encontraron datos del estudiante.</Alert>
      </Box>
    );
  }

  const { student, courses } = studentDetails;

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 800, margin: 'auto', mt: 4 }}>
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
            <ListItemText
              primary="Fecha de nacimiento"
              secondary={new Date(student.dateOfBirth).toLocaleDateString()}
            />
          </ListItem>
        )}
        {student.gender && (
          <ListItem>
            <ListItemText primary="Género" secondary={student.gender} />
          </ListItem>
        )}
        {student.enrollmentDate && (
          <ListItem>
            <ListItemText
              primary="Fecha de inscripción"
              secondary={new Date(student.enrollmentDate).toLocaleDateString()}
            />
          </ListItem>
        )}
        {student.status && (
          <ListItem>
            <ListItemText primary="Estado" secondary={student.status} />
          </ListItem>
        )}
      </List>

      {/* Lista de cursos inscritos */}
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Cursos Inscritos
      </Typography>
      {courses.length === 0 ? (
        <Typography>No está inscrito en ningún curso.</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table sx={{ borderCollapse: 'collapse' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ border: 'none', fontWeight: 'bold' }}>Nombre del Curso</TableCell>
                <TableCell align="right" sx={{ border: 'none', fontWeight: 'bold' }}>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id} sx={{ '&:last-child td, &:last-child th': { border: 'none' } }}>
                  <TableCell sx={{ border: 'none' }}>{course.name}</TableCell>
                  <TableCell align="right" sx={{ border: 'none' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      component={RouterLink}
                      to={`/courses/${course.id}`} // Redirige a la ruta de detalles del curso
                      size="small"
                      sx={{ textTransform: 'none' }}
                    >
                      Ver Detalles
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Botón de regreso */}
      <Box mt={3}>
        <Button variant="contained" color="primary" onClick={handleGoBack}>
          Volver
        </Button>
      </Box>
    </Paper>
  );
};

export default StudentDetails;