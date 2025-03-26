import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/pirsma.service';
import { CreateStudentDto, UpdateStudentDto } from './DTO';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async create(createStudentDto: CreateStudentDto) {
    return this.prisma.student.create({
      data: {
        ...createStudentDto,
        dateOfBirth: createStudentDto.dateOfBirth ? new Date(createStudentDto.dateOfBirth) : null,
      },
    });
  }

  async findAll() {
    console.log("5")
    return this.prisma.student.findMany();
  }

  async findOne(id: number) {
    return this.prisma.student.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.prisma.student.update({
      where: { id },
      data: {
        ...updateStudentDto,
        dateOfBirth: updateStudentDto.dateOfBirth ? new Date(updateStudentDto.dateOfBirth) : undefined,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.student.delete({
      where: { id },
    });
  }
}