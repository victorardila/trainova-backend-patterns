import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  readonly id?: string;

  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly username?: string;

  @IsOptional()
  @IsString()
  readonly password?: string;

  @IsOptional()
  @IsNumber()
  readonly money?: number;

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
