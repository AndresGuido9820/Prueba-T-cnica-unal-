import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCourseDto, UpdateCourseDto } from './dto';

describe('CourseService', () => {
  let service: CourseService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    course: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  const mockCourse = { id: 1, name: 'Test Course', capacity: 30 };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a course', async () => {
      const createCourseDto: CreateCourseDto = { name: 'Test Course', capacity: 30 };
      mockPrismaService.course.create.mockResolvedValue(mockCourse);

      const result = await service.create(createCourseDto);
      expect(result).toEqual(mockCourse);
      expect(prismaService.course.create).toHaveBeenCalledWith({
        data: createCourseDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return all courses', async () => {
      const courses = [mockCourse];
      mockPrismaService.course.findMany.mockResolvedValue(courses);

      const result = await service.findAll();
      expect(result).toEqual(courses);
      expect(prismaService.course.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a course by id', async () => {
      mockPrismaService.course.findUnique.mockResolvedValue(mockCourse);

      const result = await service.findOne(1);
      expect(result).toEqual(mockCourse);
      expect(prismaService.course.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('update', () => {
    it('should update a course', async () => {
      const updateCourseDto: UpdateCourseDto = { name: 'Updated Course' };
      const updatedCourse = { ...mockCourse, ...updateCourseDto };
      mockPrismaService.course.update.mockResolvedValue(updatedCourse);

      const result = await service.update(1, updateCourseDto);
      expect(result).toEqual(updatedCourse);
      expect(prismaService.course.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateCourseDto,
      });
    });
  });

  describe('remove', () => {
    it('should delete a course', async () => {
      mockPrismaService.course.delete.mockResolvedValue(mockCourse);

      const result = await service.remove(1);
      expect(result).toEqual(mockCourse);
      expect(prismaService.course.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('updateCapacity', () => {
    it('should update the capacity of a course', async () => {
      const updatedCourse = { ...mockCourse, capacity: 50 };
      mockPrismaService.course.update.mockResolvedValue(updatedCourse);

      const result = await service.updateCapacity(1, 50);
      expect(result).toEqual(updatedCourse);
      expect(prismaService.course.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { capacity: 50 },
      });
    });
  });
});