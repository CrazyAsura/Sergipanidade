import { Repository } from 'typeorm';
import { Localization } from './entities/localization.entity';
import { CreateLocalizationDto } from './dto/create-localization.dto';
import { UpdateLocalizationDto } from './dto/update-localization.dto';
export declare class LocalizationService {
    private readonly localizationRepository;
    constructor(localizationRepository: Repository<Localization>);
    create(createLocalizationDto: CreateLocalizationDto): Promise<Localization>;
    findAll(): Promise<Localization[]>;
    findOne(id: string): Promise<Localization | null>;
    update(id: string, updateLocalizationDto: UpdateLocalizationDto): Promise<Localization | null>;
    remove(id: string): Promise<void>;
}
