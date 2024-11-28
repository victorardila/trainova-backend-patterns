/* eslint-disable prettier/prettier */
import {
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  IsUrl,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly id?: string; // ID del usuario (no es necesario modificarlo, pero puede ser actualizado si es necesario)

  @IsOptional()
  @IsEnum(['admin', 'user', 'moderator'], {
    message: 'Role must be one of the following: admin, user, moderator',
  })
  readonly role?: string; // Rol del usuario, opcional para actualizaciones

  @IsOptional()
  @IsString()
  @MinLength(4, { message: 'Username must be at least 4 characters long' }) // Validación opcional para el nombre de usuario
  readonly username?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' }) // Validación opcional para la contraseña
  readonly password?: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'Profile image must be a valid URL' }) // Validación opcional para la URL de la imagen de perfil
  readonly profileImage?: string; // Imagen de perfil, opcional en la actualización
}
