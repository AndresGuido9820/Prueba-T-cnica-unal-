// backend/course-service/src/course/course.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCourseDto, UpdateCourseDto } from './dto';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    return this.prisma.course.create({
      data: createCourseDto,
    });
  }

  async findAll() {
    console.log("wtf")
    return this.prisma.course.findMany();
  }

  async findOne(id: number) {
    return this.prisma.course.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  async remove(id: number) {
    return this.prisma.course.delete({
      where: { id },
    });
  }

  async updateCapacity(id: number, capacity: number) {
    return this.prisma.course.update({
      where: { id },
      data: { capacity },
    });}}