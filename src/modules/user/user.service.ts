import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema'; // Esquema de usuario
import * as mongoose from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto'; // DTO para la creación de usuarios

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<typeof User>, // Modelo basado en el esquema de usuario
  ) {}

  // Obtener todos los usuarios
  async findAll(): Promise<any[]> {
    const users = await this.userModel.find();
    return users;
  }

  // Crear un usuario
  async create(createUserDto: CreateUserDto): Promise<any> {
    const { username } = createUserDto;

    // Verifica si ya existe un usuario con el mismo nombre de usuario
    const existingUser = await this.userModel.findOne({ username });
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  // Buscar un usuario por su ID
  async findById(id: string): Promise<any> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Buscar un usuario por su nombre de usuario (username)
  async findByUsername(username: string): Promise<any> {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Actualizar un usuario por su ID
  async updateById(id: string, updateUserDto: any): Promise<any> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  // Eliminar un usuario por su ID
  async deleteById(id: string): Promise<any> {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Obtener un usuario por su rol
  async findByRole(role: string): Promise<any[]> {
    const users = await this.userModel.find({ role });
    return users;
  }

  // Método para obtener la estructura de un usuario con su rol
  async getUserWithRoleStructure(userId: string): Promise<any> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Si el usuario tiene un rol o relaciones jerárquicas, puedes implementarlo aquí
    const roleStructure = await this.buildRoleHierarchy(userId);

    return { ...user.toObject(), roleStructure };
  }

  // Lógica para construir la jerarquía de roles o relaciones del usuario
  private async buildRoleHierarchy(userId: string) {
    // Implementa la lógica de jerarquía según el rol del usuario
    // Por ejemplo, si los usuarios tienen relaciones jerárquicas, roles o entidades relacionadas
    const relatedUsers = await this.userModel.find({ parentId: userId }).exec();

    const relatedItems = [];

    for (const relatedUser of relatedUsers) {
      const relatedUserObject = relatedUser.toObject();
      relatedItems.push(relatedUserObject);
    }

    return relatedItems;
  }
}
