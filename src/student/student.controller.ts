/* eslint-disable prettier/prettier */
import { Controller, Put, Param, Body, Post, Get, Delete } from '@nestjs/common';
import { StudentsService } from './student.service';
import { Student } from './schemas/student.schema';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // Obtener todos los estudiantes
  @Get()
  async findAll(): Promise<Student[]> {
    return this.studentsService.findAll();
  }

  // Crear un nuevo estudiante
  @Post()
  async createStudent(
    @Body() student: CreateStudentDto, // Se asume que CreateStudentDto contiene la estructura de un estudiante
  ): Promise<Student> {
    return this.studentsService.create(student);
  }

  // Obtener un estudiante por su ID
  @Get(':id')
  async getStudent(
    @Param('id') id: string, // El ID del estudiante
  ): Promise<Student> {
    return this.studentsService.findById(id);
  }

  // Actualizar un estudiante por su ID
  @Put(':id')
  async updateStudent(
    @Param('id') id: string, // El ID del estudiante a actualizar
    @Body() student: UpdateStudentDto, // Se asume que UpdateStudentDto contiene los campos para la actualización
  ): Promise<Student> {
    return this.studentsService.updateById(id, student);
  }

  // Eliminar un estudiante por su ID
  @Delete(':id')
  async deleteStudent(
    @Param('id') id: string, // El ID del estudiante a eliminar
  ): Promise<Student> {
    return this.studentsService.deleteById(id);
  }

  // Obtener información sobre el descuento de un estudiante
  @Get(':id/discount')
  async getStudentDiscount(
    @Param('id') studentId: string, // El ID del estudiante para obtener el descuento
  ): Promise<Student> {
    return this.studentsService.getStudentDiscount(studentId);
  }
}
