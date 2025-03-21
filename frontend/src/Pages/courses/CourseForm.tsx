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
import { getCourseById, createCourse, updateCourse } from '../../Service/api.ts'; // Asegúrate de importar tu servicio de API

interface CourseFormData {
  id?: number;
  name: string;
  description?: string;
  capacity: number;
}

const CourseForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CourseFormData>({
    name: '',
    description: '',
    capacity: 30,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Carga los datos del curso si estamos en modo de edición
  useEffect(() => {
    if (id) {
      const fetchCourse = async () => {
        setLoading(true);
        try {
          const course = await getCourseById(Number(id));
          setFormData(course);
        } catch (err) {
          setError('Error al cargar los datos del curso.');
        } finally {
          setLoading(false);
        }
      };
      fetchCourse();
    }
  }, [id]);

  // Maneja cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (id) {
        // Modo de actualización
        await updateCourse(Number(id), formData);
      } else {
        // Modo de creación
        await createCourse(formData);
      }
      navigate('/courses'); // Redirige a la lista de cursos después de guardar
    } catch (err) {
      setError('Error al guardar los datos del curso.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {id ? 'Editar Curso' : 'Crear Curso'}
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Capacidad"
              name="capacity"
              type="number"
              value={formData.capacity}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Guardar'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default CourseForm;