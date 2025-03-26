import { IsEmail, IsNotEmpty, IsOptional, IsString, IsDateString, IsIn } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty({ message: 'First name is required' })
  @IsString({ message: 'First name must be a string' })
  firstName: string;

  @IsNotEmpty({ message: 'Last name is required' })
  @IsString({ message: 'Last name must be a string' })
  lastName: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsOptional()
  @IsString({ message: 'Phone must be a string' })
  phone?: string;

  @IsOptional()
  @IsString({ message: 'Address must be a string' })
  address?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Date of birth must be a valid ISO 8601 date string' })
  dateOfBirth?: string;

  @IsOptional()
  @IsString({ message: 'Gender must be a string' })
  @IsIn(['Male', 'Female', 'Other'], { message: 'Gender must be Male, Female, or Other' })
  gender?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Enrollment date must be a valid ISO 8601 date string' })
  enrollmentDate?: string;

  @IsOptional()
  @IsString({ message: 'Status must be a string' })
  @IsIn(['Active', 'Inactive'], { message: 'Status must be Active or Inactive' })
  status?: string;
}