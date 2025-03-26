import { Test, TestingModule } from '@nestjs/testing';
import { EnrollmentService } from './enrollment.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

describe('EnrollmentService', () => {
  let service: EnrollmentService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    courseEnrollmentCount: {
      findUnique: jest.fn(),
      create: jest.fn(),
      upsert: jest.fn(),
      update: jest.fn(),
    },
    enrollment: {
      create: jest.fn(),
      findMany: jest.fn(),
      delete: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  const mockEnrollment = {
    id: 1,
    studentId: 1,
    courseId: 1,
    enrolledAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCourseEnrollmentCount = {
    id: 1,
    courseId: 1,
    count: 5,
    capacity: 30,
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnrollmentService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<EnrollmentService>(EnrollmentService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an enrollment when course is not full', async () => {
      const createEnrollmentDto: CreateEnrollmentDto = {
        studentId: 1,
        courseId: 1,
        capacity: 30,
      };
      mockPrismaService.courseEnrollmentCount.findUnique.mockResolvedValue({
        courseId: 1,
        count: 5,
        capacity: 30,
      });
      mockPrismaService.$transaction.mockImplementation(async (callback) => {
        const mockPrismaInTransaction = {
          enrollment: { create: jest.fn().mockResolvedValue(mockEnrollment) },
          courseEnrollmentCount: {
            upsert: jest.fn().mockResolvedValue(mockCourseEnrollmentCount),
          },
        };
        return callback(mockPrismaInTransaction);
      });

      const result = await service.create(createEnrollmentDto);
      expect(result).toEqual(mockEnrollment);
      expect(prismaService.courseEnrollmentCount.findUnique).toHaveBeenCalledWith({
        where: { courseId: createEnrollmentDto.courseId },
      });
      expect(prismaService.$transaction).toHaveBeenCalled();
    });

    it('should create a course enrollment count if it does not exist', async () => {
      const createEnrollmentDto: CreateEnrollmentDto = {
        studentId: 1,
        courseId: 1,
        capacity: 30,
      };
      mockPrismaService.courseEnrollmentCount.findUnique.mockResolvedValue(null);
      mockPrismaService.courseEnrollmentCount.create.mockResolvedValue(mockCourseEnrollmentCount);
      mockPrismaService.$transaction.mockImplementation(async (callback) => {
        const mockPrismaInTransaction = {
          enrollment: { create: jest.fn().mockResolvedValue(mockEnrollment) },
          courseEnrollmentCount: {
            upsert: jest.fn().mockResolvedValue(mockCourseEnrollmentCount),
          },
        };
        return callback(mockPrismaInTransaction);
      });

      const result = await service.create(createEnrollmentDto);
      expect(result).toEqual(mockEnrollment);
      expect(prismaService.courseEnrollmentCount.create).toHaveBeenCalledWith({
        data: {
          courseId: createEnrollmentDto.courseId,
          count: 0,
          capacity: createEnrollmentDto.capacity,
        },
      });
    });

    it('should throw an error if course is full', async () => {
      const createEnrollmentDto: CreateEnrollmentDto = {
        studentId: 1,
        courseId: 1,
        capacity: 30,
      };
      mockPrismaService.courseEnrollmentCount.findUnique.mockResolvedValue({
        courseId: 1,
        count: 30,
        capacity: 30,
      });

      await expect(service.create(createEnrollmentDto)).rejects.toThrow('Course is full');
    });
  });

  describe('findAll', () => {
    it('should return all enrollments', async () => {
      const enrollments = [mockEnrollment];
      mockPrismaService.enrollment.findMany.mockResolvedValue(enrollments);

      const result = await service.findAll();
      expect(result).toEqual(enrollments);
      expect(prismaService.enrollment.findMany).toHaveBeenCalled();
    });
  });

  describe('findByStudent', () => {
    it('should return enrollments by student', async () => {
      const enrollments = [mockEnrollment];
      mockPrismaService.enrollment.findMany.mockResolvedValue(enrollments);

      const result = await service.findByStudent(1);
      expect(result).toEqual(enrollments);
      expect(prismaService.enrollment.findMany).toHaveBeenCalledWith({
        where: { studentId: 1 },
      });
    });
  });

  describe('findByCourse', () => {
    it('should return enrollments by course', async () => {
      const enrollments = [mockEnrollment];
      mockPrismaService.enrollment.findMany.mockResolvedValue(enrollments);

      const result = await service.findByCourse(1);
      expect(result).toEqual(enrollments);
      expect(prismaService.enrollment.findMany).toHaveBeenCalledWith({
        where: { courseId: 1 },
      });
    });
  });

  describe('remove', () => {
    it('should remove an enrollment and decrement count', async () => {
      mockPrismaService.$transaction.mockImplementation(async (callback) => {
        const mockPrismaInTransaction = {
          enrollment: { delete: jest.fn().mockResolvedValue(mockEnrollment) },
          courseEnrollmentCount: {
            update: jest.fn().mockResolvedValue(mockCourseEnrollmentCount),
          },
        };
        return callback(mockPrismaInTransaction);
      });

      const result = await service.remove(1, 1);
      expect(result).toEqual(mockEnrollment);
      expect(prismaService.$transaction).toHaveBeenCalled();
    });
  });

  describe('updateCourseCapacity', () => {
    it('should update course capacity', async () => {
      mockPrismaService.courseEnrollmentCount.upsert.mockResolvedValue(mockCourseEnrollmentCount);

      const result = await service.updateCourseCapacity(1, 50);
      expect(result).toEqual(mockCourseEnrollmentCount);
      expect(prismaService.courseEnrollmentCount.upsert).toHaveBeenCalledWith({
        where: { courseId: 1 },
        update: { capacity: 50 },
        create: { courseId: 1, capacity: 50, count: 0 },
      });
    });
  });
}); 