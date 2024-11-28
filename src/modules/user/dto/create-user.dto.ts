import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsUrl,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string; // ID del usuario, por ejemplo, un UUID

  @IsOptional()
  @IsEnum(['admin', 'user', 'moderator'], {
    message: 'Role must be one of the following: admin, user, moderator',
  })
  readonly role?: string; // Rol del usuario, por ejemplo: admin, user, moderator

  @IsString()
  @IsNotEmpty()
  @MinLength(4, { message: 'Username must be at least 4 characters long' }) // Validación para el nombre de usuario
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' }) // Validación para la contraseña
  password: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'Profile image must be a valid URL' }) // Validación para la URL de la imagen del perfil
  readonly profileImage?: string; // Imagen de perfil, opcional y puede ser una URL
}
