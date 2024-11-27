/* eslint-disable prettier/prettier */
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class ReadStudentDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly academicProgram: string;

  @IsEnum(['beca', 'votaciones', 'descendencia'], { message: 'Invalid discount type' })
  readonly tipoDescuento: string;

  @IsNumber()
  readonly saldoPagar: number;

  @IsNumber()
  readonly creditosAcumulados: number;

  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsNumber()
  readonly money: number;
}
