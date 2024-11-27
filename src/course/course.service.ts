/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schemas/course.schema';
import { Content } from '../content/schema/content.schema';
import * as mongoose from 'mongoose';
@Injectable()
export class CoursesService {

  constructor(
    @InjectModel(Course.name)
    private courseModel: mongoose.Model<Course>,
    @InjectModel(Content.name) // Agrega este modelo
    private contentModel: mongoose.Model<Content> // Define el modelo
  ) { }

  async findAll(): Promise<Course[]> {
    const courses = await this.courseModel.find();
    return courses;
  }

  async create(course: Course): Promise<Course> {
    const res = await this.courseModel.create(course);
    return res;
  }

  async findById(id: string): Promise<Course> {
    const course = await this.courseModel.findById(id);
    if (!course) {
      throw new NotFoundException('Course Not Found');
    }
    return course;
  }

  async updateById(id: string, course: Course): Promise<Course> {
    return await this.courseModel.findByIdAndUpdate(id, course, { new: true, runValidators: true });
  }

  async deleteById(id: string): Promise<Course> {
    return await this.courseModel.findByIdAndDelete(id);
  }

  /*async getCourseStructure(course: string) {
    console.log("Buscando curso:", course);
    // Verifica que el curso existe
    const xcourse = await this.courseModel.findById(course);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
  
    // Busca todas las unidades asociadas al curso
    const units = await this.contentModel.find({
      course: course,
      parent: null, // Solo unidades raíz
    }).exec();
    console.log("Unidades encontradas:", units);

    // Construye la jerarquía de unidades, subunidades y lecciones
    const structure = await Promise.all(
      units.map(async (unit) => {
        const unitObject = unit.toObject(); // Especifica el tipo
        const subunits = await this.buildHierarchy(unitObject._id.toString(), course);
        return { 
          ...unitObject, 
          type: "unit", 
          description: "Descripción de la unidad", 
          subunits 
        };
      })
    );
  
    return { ...xcourse.toObject(), units: structure };
  }*/

    async getCourseStructure(courseId: string) {
      const course = await this.courseModel.findById(courseId);
      if (!course) {
          throw new NotFoundException('Course not found');
      }
  
      const units = await this.contentModel.find({
          course: courseId,
          parent: null, // Solo unidades raíz
      }).exec();
  
      const structure = await Promise.all(
          units.map(async (unit) => {
              const unitObject = unit.toObject();
              const { subunits, lessons } = await this.buildHierarchy(unitObject._id.toString(), courseId);
  
              return { 
                  ...unitObject, 
                  type: "unit", 
                  description: "Descripción de la unidad", 
                  subunits,
                  lessons
              };
          })
      );
  
      const courseStructure = { ...course.toObject(), units: structure };
      return courseStructure;
  }  

  private async buildHierarchy(parentId: string, courseId: string) {
    const children = await this.contentModel.find({ parent: parentId, course: courseId }).exec();

    // Clasificamos entre subunidades y lecciones
    const subunits = [];
    const lessons = [];

    for (const child of children) {
        const childObject = child.toObject();

        // Busca hijos de este contenido
        const { subunits: subSubunits, lessons: subLessons } = await this.buildHierarchy(childObject._id.toString(), courseId);

        if (subSubunits.length > 0 || subLessons.length > 0) {
            // Si tiene hijos (subunidades o lecciones), es una subunidad
            subunits.push({ ...childObject, subunits: subSubunits, lessons: subLessons });
        } else {
            // Si no tiene hijos, es una lección
            lessons.push({ ...childObject, type: "lesson" });
        }
    }

    // Devolvemos subunidades y lecciones separadamente
    return { subunits, lessons };
  }

}

