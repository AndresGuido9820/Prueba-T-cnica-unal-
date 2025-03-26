import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { CreateStudentDto, UpdateStudentDto } from './DTO';
import { BadRequestException } from '@nestjs/common';

describe('StudentController', () => {
  let controller: StudentController;
  let studentService: StudentService;

  const mockStudentService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockStudent = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    address: '123 Main St',
    dateOfBirth: new Date('2000-01-01'),
    gender: 'Male',
    enrollmentDate: new Date('2023-01-01'),
    status: 'Active',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [{ provide: StudentService, useValue: mockStudentService }],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    studentService = module.get<StudentService>(StudentService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a student', async () => {
      const createStudentDto: CreateStudentDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        address: '123 Main St',
        dateOfBirth: '2000-01-01',
        gender: 'Male',
        enrollmentDate: '2023-01-01',
        status: 'Active',
      };
      mockStudentService.create.mockResolvedValue(mockStudent);

      const result = await controller.create(createStudentDto);
      expect(result).toEqual(mockStudent);
      expect(studentService.create).toHaveBeenCalledWith(createStudentDto);
    });
  });

  describe('findAll', () => {
    it('should return all students', async () => {
      const students = [mockStudent];
      mockStudentService.findAll.mockResolvedValue(students);

      const result = await controller.findAll();
      expect(result).toEqual(students);
      expect(studentService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a student by id', async () => {
      mockStudentService.findOne.mockResolvedValue(mockStudent);

      const result = await controller.findOne('1');
      expect(result).toEqual(mockStudent);
      expect(studentService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw BadRequestException if student not found', async () => {
      mockStudentService.findOne.mockResolvedValue(null);

      await expect(controller.findOne('1')).rejects.toThrow(
        new BadRequestException('Student not found'),
      );
      expect(studentService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a student', async () => {
      const updateStudentDto: UpdateStudentDto = {
        firstName: 'Jane',
        dateOfBirth: '2000-01-02',
      };
      const updatedStudent = { ...mockStudent, ...updateStudentDto };
      mockStudentService.update.mockResolvedValue(updatedStudent);

      const result = await controller.update('1', updateStudentDto);
      expect(result).toEqual(updatedStudent);
      expect(studentService.update).toHaveBeenCalledWith(1, updateStudentDto);
    });
  });

  describe('remove', () => {
    it('should delete a student', async () => {
      mockStudentService.remove.mockResolvedValue(mockStudent);

      const result = await controller.remove('1');
      expect(result).toEqual(mockStudent);
      expect(studentService.remove).toHaveBeenCalledWith(1);
    });
  });
});