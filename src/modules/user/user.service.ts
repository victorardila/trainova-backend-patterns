import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema'; // Esquema de usuario
import * as mongoose from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto'; // DTO para la creación de usuarios
import { UpdateUserDto } from './dto/update-user.dto'; // DTO para la actualización de usuarios

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<typeof User>, // Modelo basado en el esquema de usuario
    private jwtService: JwtService,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ total: number; page: number; limit: number; data: any[] }> {
    const skip = (page - 1) * limit;
    const users = await this.userModel.find().skip(skip).limit(limit);
    const total = await this.userModel.countDocuments();
    return {
      total,
      page,
      limit,
      data: users,
    };
  }

  // Crear un usuario
  async create(createUserDto: CreateUserDto): Promise<any> {
    const { username, password } = createUserDto;

    // Verifica si ya existe un usuario con el mismo nombre de usuario
    const existingUser = await this.userModel.findOne({ username });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    // Guardar el usuario en la base de datos
    await createdUser.save();

    // Generar un token
    const token = this.jwtService.sign({
      id: createdUser._id,
      username: createUserDto.username,
    });
    console.log('Token:', token);

    // Retornar el usuario creado junto con el token
    return {
      user: createdUser,
      token,
    };
  }

  async findById(id: string): Promise<any> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException('Invalid ID format');
    }

    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      success: true,
      data: user,
    };
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
  async updateById(id: string, updateUserDto: UpdateUserDto): Promise<any> {
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
    if (!users.length) {
      throw new NotFoundException('No users found with the specified role');
    }
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
  private async buildRoleHierarchy(userId: string): Promise<any[]> {
    // Encuentra los usuarios relacionados con el ID proporcionado
    const relatedUsers = await this.userModel
      .find({ parentId: userId })
      .populate('parentId') // Si tienes un campo relacionado
      .exec();
    return relatedUsers.map((user) => user.toObject());
  }
}
