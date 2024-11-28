/* eslint-disable prettier/prettier */
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  readonly code: string;

  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  @IsEnum(['live', 'pre-recorded', 'tutored'], { message: 'Invalid modality' })
  readonly modality: string; // "live", "pre-recorded", "tutored"

  @IsString()
  readonly duration: string;

  @IsString()
  readonly status: string;
}
