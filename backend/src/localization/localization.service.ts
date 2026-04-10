import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Localization } from './entities/localization.entity';
import { CreateLocalizationDto } from './dto/create-localization.dto';
import { UpdateLocalizationDto } from './dto/update-localization.dto';

@Injectable()
export class LocalizationService {
  constructor(
    @InjectRepository(Localization)
    private readonly localizationRepository: Repository<Localization>,
  ) {}

  async create(createLocalizationDto: CreateLocalizationDto): Promise<Localization> {
    const localization = this.localizationRepository.create(createLocalizationDto);
    return await this.localizationRepository.save(localization);
  }

  async findAll(): Promise<Localization[]> {
    return await this.localizationRepository.find();
  }

  async findOne(id: string): Promise<Localization | null> {
    return await this.localizationRepository.findOne({ where: { id } });
  }

  async update(id: string, updateLocalizationDto: UpdateLocalizationDto): Promise<Localization | null> {
    await this.localizationRepository.update(id, updateLocalizationDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.localizationRepository.delete(id);
  }
}
