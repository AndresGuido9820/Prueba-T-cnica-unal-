import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CreateCourseDto, UpdateCourseDto } from './dto';
import { BadRequestException } from '@nestjs/common';

describe('CourseController', () => {
  let controller: CourseController;
  let courseService: CourseService;

  const mockCourseService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    updateCapacity: jest.fn(),
  };

  const mockCourse = { id: 1, name: 'Test Course', capacity: 30 };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [{ provide: CourseService, useValue: mockCourseService }],
    }).compile();

    controller = module.get<CourseController>(CourseController);
    courseService = module.get<CourseService>(CourseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a course', async () => {
      const createCourseDto: CreateCourseDto = { name: 'Test Course', capacity: 30 };
      mockCourseService.create.mockResolvedValue(mockCourse);

      const result = await controller.create(createCourseDto);
      expect(result).toEqual(mockCourse);
      expect(courseService.create).toHaveBeenCalledWith(createCourseDto);
    });
  });

  describe('findAll', () => {
    it('should return all courses', async () => {
      const courses = [mockCourse];
      mockCourseService.findAll.mockResolvedValue(courses);

      const result = await controller.findAll();
      expect(result).toEqual(courses);
      expect(courseService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a course by id', async () => {
      mockCourseService.findOne.mockResolvedValue(mockCourse);

      const result = await controller.findOne('1');
      expect(result).toEqual(mockCourse);
      expect(courseService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw BadRequestException if course not found', async () => {
      mockCourseService.findOne.mockResolvedValue(null);

      await expect(controller.findOne('1')).rejects.toThrow(BadRequestException);
      expect(courseService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a course', async () => {
      const updateCourseDto: UpdateCourseDto = { name: 'Updated Course' };
      const updatedCourse = { ...mockCourse, ...updateCourseDto };
      mockCourseService.update.mockResolvedValue(updatedCourse);

      const result = await controller.update('1', updateCourseDto);
      expect(result).toEqual(updatedCourse);
      expect(courseService.update).toHaveBeenCalledWith(1, updateCourseDto);
    });
  });

  describe('remove', () => {
    it('should delete a course', async () => {
      mockCourseService.remove.mockResolvedValue(mockCourse);

      const result = await controller.remove('1');
      expect(result).toEqual(mockCourse);
      expect(courseService.remove).toHaveBeenCalledWith(1);
    });
  });

  describe('updateCapacity', () => {
    it('should update the capacity of a course', async () => {
      const updatedCourse = { ...mockCourse, capacity: 50 };
      mockCourseService.updateCapacity.mockResolvedValue(updatedCourse);

      const result = await controller.updateCapacity('1', 50);
      expect(result).toEqual(updatedCourse);
      expect(courseService.updateCapacity).toHaveBeenCalledWith(1, 50);
    });
  });
});