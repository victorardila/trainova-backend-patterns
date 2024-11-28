import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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
  readonly academicProgram?: string;

  @IsOptional()
  @IsEnum(['beca', 'votaciones', 'descendencia'], {
    message: 'Invalid discount type',
  })
  readonly tipoDescuento?: string;

  @IsOptional()
  @IsNumber()
  readonly saldoPagar?: number;

  @IsOptional()
  @IsNumber()
  readonly creditosAcumulados?: number;
}
