import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AppService', () => {
  let service: AppService;

  const mockStudent = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
  };

  const mockCourse = {
    id: 1,
    name: 'Test Course',
    capacity: 30,
  };

  const mockEnrollment = {
    id: 1,
    studentId: 1,
    courseId: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
    mockedAxios.get.mockClear();
    mockedAxios.post.mockClear();
    mockedAxios.put.mockClear();
    mockedAxios.delete.mockClear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Student service methods
  describe('getAllStudents', () => {
    it('should return all students', async () => {
      const students = [mockStudent];
      mockedAxios.get.mockResolvedValue({ data: students });

      const result = await service.getAllStudents();
      expect(result).toEqual(students);
      expect(mockedAxios.get).toHaveBeenCalledWith('http://student-service:3001/students');
    });

    it('should throw HttpException on error', async () => {
      mockedAxios.get.mockRejectedValue({ response: { status: 404, data: 'Not found' } });

      await expect(service.getAllStudents()).rejects.toThrow(
        new HttpException('Not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('getStudentById', () => {
    it('should return a student by id', async () => {
      mockedAxios.get.mockResolvedValue({ data: mockStudent });

      const result = await service.getStudentById(1);
      expect(result).toEqual(mockStudent);
      expect(mockedAxios.get).toHaveBeenCalledWith('http://student-service:3001/students/1');
    });
  });

  describe('createStudent', () => {
    it('should create a student', async () => {
      const createStudentDto = { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' };
      mockedAxios.post.mockResolvedValue({ data: mockStudent });

      const result = await service.createStudent(createStudentDto);
      expect(result).toEqual(mockStudent);
      expect(mockedAxios.post).toHaveBeenCalledWith('http://student-service:3001/students', createStudentDto);
    });
  });

  describe('updateStudent', () => {
    it('should update a student', async () => {
      const updateStudentDto = { firstName: 'Jane' };
      const updatedStudent = { ...mockStudent, ...updateStudentDto };
      mockedAxios.put.mockResolvedValue({ data: updatedStudent });

      const result = await service.updateStudent(1, updateStudentDto);
      expect(result).toEqual(updatedStudent);
      expect(mockedAxios.put).toHaveBeenCalledWith('http://student-service:3001/students/1', updateStudentDto);
    });
  });

  describe('deleteStudent', () => {
    it('should delete a student', async () => {
      mockedAxios.delete.mockResolvedValue({ data: { message: 'Student deleted' } });

      const result = await service.deleteStudent(1);
      expect(result).toEqual({ message: 'Student deleted' });
      expect(mockedAxios.delete).toHaveBeenCalledWith('http://student-service:3001/students/1');
    });
  });

  // Course service methods
  describe('getAllCourses', () => {
    it('should return all courses', async () => {
      const courses = [mockCourse];
      mockedAxios.get.mockResolvedValue({ data: courses });

      const result = await service.getAllCourses();
      expect(result).toEqual(courses);
      expect(mockedAxios.get).toHaveBeenCalledWith('http://course-service:3002/courses');
    });
  });

  describe('getCourseById', () => {
    it('should return a course by id', async () => {
      mockedAxios.get.mockResolvedValue({ data: mockCourse });

      const result = await service.getCourseById(1);
      expect(result).toEqual(mockCourse);
      expect(mockedAxios.get).toHaveBeenCalledWith('http://course-service:3002/courses/1');
    });
  });

  describe('createCourse', () => {
    it('should create a course', async () => {
      const createCourseDto = { name: 'Test Course', capacity: 30 };
      mockedAxios.post.mockResolvedValue({ data: mockCourse });

      const result = await service.createCourse(createCourseDto);
      expect(result).toEqual(mockCourse);
      expect(mockedAxios.post).toHaveBeenCalledWith('http://course-service:3002/courses', createCourseDto);
    });
  });

  describe('updateCourse', () => {
    it('should update a course', async () => {
      const updateCourseDto = { name: 'Updated Course' };
      const updatedCourse = { ...mockCourse, ...updateCourseDto };
      mockedAxios.put.mockResolvedValue({ data: updatedCourse });

      const result = await service.updateCourse(1, updateCourseDto);
      expect(result).toEqual(updatedCourse);
      expect(mockedAxios.put).toHaveBeenCalledWith('http://course-service:3002/courses/1', updateCourseDto);
    });
  });

  describe('deleteCourse', () => {
    it('should delete a course', async () => {
      mockedAxios.delete.mockResolvedValue({ data: { message: 'Course deleted' } });

      const result = await service.deleteCourse(1);
      expect(result).toEqual({ message: 'Course deleted' });
      expect(mockedAxios.delete).toHaveBeenCalledWith('http://course-service:3002/courses/1');
    });
  });

  describe('updateCourseCapacity', () => {
    it('should update course capacity in both course and enrollment services', async () => {
      mockedAxios.put
        .mockResolvedValueOnce({ data: mockCourse }) // Course service
        .mockResolvedValueOnce({ data: { message: 'Capacity updated' } }); // Enrollment service

      const result = await service.updateCourseCapacity(1, 50);
      expect(result).toEqual(mockCourse);
      expect(mockedAxios.put).toHaveBeenCalledTimes(2);
      expect(mockedAxios.put).toHaveBeenCalledWith('http://course-service:3002/courses/1', { capacity: 50 });
      expect(mockedAxios.put).toHaveBeenCalledWith('http://localhost:3003/enrollments/course/1', { capacity: 50 });
    });
  });

  // Enrollment service methods
  describe('getAllEnrollments', () => {
    it('should return all enrollments', async () => {
      const enrollments = [mockEnrollment];
      mockedAxios.get.mockResolvedValue({ data: enrollments });

      const result = await service.getAllEnrollments();
      expect(result).toEqual(enrollments);
      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3003/enrollments');
    });
  });

  describe('getEnrollmentsByStudent', () => {
    it('should return enrollments by student', async () => {
      const enrollments = [mockEnrollment];
      mockedAxios.get.mockResolvedValue({ data: enrollments });

      const result = await service.getEnrollmentsByStudent(1);
      expect(result).toEqual(enrollments);
      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3003/enrollments/student/1');
    });
  });

  describe('getEnrollmentsByCourse', () => {
    it('should return enrollments by course', async () => {
      const enrollments = [mockEnrollment];
      mockedAxios.get.mockResolvedValue({ data: enrollments });

      const result = await service.getEnrollmentsByCourse(1);
      expect(result).toEqual(enrollments);
      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3003/enrollments/course/1');
    });
  });

  describe('createEnrollment', () => {
    it('should create an enrollment', async () => {
      const createEnrollmentDto = { studentId: 1, courseId: 1, capacity: 30 };
      mockedAxios.post.mockResolvedValue({ data: mockEnrollment });

      const result = await service.createEnrollment(createEnrollmentDto);
      expect(result).toEqual(mockEnrollment);
      expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:3003/enrollments', createEnrollmentDto);
    });
  });

  describe('deleteEnrollment', () => {
    it('should delete an enrollment', async () => {
      mockedAxios.delete.mockResolvedValue({ data: { message: 'Enrollment deleted' } });

      const result = await service.deleteEnrollment(1, 1);
      expect(result).toEqual({ message: 'Enrollment deleted' });
      expect(mockedAxios.delete).toHaveBeenCalledWith('http://localhost:3003/enrollments/1/1');
    });
  });

  // Comprehensive views
  describe('getStudentDetails', () => {
    it('should return student details with courses', async () => {
      const enrollments = [mockEnrollment];
      mockedAxios.get
        .mockResolvedValueOnce({ data: mockStudent }) // getStudentById
        .mockResolvedValueOnce({ data: enrollments }) // getEnrollmentsByStudent
        .mockResolvedValueOnce({ data: mockCourse }); // getCourseById

      const result = await service.getStudentDetails(1);
      expect(result).toEqual({
        student: mockStudent,
        courses: [mockCourse],
      });
      expect(mockedAxios.get).toHaveBeenCalledTimes(3);
    });
  });

  describe('getCourseDetails', () => {
    it('should return course details with students', async () => {
      const enrollments = [mockEnrollment];
      mockedAxios.get
        .mockResolvedValueOnce({ data: mockCourse }) // getCourseById
        .mockResolvedValueOnce({ data: enrollments }) // getEnrollmentsByCourse
        .mockResolvedValueOnce({ data: mockStudent }); // getStudentById

      const result = await service.getCourseDetails(1);
      expect(result).toEqual({
        course: mockCourse,
        enrollmentCount: 1,
        students: [mockStudent],
      });
      expect(mockedAxios.get).toHaveBeenCalledTimes(3);
    });
  });
});