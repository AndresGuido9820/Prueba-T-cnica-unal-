import axios from 'axios';

//const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const API_URL = 'http://localhost:3005/api'

// Student service
export const getStudents = async () => {
    try {
      const response = await axios.get(`${API_URL}/students`);
      console.log("Datos recibidos:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error en la petición:", error);
      if (error.response) {
        console.error("Respuesta del servidor:", error.response.data);
      }
      throw error;
    }
  };

export const getStudentById = async (id: number) => {
  const response = await axios.get(`${API_URL}/students/${id}`);
  return response.data;
};

export const createStudent = async (student: any) => {
  const response = await axios.post(`${API_URL}/students`, student);
  return response.data;
};

export const updateStudent = async (id: number, student: any) => {
  const response = await axios.put(`${API_URL}/students/${id}`, student);
  return response.data;
};

export const deleteStudent = async (id: number) => {
  const response = await axios.delete(`${API_URL}/students/${id}`);
  return response.data;
};

export const getStudentDetails = async (id: number) => {
  const response = await axios.get(`${API_URL}/student-details/${id}`);
  return response.data;
};

// Course service
export const getCourses = async () => {
  const response = await axios.get(`${API_URL}/courses`);
  return response.data;
};

export const getCourseById = async (id: number) => {
  const response = await axios.get(`${API_URL}/courses/${id}`);
  return response.data;
};

export const createCourse = async (course: any) => {
  const response = await axios.post(`${API_URL}/courses`, course);
  return response.data;
};

export const updateCourse = async (id: number, course: any) => {
  const response = await axios.put(`${API_URL}/courses/${id}`, course);
  return response.data;
};

export const deleteCourse = async (id: number) => {
  const response = await axios.delete(`${API_URL}/courses/${id}`);
  return response.data;
};

export const updateCourseCapacity = async (id: number, capacity: number) => {
  console.log("holaaaaaaaa")
  const response = await axios.put(`${API_URL}/courses/${id}/capacity`, { capacity });
  return response.data;
};

export const getCourseDetails = async (id: number) => {
  const response = await axios.get(`${API_URL}/course-details/${id}`);
  return response.data;
};

// Enrollment service
export const getEnrollments = async () => {
  const response = await axios.get(`${API_URL}/enrollments`);
  return response.data;
};

export const getEnrollmentsByStudent = async (studentId: number) => {
  const response = await axios.get(`${API_URL}/enrollments/student/${studentId}`);
  return response.data;
};

export const getEnrollmentsByCourse = async (courseId: number) => {
  const response = await axios.get(`${API_URL}/enrollments/course/${courseId}`);
  return response.data;
};

export const createEnrollment = async (enrollment: any) => {
  const response = await axios.post(`${API_URL}/enrollments`, enrollment);
  return response.data;
};

export const deleteEnrollment = async (studentId: number, courseId: number) => {
  const response = await axios.delete(`${API_URL}/enrollments/${studentId}/${courseId}`);
  return response.data;
};

