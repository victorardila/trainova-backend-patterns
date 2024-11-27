/* eslint-disable prettier/prettier */


import { IsString, IsOptional } from 'class-validator';

export class CreateContentDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly course: string; // ID del curso

  @IsOptional()
  @IsString()
  readonly parent?: string; // ID de la unidad padre, si es subunidad
}
