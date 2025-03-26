// backend/gateway/src/app.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, BadRequestException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Student endpoints
  @Get('students')
  async getAllStudents() {
    console.log("holaaaaaaaaaaaaaaaaa")
    return this.appService.getAllStudents();
  }

  @Get('students/:id')
  async getStudentById(@Param('id') id: string) {
    return this.appService.getStudentById(+id);
  }

  @Post('students')
  async createStudent(@Body() createStudentDto: any) {
    return this.appService.createStudent(createStudentDto);
  }

  @Put('students/:id')
  async updateStudent(@Param('id') id: string, @Body() updateStudentDto: any) {
    return this.appService.updateStudent(+id, updateStudentDto);
  }

  @Delete('students/:id')
  async deleteStudent(@Param('id') id: string) {
    return this.appService.deleteStudent(+id);
  }

  // Course endpoints
  @Get('courses')
  async getAllCourses() {
    console.log("1")
    return this.appService.getAllCourses();
  }

  @Get('courses/:id')
  async getCourseById(@Param('id') id: string) {
    return this.appService.getCourseById(+id);
  }

  @Post('courses')
  async createCourse(@Body() createCourseDto: any) {
    return this.appService.createCourse(createCourseDto);
  }

  @Put('courses/:id')
  async updateCourse(@Param('id') id: string, @Body() updateCourseDto: any) {
    return this.appService.updateCourse(+id, updateCourseDto);
  }

  @Delete('courses/:id')
  async deleteCourse(@Param('id') id: string) {
    return this.appService.deleteCourse(+id);
    // backend/gateway/src/app.controller.ts (continued)

}
@Put('courses/:id/capacity')
  async updateCourseCapacity(@Param('id') id: string, @Body('capacity') capacity: number) {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaa")
    return this.appService.updateCourseCapacity(+id, capacity);
  }

  // Enrollment endpoints
  @Get('enrollments')
  async getAllEnrollments() {
    return this.appService.getAllEnrollments();
  }

  @Get('enrollments/student/:id')
  async getEnrollmentsByStudent(@Param('id') id: string) {
    return this.appService.getEnrollmentsByStudent(+id);
  }

  @Get('enrollments/course/:id')
  async getEnrollmentsByCourse(@Param('id') id: string) {
    return this.appService.getEnrollmentsByCourse(+id);
  }

  @Post('enrollments')
  async createEnrollment(@Body() createEnrollmentDto: any) {
    try {
      console.log(createEnrollmentDto);
      return await this.appService.createEnrollment(createEnrollmentDto);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message === 'No es posible hacer la inscirpción, el curso está sin cupos') {
        throw new BadRequestException('No es posible hacer la inscirpción, el curso está sin cupos');
      }
      throw error;
    }
  }

  @Delete('enrollments/:studentId/:courseId')
  async deleteEnrollment(@Param('studentId') studentId: string, @Param('courseId') courseId: string) {
    return this.appService.deleteEnrollment(+studentId, +courseId);
  }

  // Comprehensive views
  @Get('student-details/:id')
  async getStudentDetails(@Param('id') id: string) {
    return this.appService.getStudentDetails(+id);
  }

  @Get('course-details/:id')
  async getCourseDetails(@Param('id') id: string) {
    return this.appService.getCourseDetails(+id);
  }


}//llllll