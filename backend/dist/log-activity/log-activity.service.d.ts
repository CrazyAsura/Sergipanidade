import { CreateLogActivityDto } from './dto/create-log-activity.dto';
import { UpdateLogActivityDto } from './dto/update-log-activity.dto';
export declare class LogActivityService {
    create(createLogActivityDto: CreateLogActivityDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateLogActivityDto: UpdateLogActivityDto): string;
    remove(id: number): string;
}
