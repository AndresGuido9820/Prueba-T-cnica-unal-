import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { PrismaService } from '../../prisma/pirsma.service';
import { CreateStudentDto, UpdateStudentDto } from './DTO';

describe('StudentService', () => {
  let service: StudentService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    student: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
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
      providers: [
        StudentService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a student with dateOfBirth', async () => {
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
      mockPrismaService.student.create.mockResolvedValue(mockStudent);

      const result = await service.create(createStudentDto);
      expect(result).toEqual(mockStudent);
      expect(prismaService.student.create).toHaveBeenCalledWith({
        data: {
          ...createStudentDto,
          dateOfBirth: new Date(createStudentDto.dateOfBirth||0),
        },
      });
    });

    it('should create a student without dateOfBirth', async () => {
      const createStudentDto: CreateStudentDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        address: '123 Main St',
        gender: 'Male',
        enrollmentDate: '2023-01-01',
        status: 'Active',
      };
      mockPrismaService.student.create.mockResolvedValue(mockStudent);

      const result = await service.create(createStudentDto);
      expect(result).toEqual(mockStudent);
      expect(prismaService.student.create).toHaveBeenCalledWith({
        data: {
          ...createStudentDto,
          dateOfBirth: null,
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return all students', async () => {
      const students = [mockStudent];
      mockPrismaService.student.findMany.mockResolvedValue(students);

      const result = await service.findAll();
      expect(result).toEqual(students);
      expect(prismaService.student.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a student by id', async () => {
      mockPrismaService.student.findUnique.mockResolvedValue(mockStudent);

      const result = await service.findOne(1);
      expect(result).toEqual(mockStudent);
      expect(prismaService.student.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('update', () => {
    it('should update a student with dateOfBirth', async () => {
      const updateStudentDto: UpdateStudentDto = {
        firstName: 'Jane',
        dateOfBirth: '2000-01-02',
      };
      const updatedStudent = { ...mockStudent, ...updateStudentDto, dateOfBirth: new Date('2000-01-02') };
      mockPrismaService.student.update.mockResolvedValue(updatedStudent);

      const result = await service.update(1, updateStudentDto);
      expect(result).toEqual(updatedStudent);
      expect(prismaService.student.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          ...updateStudentDto,
          dateOfBirth: new Date(updateStudentDto.dateOfBirth||0),
        },
      });
    });

    it('should update a student without dateOfBirth', async () => {
      const updateStudentDto: UpdateStudentDto = {
        firstName: 'Jane',
      };
      const updatedStudent = { ...mockStudent, ...updateStudentDto };
      mockPrismaService.student.update.mockResolvedValue(updatedStudent);

      const result = await service.update(1, updateStudentDto);
      expect(result).toEqual(updatedStudent);
      expect(prismaService.student.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          ...updateStudentDto,
          dateOfBirth: undefined,
        },
      });
    });
  });

  describe('remove', () => {
    it('should delete a student', async () => {
      mockPrismaService.student.delete.mockResolvedValue(mockStudent);

      const result = await service.remove(1);
      expect(result).toEqual(mockStudent);
      expect(prismaService.student.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});