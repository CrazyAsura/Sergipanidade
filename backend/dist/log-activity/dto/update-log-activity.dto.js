"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLogActivityDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_log_activity_dto_1 = require("./create-log-activity.dto");
class UpdateLogActivityDto extends (0, mapped_types_1.PartialType)(create_log_activity_dto_1.CreateLogActivityDto) {
}
exports.UpdateLogActivityDto = UpdateLogActivityDto;
//# sourceMappingURL=update-log-activity.dto.js.map