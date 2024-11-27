/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsNumber()
  @IsNotEmpty()
  readonly money: number;
  
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly academicProgram: string;

  @IsOptional()
  @IsEnum(['beca', 'votaciones', 'descendencia'], { message: 'Invalid discount type' })
  @IsNotEmpty()
  readonly tipoDescuento: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  readonly saldoPagar: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  readonly creditosAcumulados: number;
}
