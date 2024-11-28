/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student} from './schemas/student.schema'; // Esquema de estudiante
import * as mongoose from 'mongoose';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name)
    private studentModel: mongoose.Model<typeof Student>, // Modelo basado en el esquema
  ) {}

  // Obtener todos los estudiantes
  async findAll(): Promise<any[]> {
    const students = await this.studentModel.find();
    return students;
  }

  // Crear un estudiante
  async create(student: any): Promise<any> {
    const res = await this.studentModel.create(student);
    return res;
  }

  // Buscar un estudiante por su ID
  async findById(id: string): Promise<any> {
    const student = await this.studentModel.findById(id);
    if (!student) {
      throw new NotFoundException('Student Not Found');
    }
    return student;
  }

  // Actualizar un estudiante por su ID
  async updateById(id: string, student: any): Promise<any> {
    return await this.studentModel.findByIdAndUpdate(id, student, {
      new: true,
      runValidators: true,
    });
  }

  // Eliminar un estudiante por su ID
  async deleteById(id: string): Promise<any> {
    const student = await this.studentModel.findByIdAndDelete(id);
    if (!student) {
      throw new NotFoundException('Student Not Found');
    }
    return student;
  }

  async getStudentDiscount(studentId: string): Promise<any> {
    const student = await this.studentModel.findById(studentId).lean();
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return { tipoDescuento: (student as any).tipoDescuento };
  }

  // Obtener una estructura jerárquica de datos del estudiante
  async getStudentStructure(studentId: string) {
    const student = await this.studentModel.findById(studentId);
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    // Suponiendo que los estudiantes tienen relaciones jerárquicas, ajusta la lógica según tu modelo
    const relatedData = await this.buildHierarchy(studentId);

    return { ...student.toObject(), relatedData };
  }

  // Construir una jerarquía de datos relacionada con el estudiante
  private async buildHierarchy(parentId: string) {
    // Implementa la lógica para construir relaciones jerárquicas
    // Por ejemplo, si los estudiantes tienen subestudiantes o entidades relacionadas
    const children = await this.studentModel.find({ parent: parentId }).exec();

    const subStudents = [];
    const relatedItems = [];

    for (const child of children) {
      const childObject = child.toObject();

      // Busca hijos de este estudiante
      const { subStudents: subSubStudents, relatedItems: subItems } = await this.buildHierarchy(
        childObject._id.toString(),
      );

      if (subSubStudents.length > 0 || subItems.length > 0) {
        // Si tiene hijos, es un subestudiante
        subStudents.push({ ...childObject, subStudents: subSubStudents, relatedItems: subItems });
      } else {
        // Si no tiene hijos, es un elemento relacionado
        relatedItems.push({ ...childObject, type: 'relatedItem' });
      }
    }

    return { subStudents, relatedItems };
  }
}
