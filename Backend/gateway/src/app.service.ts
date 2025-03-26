// backend/gateway/src/app.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';



@Injectable()
export class AppService {
  private studentServiceUrl: string;
  private courseServiceUrl: string;
  private enrollmentServiceUrl: string;

  constructor() {
    this.studentServiceUrl = process.env.STUDENT_SERVICE_URL ||'http://student-service:3001';
    this.courseServiceUrl = process.env.COURSE_SERVICE_URL || 'http://course-service:3002';
    this.enrollmentServiceUrl = process.env.ENROLLMENT_SERVICE_URL || 'http://localhost:3003';
  }


  async getAllStudents() {
    
    try {
      
      console.log(this.studentServiceUrl);
      const response = await axios.get(`${this.studentServiceUrl}/students`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getStudentById(id: number) {
    try {
      const response = await axios.get(`${this.studentServiceUrl}/students/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async createStudent(createStudentDto: any) {
    try {
  
      const response = await axios.post(`${this.studentServiceUrl}/students`, createStudentDto);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateStudent(id: number, updateStudentDto: any) {
    try {
      const response = await axios.put(`${this.studentServiceUrl}/students/${id}`, updateStudentDto);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteStudent(id: number) {
    try {
      const response = await axios.delete(`${this.studentServiceUrl}/students/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Course service methods
  async getAllCourses() {
   
    try {
  
      const response = await axios.get(`${this.courseServiceUrl}/courses`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getCourseById(id: number) {
    try {
      const response = await axios.get(`${this.courseServiceUrl}/courses/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async createCourse(createCourseDto: any) {
    try {
      const response = await axios.post(`${this.courseServiceUrl}/courses`, createCourseDto);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateCourse(id: number, updateCourseDto: any) {//dto  
    try {
      const response = await axios.put(`${this.courseServiceUrl}/courses/${id}`, updateCourseDto);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteCourse(id: number) {
    try {
      const response = await axios.delete(`${this.courseServiceUrl}/courses/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateCourseCapacity(id: number, capacity: number) {
    try {
      const response = await axios.put(`${this.courseServiceUrl}/courses/${id}`, { capacity });
      
    
      const res2=await axios.put(`${this.enrollmentServiceUrl}/enrollments/course/${id}`, { capacity });
    
      
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Enrollment service methods
  async getAllEnrollments() {
    try {
      const response = await axios.get(`${this.enrollmentServiceUrl}/enrollments`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getEnrollmentsByStudent(studentId: number) {
    try {
      const response = await axios.get(`${this.enrollmentServiceUrl}/enrollments/student/${studentId}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getEnrollmentsByCourse(courseId: number) {
    try {
      const response = await axios.get(`${this.enrollmentServiceUrl}/enrollments/course/${courseId}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async createEnrollment(createEnrollmentDto: any) {
    try {
      const response = await axios.post(`${this.enrollmentServiceUrl}/enrollments`, createEnrollmentDto);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteEnrollment(studentId: number, courseId: number) {
    try {
      const response = await axios.delete(`${this.enrollmentServiceUrl}/enrollments/${studentId}/${courseId}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }


  async getStudentDetails(studentId: number) {
    try {
      // Get student basic info
      const student = await this.getStudentById(studentId);
      
      // Get student enrollments
      const enrollments = await this.getEnrollmentsByStudent(studentId);
      
      // Get course details for each enrollment
      const coursePromises = enrollments.map(enrollment => this.getCourseById(enrollment.courseId));
      const courses = await Promise.all(coursePromises);
      
      return {
        student,
        courses
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async getCourseDetails(courseId: number) {
    try {
      // Get course basic info
      const course = await this.getCourseById(courseId);
      
      // Get course enrollments
      const enrollments = await this.getEnrollmentsByCourse(courseId);
      
      // Get enrollment count
      const enrollmentCount = enrollments.length;
      
      // Get student details for each enrollment
      const studentPromises = enrollments.map(enrollment => this.getStudentById(enrollment.studentId));
      const students = await Promise.all(studentPromises);
      
      return {
        course,
        enrollmentCount,
        students
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any) {
    if (error.response) {
      throw new HttpException(
        error.response.data || 'Service error',
        error.response.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    throw new HttpException('Service unavailable', HttpStatus.SERVICE_UNAVAILABLE);
  }
}