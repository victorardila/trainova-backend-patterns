/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Content } from './schema/content.schema';

@Controller('contents')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  create(@Body() dto: CreateContentDto): Promise<Content> {
    return this.contentService.createContent(dto);
  }

  @Get()
  findAll(): Promise<Content[]> {
    return this.contentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Content> {
    return this.contentService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateContentDto): Promise<Content> {
    return this.contentService.updateContent(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Content> {
    return this.contentService.deleteContent(id);
  }
}

