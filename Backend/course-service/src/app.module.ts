// backend/course-service/src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './couser/course.module';
import { PrismaService } from '../prisma/prisma.service';


@Module({
  imports: [CourseModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}