/* eslint-disable prettier/prettier */
import { Controller, Put, Param, Body, Post, Get, Delete} from '@nestjs/common';
import { CoursesService } from './course.service';
import { Course } from './schemas/course.schema';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async findAll(): Promise<Course[]>{
    return this.coursesService.findAll()
  }

  @Post()
    async createCourse(
    @Body() course: CreateCourseDto,
  ): Promise<Course> {
    return this.coursesService.create(course);
  }

  @Get(':id')
  async getCourse(
    @Param('id') id: string
  ): Promise<Course>{
    return this.coursesService.findById(id)
  }
  
  @Put(':id')
  async updateCourse(
    @Param('id') id: string,  
    @Body() course: UpdateCourseDto,
  ): Promise<Course> {
    return this.coursesService.updateById(id, course);
  }

  @Delete(':id')
  async deleteCourse(
    @Param('id') id: string
  ): Promise<Course>{
    return this.coursesService.deleteById(id)
  }

  @Get(':id/structure')
  async getCourseStructure(
    @Param('id') courseId: string
  ) {
    return this.coursesService.getCourseStructure(courseId);
  }
}

