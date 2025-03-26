import { Controller, Get, Post, Body, Param, Put, Delete, BadRequestException } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto, UpdateStudentDto } from './DTO';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    console.log("desde francia");
    return this.studentService.create(createStudentDto);
  }

  @Get()
  async findAll() {
    console.log("4");
    return this.studentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const student = await this.studentService.findOne(+id);
    if (!student) {
      throw new BadRequestException('Student not found');
    }
    return student;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}