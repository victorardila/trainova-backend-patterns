/* eslint-disable prettier/prettier */

import { IsEnum, IsOptional, IsString } from "class-validator";


export class UpdateCourseDto {
    @IsString()
    @IsOptional()
    readonly name: string;
  
    @IsString()
    @IsOptional()
    @IsEnum(['live', 'pre-recorded', 'tutored'], { message: 'Invalid modality' })
    readonly modality: string; // "live", "pre-recorded", "tutored"
  
    @IsString()
    @IsOptional()
    readonly duration: string;
  
    @IsString()
    @IsOptional()
    readonly status: string;
}
