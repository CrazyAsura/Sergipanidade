import { LocalizationService } from './localization.service';
import { CreateLocalizationDto } from './dto/create-localization.dto';
import { UpdateLocalizationDto } from './dto/update-localization.dto';
export declare class LocalizationController {
    private readonly localizationService;
    constructor(localizationService: LocalizationService);
    create(createLocalizationDto: CreateLocalizationDto): Promise<import("./entities/localization.entity").Localization>;
    findAll(): Promise<import("./entities/localization.entity").Localization[]>;
    findOne(id: string): Promise<import("./entities/localization.entity").Localization | null>;
    update(id: string, updateLocalizationDto: UpdateLocalizationDto): Promise<import("./entities/localization.entity").Localization | null>;
    remove(id: string): Promise<void>;
}
