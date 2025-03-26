
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEnrollmentDto, CreateEnrrollmentCountDto} from './dto/create-enrollment.dto';

@Injectable()
export class EnrollmentService {
  constructor(private prisma: PrismaService) {}

  async create(createEnrollmentDto: CreateEnrollmentDto) {

    const courseEnrollment = await this.prisma.courseEnrollmentCount.findUnique({
      where: { courseId: createEnrollmentDto.courseId },
    });

    if (!courseEnrollment) {
  
      await this.prisma.courseEnrollmentCount.create({
        data: {
          courseId: createEnrollmentDto.courseId,
          count: 0,
          capacity: createEnrollmentDto.capacity, // Default capacity
        },
      });
    } else if (courseEnrollment.count >= courseEnrollment.capacity) {
      throw new Error('Course is full');
    }

  
    return this.prisma.$transaction(async (prisma) => {
      const { capacity, ...enrollmentData } = createEnrollmentDto; 
      const enrollment = await prisma.enrollment.create({
        data: enrollmentData,
      });

      await prisma.courseEnrollmentCount.upsert({
        where: { courseId: createEnrollmentDto.courseId },
        update: { count: { increment: 1 } },
        create: {
          courseId: createEnrollmentDto.courseId,
          count: 1,
          capacity: 30, 
        },
      });

      return enrollment;
    });
  }

  async findAll() {
    return this.prisma.enrollment.findMany();
  }

  async findByStudent(studentId: number) {
    return this.prisma.enrollment.findMany({
      where: { studentId },
    });
  }

  async findByCourse(courseId: number) {
    return this.prisma.enrollment.findMany({
      where: { courseId },
    });
  }

  async remove(studentId: number, courseId: number) {
   
    return this.prisma.$transaction(async (prisma) => {
      const enrollment = await prisma.enrollment.delete({
        where: {
          studentId_courseId: {
            studentId,
            courseId,
          },
        },
      });

      await prisma.courseEnrollmentCount.update({
        where: { courseId },
        data: { count: { decrement: 1 } },
      });

      return enrollment;
    });
  }

  async updateCourseCapacity(courseId: number, capacity: number) {
    return this.prisma.courseEnrollmentCount.upsert({
      where: { courseId },
      update: { capacity },
      create: {
        courseId,
        capacity,
        count: 0,
      },
    });
  }
}