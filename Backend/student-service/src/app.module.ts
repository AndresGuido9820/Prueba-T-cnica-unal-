// backend/student-service/src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { PrismaService } from '../prisma/pirsma.service';

@Module({
  imports: [StudentModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}