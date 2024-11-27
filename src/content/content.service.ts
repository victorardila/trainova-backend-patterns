/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content } from './schema/content.schema';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Content.name) private readonly contentModel: Model<Content>,
  ) {}

  async createContent(dto: CreateContentDto): Promise<Content> {
    const content = new this.contentModel(dto);
    return content.save();
  }

  async findAll(): Promise<Content[]> {
    return this.contentModel.find().exec();
  }

  async findById(id: string): Promise<Content> {
    const content = await this.contentModel.findById(id).exec();
    if (!content) throw new NotFoundException('Content not found');
    return content;
  }

  async updateContent(id: string, dto: UpdateContentDto): Promise<Content> {
    return this.contentModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async deleteContent(id: string): Promise<Content> {
    return this.contentModel.findByIdAndDelete(id).exec();
  }
  async getUnits(courseId: string): Promise<Content[]> {
    // Recupera todas las unidades asociadas al curso
    return this.contentModel.find({ course: courseId, type: 'unit' }).exec();
  }
}
