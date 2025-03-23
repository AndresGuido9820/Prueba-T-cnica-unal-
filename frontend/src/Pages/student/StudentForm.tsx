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
import { getStudentById, createStudent, updateStudent } from '../../Service/api.ts';

// Interfaz para los datos del formulario
interface StudentFormData {
  id?: number; // Opcional, ya que solo se usa al actualizar un estudiante
  firstName: string;
  lastName: string;
  email: string;
  phone?: string; // Opcional
  address?: string; // Opcional
  dateOfBirth?: string; // Opcional, en formato ISO (YYYY-MM-DD)
  gender?: 'Male' | 'Female' | 'Other'; // Opcional
  enrollmentDate?: Date; // Opcional, en formato ISO (YYYY-MM-DD)
  status?: 'Active' | 'Inactive'; // Opcional
}

const StudentForm: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtiene el ID del estudiante de la URL (si existe)
  const navigate = useNavigate();
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Carga los datos del estudiante si estamos en modo de edición
  useEffect(() => {
    if (id) {
      const fetchStudent = async () => {
        setLoading(true);
        try {
          const student = await getStudentById(Number(id));
          setFormData(student);
        } catch (err) {
          setError('Error al cargar los datos del estudiante.');
        } finally {
          setLoading(false);
        }
      };
      fetchStudent();
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
        const dataToSend = {
          ...formData,
          enrollmentDate: formData.enrollmentDate 
            ? new Date(`${formData.enrollmentDate}T00:00:00Z`)  // ✅ Convertir a Date
            : undefined,
        };
    
        if (id) {
          await updateStudent(Number(id), dataToSend);
        } else {
          await createStudent(dataToSend);
        }
    
        navigate('/students');
      } catch (err) {
        setError('Error al guardar los datos del estudiante.');
      } finally {
        setLoading(false);
      }
    };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        {id ? 'Editar Estudiante' : 'Crear Estudiante'}
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nombre"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Apellido"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Correo electrónico"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Teléfono"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Dirección"
              name="address"
              value={formData.address || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Fecha de nacimiento"
              name="dateOfBirth"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.dateOfBirth || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Género"
              name="gender"
              select
              SelectProps={{ native: true }}
              value={formData.gender || ''}
              onChange={handleChange}
            >
              <option value="">Seleccionar</option>
              <option value="Male">Masculino</option>
              <option value="Female">Femenino</option>
              <option value="Other">Otro</option>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Fecha de inscripción"
              name="enrollmentDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.enrollmentDate || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Estado"
              name="status"
              select
              SelectProps={{ native: true }}
              value={formData.status || ''}
              onChange={handleChange}
            >
              <option value="">Seleccionar</option>
              <option value="Active">Activo</option>
              <option value="Inactive">Inactivo</option>
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
            {loading ? <CircularProgress size={24} /> : 'Guardar'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default StudentForm;