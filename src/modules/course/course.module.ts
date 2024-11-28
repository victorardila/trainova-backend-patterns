/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CoursesService } from './course.service';
import { CoursesController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from './schemas/course.schema';
import { ContentModule } from 'src/modules/content/content.module';
import { ContentSchema } from 'src/modules/content/schema/content.schema';


@Module({
  imports: [MongooseModule.forFeature([{name: 'Course', schema: CourseSchema},{name:'Content', schema:ContentSchema}]),
  ContentModule
],
  providers: [CoursesService],
  controllers: [CoursesController]
})
export class CourseModule {}
