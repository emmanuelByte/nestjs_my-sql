import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Media, MediaType } from './media.entity';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
  ) {}

  async findAll(page = 1, perPage = 12): Promise<Media[]> {
    const skip = (page - 1) * perPage;
    const take = perPage;
    return await this.mediaRepository.find({
      skip,
      take,
      where: { deletedAt: null },
    });
  }

  async findById(id: string): Promise<Media> {
    return await this.mediaRepository.findOne({
      where: { id, deletedAt: null },
    });
  }

  async search(query: string): Promise<Media[]> {
    return await this.mediaRepository
      .createQueryBuilder('media')
      .where('media.name LIKE :query', { query: `%${query}%` })
      .orWhere('media.description LIKE :query', { query: `%${query}%` })
      .andWhere('media.deletedAt IS NULL')
      .getMany();
  }

  async create(media: Media): Promise<Media> {
    return await this.mediaRepository.save(media);
  }

  async updateStatus(id: string, status: string): Promise<void> {
    await this.mediaRepository.update(id, { status });
  }

  async softDelete(id: string): Promise<void> {
    await this.mediaRepository.softDelete(id);
  }
}
