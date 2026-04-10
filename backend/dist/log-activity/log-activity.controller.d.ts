import { LogActivityService } from './log-activity.service';
import { CreateLogActivityDto } from './dto/create-log-activity.dto';
import { UpdateLogActivityDto } from './dto/update-log-activity.dto';
export declare class LogActivityController {
    private readonly logActivityService;
    constructor(logActivityService: LogActivityService);
    create(createLogActivityDto: CreateLogActivityDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateLogActivityDto: UpdateLogActivityDto): string;
    remove(id: string): string;
}
