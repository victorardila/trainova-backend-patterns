/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class Student {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  academicProgram: string;

  @Prop({ enum: ['beca', 'votaciones', 'descendencia'], required: true })
  tipoDescuento: string;

  @Prop({ required: true })
  saldoPagar: number;

  @Prop({ required: true })
  creditosAcumulados: number;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  money: number;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
