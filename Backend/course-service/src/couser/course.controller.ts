import { Controller, Get, Post, Body, Param, Put, Delete, BadRequestException } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto, UpdateCourseDto } from './dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  async findAll() {
    console.log("4")
    return this.courseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const course = await this.courseService.findOne(+id);
    if (!course) {
      throw new BadRequestException('Course not found');
    }
    return course;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }

  @Put(':id/capacity')
  async updateCapacity(@Param('id') id: string, @Body('capacity') capacity: number) {
    return this.courseService.updateCapacity(+id, capacity);
  }
}