import {
  Controller,
  Put,
  Param,
  Body,
  Post,
  Get,
  Delete,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto'; // DTO para la creación de usuarios
import { UpdateUserDto } from './dto/update-user.dto'; // DTO para la actualización de usuarios

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Obtener todos los usuarios
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // Crear un nuevo usuario
  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto, // Se asume que CreateUserDto contiene la estructura para crear un usuario
  ): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  // Obtener un usuario por su ID
  @Get(':id')
  async getUser(
    @Param('id') id: string, // El ID del usuario
  ): Promise<User> {
    return this.usersService.findById(id);
  }

  // Obtener un usuario por su nombre de usuario
  @Get('username/:username')
  async getUserByUsername(
    @Param('username') username: string, // El nombre de usuario
  ): Promise<User> {
    return this.usersService.findByUsername(username);
  }

  // Actualizar un usuario por su ID
  @Put(':id')
  async updateUser(
    @Param('id') id: string, // El ID del usuario a actualizar
    @Body() updateUserDto: UpdateUserDto, // DTO para la actualización de usuarios
  ): Promise<User> {
    return this.usersService.updateById(id, updateUserDto);
  }

  // Eliminar un usuario por su ID
  @Delete(':id')
  async deleteUser(
    @Param('id') id: string, // El ID del usuario a eliminar
  ): Promise<User> {
    return this.usersService.deleteById(id);
  }

  // Obtener los usuarios por rol
  @Get('role/:role')
  async getUsersByRole(
    @Param('role') role: string, // El rol del usuario (ej. 'admin', 'student', 'teacher')
  ): Promise<User[]> {
    return this.usersService.findByRole(role);
  }

  // Obtener la estructura de un usuario con su rol
  @Get(':id/role-structure')
  async getUserWithRoleStructure(
    @Param('id') userId: string, // El ID del usuario para obtener su estructura de rol
  ): Promise<any> {
    return this.usersService.getUserWithRoleStructure(userId);
  }
}
