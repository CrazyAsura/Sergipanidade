"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLocalizationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_localization_dto_1 = require("./create-localization.dto");
class UpdateLocalizationDto extends (0, mapped_types_1.PartialType)(create_localization_dto_1.CreateLocalizationDto) {
}
exports.UpdateLocalizationDto = UpdateLocalizationDto;
//# sourceMappingURL=update-localization.dto.js.map