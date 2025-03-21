import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Grid,
} from '@mui/material';
import { getStudents, getCourses, getEnrollments} from '../../Service/api.ts'; // Asegúrate de importar tu servicio de API

interface EnrollmentFormData {
  studentId: number;
  courseId: number;
}

const EnrollmentForm: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<EnrollmentFormData>({
    studentId: 0,
    courseId: Number(courseId),
  });
  const [students, setStudents] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Carga la lista de estudiantes y cursos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const studentsData = await getStudents();
        const coursesData = await getCourses();
        setStudents(studentsData);
        setCourses(coursesData);
      } catch (err) {
        setError('Error al cargar los datos.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Maneja cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: Number(value),
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await getEnrollments();
      navigate('/courses'); // Redirige a la lista de cursos después de inscribir
    } catch (err) {
      setError('Error al inscribir al estudiante.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Inscribir Estudiante en Curso
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Estudiante"
              name="studentId"
              select
              SelectProps={{ native: true }}
              value={formData.studentId}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar estudiante</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {`${student.firstName} ${student.lastName}`}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Curso"
              name="courseId"
              select
              SelectProps={{ native: true }}
              value={formData.courseId}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar curso</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Inscribir'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default EnrollmentForm;