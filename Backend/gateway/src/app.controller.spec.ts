import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BadRequestException } from '@nestjs/common';

describe('AppController', () => {
  let controller: AppController;
  let appService: AppService;

  const mockAppService = {
    getAllStudents: jest.fn(),
    getStudentById: jest.fn(),
    createStudent: jest.fn(),
    updateStudent: jest.fn(),
    deleteStudent: jest.fn(),
    getAllCourses: jest.fn(),
    getCourseById: jest.fn(),
    createCourse: jest.fn(),
    updateCourse: jest.fn(),
    deleteCourse: jest.fn(),
    updateCourseCapacity: jest.fn(),
    getAllEnrollments: jest.fn(),
    getEnrollmentsByStudent: jest.fn(),
    getEnrollmentsByCourse: jest.fn(),
    createEnrollment: jest.fn(),
    deleteEnrollment: jest.fn(),
    getStudentDetails: jest.fn(),
    getCourseDetails: jest.fn(),
  };

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
      controllers: [AppController],
      providers: [{ provide: AppService, useValue: mockAppService }],
    }).compile();

    controller = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Student endpoints
  describe('getAllStudents', () => {
    it('should return all students', async () => {
      const students = [mockStudent];
      mockAppService.getAllStudents.mockResolvedValue(students);

      const result = await controller.getAllStudents();
      expect(result).toEqual(students);
      expect(appService.getAllStudents).toHaveBeenCalled();
    });
  });

  describe('getStudentById', () => {
    it('should return a student by id', async () => {
      mockAppService.getStudentById.mockResolvedValue(mockStudent);

      const result = await controller.getStudentById('1');
      expect(result).toEqual(mockStudent);
      expect(appService.getStudentById).toHaveBeenCalledWith(1);
    });
  });

  describe('createStudent', () => {
    it('should create a student', async () => {
      const createStudentDto = { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' };
      mockAppService.createStudent.mockResolvedValue(mockStudent);

      const result = await controller.createStudent(createStudentDto);
      expect(result).toEqual(mockStudent);
      expect(appService.createStudent).toHaveBeenCalledWith(createStudentDto);
    });
  });

  describe('updateStudent', () => {
    it('should update a student', async () => {
      const updateStudentDto = { firstName: 'Jane' };
      const updatedStudent = { ...mockStudent, ...updateStudentDto };
      mockAppService.updateStudent.mockResolvedValue(updatedStudent);

      const result = await controller.updateStudent('1', updateStudentDto);
      expect(result).toEqual(updatedStudent);
      expect(appService.updateStudent).toHaveBeenCalledWith(1, updateStudentDto);
    });
  });

  describe('deleteStudent', () => {
    it('should delete a student', async () => {
      mockAppService.deleteStudent.mockResolvedValue({ message: 'Student deleted' });

      const result = await controller.deleteStudent('1');
      expect(result).toEqual({ message: 'Student deleted' });
      expect(appService.deleteStudent).toHaveBeenCalledWith(1);
    });
  });

  // Course endpoints
  describe('getAllCourses', () => {
    it('should return all courses', async () => {
      const courses = [mockCourse];
      mockAppService.getAllCourses.mockResolvedValue(courses);

      const result = await controller.getAllCourses();
      expect(result).toEqual(courses);
      expect(appService.getAllCourses).toHaveBeenCalled();
    });
  });

  describe('getCourseById', () => {
    it('should return a course by id', async () => {
      mockAppService.getCourseById.mockResolvedValue(mockCourse);

      const result = await controller.getCourseById('1');
      expect(result).toEqual(mockCourse);
      expect(appService.getCourseById).toHaveBeenCalledWith(1);
    });
  });

  describe('createCourse', () => {
    it('should create a course', async () => {
      const createCourseDto = { name: 'Test Course', capacity: 30 };
      mockAppService.createCourse.mockResolvedValue(mockCourse);

      const result = await controller.createCourse(createCourseDto);
      expect(result).toEqual(mockCourse);
      expect(appService.createCourse).toHaveBeenCalledWith(createCourseDto);
    });
  });

  describe('updateCourse', () => {
    it('should update a course', async () => {
      const updateCourseDto = { name: 'Updated Course' };
      const updatedCourse = { ...mockCourse, ...updateCourseDto };
      mockAppService.updateCourse.mockResolvedValue(updatedCourse);

      const result = await controller.updateCourse('1', updateCourseDto);
      expect(result).toEqual(updatedCourse);
      expect(appService.updateCourse).toHaveBeenCalledWith(1, updateCourseDto);
    });
  });

  describe('deleteCourse', () => {
    it('should delete a course', async () => {
      mockAppService.deleteCourse.mockResolvedValue({ message: 'Course deleted' });

      const result = await controller.deleteCourse('1');
      expect(result).toEqual({ message: 'Course deleted' });
      expect(appService.deleteCourse).toHaveBeenCalledWith(1);
    });
  });

  describe('updateCourseCapacity', () => {
    it('should update course capacity', async () => {
      mockAppService.updateCourseCapacity.mockResolvedValue(mockCourse);

      const result = await controller.updateCourseCapacity('1', 50);
      expect(result).toEqual(mockCourse);
      expect(appService.updateCourseCapacity).toHaveBeenCalledWith(1, 50);
    });
  });

  // Enrollment endpoints
  describe('getAllEnrollments', () => {
    it('should return all enrollments', async () => {
      const enrollments = [mockEnrollment];
      mockAppService.getAllEnrollments.mockResolvedValue(enrollments);

      const result = await controller.getAllEnrollments();
      expect(result).toEqual(enrollments);
      expect(appService.getAllEnrollments).toHaveBeenCalled();
    });
  });

  describe('getEnrollmentsByStudent', () => {
    it('should return enrollments by student', async () => {
      const enrollments = [mockEnrollment];
      mockAppService.getEnrollmentsByStudent.mockResolvedValue(enrollments);

      const result = await controller.getEnrollmentsByStudent('1');
      expect(result).toEqual(enrollments);
      expect(appService.getEnrollmentsByStudent).toHaveBeenCalledWith(1);
    });
  });

  describe('getEnrollmentsByCourse', () => {
    it('should return enrollments by course', async () => {
      const enrollments = [mockEnrollment];
      mockAppService.getEnrollmentsByCourse.mockResolvedValue(enrollments);

      const result = await controller.getEnrollmentsByCourse('1');
      expect(result).toEqual(enrollments);
      expect(appService.getEnrollmentsByCourse).toHaveBeenCalledWith(1);
    });
  });

  describe('createEnrollment', () => {
    it('should create an enrollment', async () => {
      const createEnrollmentDto = { studentId: 1, courseId: 1, capacity: 30 };
      mockAppService.createEnrollment.mockResolvedValue(mockEnrollment);

      const result = await controller.createEnrollment(createEnrollmentDto);
      expect(result).toEqual(mockEnrollment);
      expect(appService.createEnrollment).toHaveBeenCalledWith(createEnrollmentDto);
    });

    it('should throw BadRequestException if course is full', async () => {
      const createEnrollmentDto = { studentId: 1, courseId: 1, capacity: 30 };
      const error = {
        response: {
          data: { message: 'No es posible hacer la inscirpción, el curso está sin cupos' },
        },
      };
      mockAppService.createEnrollment.mockRejectedValue(error);

      await expect(controller.createEnrollment(createEnrollmentDto)).rejects.toThrow(
        new BadRequestException('No es posible hacer la inscirpción, el curso está sin cupos'),
      );
      expect(appService.createEnrollment).toHaveBeenCalledWith(createEnrollmentDto);
    });
  });

  describe('deleteEnrollment', () => {
    it('should delete an enrollment', async () => {
      mockAppService.deleteEnrollment.mockResolvedValue({ message: 'Enrollment deleted' });

      const result = await controller.deleteEnrollment('1', '1');
      expect(result).toEqual({ message: 'Enrollment deleted' });
      expect(appService.deleteEnrollment).toHaveBeenCalledWith(1, 1);
    });
  });

  // Comprehensive views
  describe('getStudentDetails', () => {
    it('should return student details', async () => {
      const studentDetails = { student: mockStudent, courses: [mockCourse] };
      mockAppService.getStudentDetails.mockResolvedValue(studentDetails);

      const result = await controller.getStudentDetails('1');
      expect(result).toEqual(studentDetails);
      expect(appService.getStudentDetails).toHaveBeenCalledWith(1);
    });
  });

  describe('getCourseDetails', () => {
    it('should return course details', async () => {
      const courseDetails = { course: mockCourse, enrollmentCount: 1, students: [mockStudent] };
      mockAppService.getCourseDetails.mockResolvedValue(courseDetails);

      const result = await controller.getCourseDetails('1');
      expect(result).toEqual(courseDetails);
      expect(appService.getCourseDetails).toHaveBeenCalledWith(1);
    });
  });
});