import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { Media, MediaType } from './media.entity';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  async findAll(@Query('page') page = 1, @Query('perPage') perPage = 12) {
    const media = await this.mediaService.findAll(page, perPage);
    return {
      status: 'success',
      message: 'Media fetched successfully',
      data: media,
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const media = await this.mediaService.findById(id);
    return {
      status: 'success',
      message: 'Media fetched successfully',
      data: media,
    };
  }

  @Get('search')
  async search(@Query('query') query: string) {
    const media = await this.mediaService.search(query);
    return {
      status: 'success',
      message: 'Media fetched successfully',
      data: media,
    };
  }

  @Post()
  async create(@Body() media: Media) {
    const createdMedia = await this.mediaService.create(media);
    return {
      status: 'success',
      message: 'Media created successfully',
      data: createdMedia,
    };
  }

  @Patch(':id')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    await this.mediaService.updateStatus(id, status);
    return {
      status: 'success',
      message: 'Media updated successfully',
    };
  }

  @Delete(':id')
  async softDelete(@Param('id') id: string) {
    await this.mediaService.softDelete(id);
    return {
      status: 'success',
      message: 'Media deleted successfully',
    };
  }
}
