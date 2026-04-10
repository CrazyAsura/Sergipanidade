import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
export declare class PhoneService {
    create(createPhoneDto: CreatePhoneDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePhoneDto: UpdatePhoneDto): string;
    remove(id: number): string;
}
