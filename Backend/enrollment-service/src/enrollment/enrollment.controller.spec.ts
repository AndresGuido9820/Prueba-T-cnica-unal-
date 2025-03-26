import { Test, TestingModule } from '@nestjs/testing';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { BadRequestException } from '@nestjs/common';

describe('EnrollmentController', () => {
  let controller: EnrollmentController;
  let enrollmentService: EnrollmentService;

  const mockEnrollmentService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByStudent: jest.fn(),
    findByCourse: jest.fn(),
    remove: jest.fn(),
    updateCourseCapacity: jest.fn(),
  };

  const mockEnrollment = {
    id: 1,
    studentId: 1,
    courseId: 1,
    enrolledAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnrollmentController],
      providers: [{ provide: EnrollmentService, useValue: mockEnrollmentService }],
    }).compile();

    controller = module.get<EnrollmentController>(EnrollmentController);
    enrollmentService = module.get<EnrollmentService>(EnrollmentService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an enrollment', async () => {
      const createEnrollmentDto: CreateEnrollmentDto = {
        studentId: 1,
        courseId: 1,
        capacity: 30,
      };
      mockEnrollmentService.create.mockResolvedValue(mockEnrollment);

      const result = await controller.create(createEnrollmentDto);
      expect(result).toEqual(mockEnrollment);
      expect(enrollmentService.create).toHaveBeenCalledWith(createEnrollmentDto);
    });

    it('should throw BadRequestException if course is full', async () => {
      const createEnrollmentDto: CreateEnrollmentDto = {
        studentId: 1,
        courseId: 1,
        capacity: 30,
      };
      mockEnrollmentService.create.mockRejectedValue(new Error('Course is full'));

      await expect(controller.create(createEnrollmentDto)).rejects.toThrow(
        new BadRequestException('No es posible hacer la inscirpción, el curso está sin cupos'),
      );
      expect(enrollmentService.create).toHaveBeenCalledWith(createEnrollmentDto);
    });
  });

  describe('findAll', () => {
    it('should return all enrollments', async () => {
      const enrollments = [mockEnrollment];
      mockEnrollmentService.findAll.mockResolvedValue(enrollments);

      const result = await controller.findAll();
      expect(result).toEqual(enrollments);
      expect(enrollmentService.findAll).toHaveBeenCalled();
    });
  });

  describe('findByStudent', () => {
    it('should return enrollments by student', async () => {
      const enrollments = [mockEnrollment];
      mockEnrollmentService.findByStudent.mockResolvedValue(enrollments);

      const result = await controller.findByStudent('1');
      expect(result).toEqual(enrollments);
      expect(enrollmentService.findByStudent).toHaveBeenCalledWith(1);
    });
  });

  describe('findByCourse', () => {
    it('should return enrollments by course', async () => {
      const enrollments = [mockEnrollment];
      mockEnrollmentService.findByCourse.mockResolvedValue(enrollments);

      const result = await controller.findByCourse('1');
      expect(result).toEqual(enrollments);
      expect(enrollmentService.findByCourse).toHaveBeenCalledWith(1);
    });
  });

  describe('remove', () => {
    it('should remove an enrollment', async () => {
      mockEnrollmentService.remove.mockResolvedValue(mockEnrollment);

      const result = await controller.remove('1', '1');
      expect(result).toEqual(mockEnrollment);
      expect(enrollmentService.remove).toHaveBeenCalledWith(1, 1);
    });
  });

  describe('updateCourseCapacity', () => {
    it('should update course capacity', async () => {
      const updatedCapacity = { courseId: 1, capacity: 50, count: 5 };
      mockEnrollmentService.updateCourseCapacity.mockResolvedValue(updatedCapacity);

      const result = await controller.updateCourseCapacity('1', 50);
      expect(result).toEqual(updatedCapacity);
      expect(enrollmentService.updateCourseCapacity).toHaveBeenCalledWith(1, 50);
    });
  });
});