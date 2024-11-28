/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Content extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ type: String, ref: 'Course', required: true, index: true })
  course: string; // Relación con el curso

  @Prop({ type: String, ref: 'Content', default: null, index: true })
  parent?: string; // Relación con la unidad padre (si es subunidad)

  @Prop({ default: [] })
  children: string[]; // IDs de las subunidades o lecciones
}

export const ContentSchema = SchemaFactory.createForClass(Content);