import { PhoneService } from './phone.service';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
export declare class PhoneController {
    private readonly phoneService;
    constructor(phoneService: PhoneService);
    create(createPhoneDto: CreatePhoneDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePhoneDto: UpdatePhoneDto): string;
    remove(id: string): string;
}
