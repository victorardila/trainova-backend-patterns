/* eslint-disable prettier/prettier */

import { IsString, IsOptional } from 'class-validator';

export class UpdateContentDto {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly parent?: string; // Nuevo padre, si aplica
}
