// backend/enrollment-service/src/enrollment/enrollment.controller.ts
import { Controller, Get, Post, Body, Param, Delete, BadRequestException,Put} from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto,CreateEnrrollmentCountDto } from './dto/create-enrollment.dto';

@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  async create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    console.log(createEnrollmentDto)
    try {
      return await this.enrollmentService.create(createEnrollmentDto);
    } catch (error) {
      if (error.message === 'Course is full') {
        throw new BadRequestException('No es posible hacer la inscirpción, el curso está sin cupos');
      }
      throw error;
    }
  }

  @Get()
  async findAll() {
    console.log("ya tu sabe beibi")
    return this.enrollmentService.findAll();
  }

  @Get('student/:id')
  async findByStudent(@Param('id') id: string) {
    return this.enrollmentService.findByStudent(+id);
  }

  @Get('course/:id')
  async findByCourse(@Param('id') id: string) {
    return this.enrollmentService.findByCourse(+id);
  }

  @Delete(':studentId/:courseId')
  async remove(@Param('studentId') studentId: string, @Param('courseId') courseId: string) {
    return this.enrollmentService.remove(+studentId, +courseId);
  }
  @Put('course/:id')
async updateCourseCapacity(
  @Param('id') id: string, 
  @Body('capacity') capacity: number, 
) {
  console.log("enrolll")
  return this.enrollmentService.updateCourseCapacity(Number(id), capacity); 
}
}