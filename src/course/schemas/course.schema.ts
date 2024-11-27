/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true
})

export class Course{
  @Prop({ required: true })
  name: string;

  @Prop({ enum: ['live', 'pre-recorded', 'tutored'], required: true })
  modality: string;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true, enum: ['active', 'inactive'] })
  status: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);