/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { StudentsService } from './student.service';
import { StudentsController } from './student.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from './schemas/student.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
  ],
  providers: [StudentsService],
  controllers: [StudentsController],
})
export class StudentModule {}
