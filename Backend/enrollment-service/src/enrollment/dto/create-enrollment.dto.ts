// backend/enrollment-service/src/enrollment/dto/create-enrollment.dto.ts
import { IsNotEmpty, IsNumber,IsInt,Min } from 'class-validator';

export class CreateEnrollmentDto {
  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @IsNotEmpty()
  @IsNumber()
  courseId: number;

  @IsInt()
  @Min(1)
  capacity: number;


}

export class CreateEnrrollmentCountDto{
 
  @IsInt()
  @Min(1)
  capacity: number;
}

