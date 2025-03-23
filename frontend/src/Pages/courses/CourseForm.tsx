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
import { getCourseById, updateCourseCapacity } from '../../Service/api.ts'; // Asegúrate de importar tu servicio de API

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
          setFormData(course); // Cargar los datos del curso
        } catch (err) {
          setError('Error al cargar los datos del curso.');
        } finally {
          setLoading(false);
        }
      };
      fetchCourse();
    }
  }, [id]);

  // Maneja cambios en el campo de capacidad
  const handleCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      capacity: Number(value),
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (id) {
        await updateCourseCapacity(Number(id), Number(formData.capacity));
        navigate('/courses'); // Redirige a la lista de cursos después de guardar
      }
    } catch (err) {
      setError('Error al guardar los datos del curso.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Editar Cupos del Curso
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Campo Nombre (no editable) */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre"
              name="name"
              value={formData.name}
              InputProps={{
                readOnly: true,
                sx: { backgroundColor: '#f5f5f5' }, // Fondo gris
              }}
              helperText="Disponible solo para profesores"
            />
          </Grid>

          {/* Campo Descripción (no editable) */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción"
              name="description"
              value={formData.description || ''}
              InputProps={{
                readOnly: true,
                sx: { backgroundColor: '#f5f5f5' }, // Fondo gris
              }}
              multiline
              rows={4}
              helperText="Disponible solo para profesores"
            />
          </Grid>

          {/* Campo Capacidad (editable) */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Capacidad"
              name="capacity"
              type="number"
              value={formData.capacity}
              onChange={handleCapacityChange}
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
            {loading ? <CircularProgress size={24} /> : 'Guardar Cambios'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default CourseForm;