import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../user/schemas/user.schema';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Student {
  @Prop({ required: true })
  money: number;

  @Prop({ required: true })
  academicProgram: string;

  @Prop({ enum: ['beca', 'votaciones', 'descendencia'], required: true })
  tipoDescuento: string;

  @Prop({ required: true })
  saldoPagar: number;

  @Prop({ required: true })
  creditosAcumulados: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
